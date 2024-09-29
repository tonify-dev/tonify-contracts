import "@stdlib/deploy";
import "@stdlib/stoppable";
import "./market_messages.tact";
import "./nft/nft_collection.tact";
import "./jetton/jetton_messages.tact";
import "./deal.tact";
import "./oracle/redstonte_oracle_consumer_base.tact";
const SLIPPAGE_DENOMINATOR: Int = pow(10, 36);
const COLLATERAL_DENOMINATOR: Int = pow(10, 18);
const FEE_DENOMINATOR: Int = pow(10, 9);
const ZERO_ADDRESS: Address = address("UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ");
const STORAGE_INIT_VALUE: Int = ton("0.1");
const GAS_MIN_VALUE: Int = ton("0.05");
const TO_TAKE_AMM: Int = ton("0.15");
const GAS_TO_SEND_JETTON: Int = ton("0.01");
const GAS_TO_FETCH_OWNER: Int = ton("0.01");

const TIME_SLIPPAGE: Int = 60*5;
/// inner opcodes
const INNER_OP_CODE_TAKE_DEAL_AFTER_PRICE_RECEIVED: Int = 10;
const INNER_OP_CODE_TAKE_DEAL_AFTER_DEAL_RECEIVED: Int = 20;
const INNER_OP_CODE_CANCEL_DEAL_AFTER_DEAL_RECEIVED: Int = 21;
const INNER_OP_CODE_PROCESS_DEAL_AFTER_PRICE_RECEIVED: Int = 12;
const INNER_OP_CODE_PROCESS_DEAL_AFTER_DEAL_RECEIVED: Int = 22;

// deal status
const DEAL_STATUS_CREATED: Int = 1;
const DEAL_STATUS_ACCEPTED: Int = 2;
const DEAL_STATUS_CANCELLED: Int = 3;
const DEAL_STATUS_COMPLETED: Int = 4;
const DEAL_STATUS_EXPIRED: Int = 5;

// return reasons 
const SMALL_VALUE: Int = 1;
const SMALL_TOKEN_AMOUNT: Int = 2;
const ORACLE_PRICE_TOO_OLD: Int = 3;
const MAKER_OUT_OF_RANGE: Int = 4;

contract Market with Resumable, NftCollection, RedstoneOracleConsumerBase {
    id: Int as uint32;
    owner: Address;
    amm: Address;
    jettonWallet: Address = address("UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ");
    underlyingAssetName: String;
    duration: Int as uint32;
    operatorFee: Int as uint32;
    serviceFee: Int as uint32;
    factory: Address;
    stopped: Bool = false;
    countDeal: Int as uint32 = 0;
    next_item_index: Int as uint32 = 0;
    collection_content: Cell;
    mapQueriesToContext: map<Int, Cell> = emptyMap();
    oracle: Address;
    feedId: Int as uint256;
    operatorFeeSum: Int as coins = 0;
    serviceFeeSum: Int as coins = 0;
    operatorFeeAddress: Address;


    init(id: Int,
        owner: Address,
        coin: Address,
        amm: Address,
        factory: Address,
        underlyingAssetName: String,
        duration: Int,
        collection_content: Cell,
        operatorFee: Int,
        serviceFee: Int,
        oracle: Address,
        feedId: Int,
        operatorFeeAddress: Address){
        self.id = id;
        self.owner = owner;
        self.amm = amm;
        self.factory = factory;
        self.underlyingAssetName = underlyingAssetName;
        self.duration = duration;
        self.operatorFee = operatorFee;
        self.serviceFee = serviceFee;
        self.collection_content = collection_content;
        self.oracle = oracle;
        self.feedId = feedId;
        self.operatorFeeAddress = operatorFeeAddress;
    }

    receive(msg: InnerDeployMarket) {
        let ctx: Context = context();
        require(ctx.sender == self.factory, "Only factory can deploy");
        self.jettonWallet = msg.jettonWallet;
        send(SendParameters{
            to: ctx.sender,
            value: self.msgValue(ctx.value),
            mode: SendIgnoreErrors,
            bounce: false,
            body: DeployOk{
                queryId: msg.queryId,
            }.toCell()
        });
    }

    receive(msg: WithdrawServiceFee) {
        self.requireOwner();
        require(msg.amount > 0, "Amount must be greater than 0");
        require(msg.amount <= self.serviceFeeSum, "Insufficient service fee");
        let ctx: Context = context();
        let value: Int = self.msgValue(ctx.value);
        self.serviceFeeSum -= msg.amount;
        send(SendParameters{
            to: self.jettonWallet,
            value: value,
            mode: 0,
            bounce: true,
            body: TokenTransfer{
                amount: msg.amount,
                query_id: msg.queryId,
                recipient: msg.to,
                response_destination: null,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: emptySlice(),
            }.toCell()
        });
    }   

    receive(msg: WithdrawOperatorFee) {
        let ctx: Context = context();

        require(ctx.sender == self.operatorFeeAddress, "Only operator fee address can withdraw operator fee");
        require(msg.amount > 0, "Amount must be greater than 0");
        require(msg.amount <= self.operatorFeeSum, "Insufficient operator fee");
        let value: Int = self.msgValue(ctx.value);
        self.operatorFeeSum -= msg.amount;
        send(SendParameters{
            to: self.jettonWallet,
            value: value,
            mode: 0,
            bounce: true,
            body: TokenTransfer{
                amount: msg.amount,
                query_id: msg.queryId,
                recipient: msg.to,
                response_destination: null,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: emptySlice(),
            }.toCell()
        });
    }

    receive(msg: TokenNotification) {
        let ctx: Context = context();
        require(ctx.sender == self.jettonWallet, "Transfer jetton must be from jetton wallet");
        let value: Int = self.msgValue(ctx.value);
        if(ctx.value >= GAS_MIN_VALUE) {
            self.returnTokens(msg.query_id, msg.amount, msg.from, value, SMALL_VALUE);
        }
        let opcode: Int = msg.forward_payload.loadUint(32);
        if(opcode == OP_CODE_CREATE_DEAL) {
            let deal: CreateDealData = CreateDealData.fromSlice(msg.forward_payload);
            self.handleCreateDeal(msg.query_id, deal, value, msg.amount, msg.from);
        } else if (opcode == OP_CODE_TAKE_DEAL) {
            let deal: TakeDealData = TakeDealData.fromSlice(msg.forward_payload);
            self.handleTakeDeal(msg.query_id, deal, value, msg.amount, msg.from);
        }   
    }

    receive(msg: CancelDeal) {
        let ctx: Context = context();
        require(ctx.sender == self.jettonWallet, "Transfer jetton must be from jetton wallet");
        require(ctx.value >= GAS_MIN_VALUE, "Invalid value");

        let value: Int = self.msgValue(ctx.value);
        let contextCancelDeal: Cell = beginCell().storeUint(INNER_OP_CODE_CANCEL_DEAL_AFTER_DEAL_RECEIVED, 8).storeRef(ContextCancelDealForDealReceived{from: ctx.sender}.toCell()).endCell();   
        self.fetchDeal(msg.queryId, msg.dealId, value, contextCancelDeal);    
    }

    receive(msg: ProcessDeal) {
        let ctx: Context = context();
        require(ctx.sender == self.jettonWallet, "Transfer jetton must be from jetton wallet");
        require(ctx.value >= GAS_MIN_VALUE, "Invalid value");

        let value: Int = self.msgValue(ctx.value);
        let contextProcessDeal: Cell = beginCell()
            .storeUint(INNER_OP_CODE_PROCESS_DEAL_AFTER_PRICE_RECEIVED, 8)
            .storeRef(ContextProcessDealForPriceReceived{from: ctx.sender, dealId: msg.dealId}.toCell())
            .endCell();   
        self.fetchPriceWithSaveContext(msg.queryId, msg.oracleData, value, contextProcessDeal);    
    }
    // handlers of token received from jetton wallet ------------------------------------------------------
    fun handleCreateDeal(queryId: Int,deal: CreateDealData, value: Int, amount: Int, from: Address) {
        let dealId: Int = self.countDeal;

        let slippageAmount: Int = (deal.rate * deal.percent * deal.slippage) / SLIPPAGE_DENOMINATOR;
        let collateralAmountMaker: Int = (deal.rate * deal.percent) / COLLATERAL_DENOMINATOR + slippageAmount;
        if(amount >= collateralAmountMaker) {
            self.returnTokens(queryId, amount, from, value, SMALL_TOKEN_AMOUNT);
        }

        self.countDeal += 1;
        dump(1211111);
        if (self.amm != ZERO_ADDRESS) {
            value -= TO_TAKE_AMM;
            send(SendParameters{
                to: self.amm,
                value: TO_TAKE_AMM,
                mode: SendIgnoreErrors,
                bounce: true,
                body: TakeDeal{
                    queryId: 0,
                    dealId: dealId,
                    oracleData: deal.oracleData!!
                }.toCell()
            });
        }
        dump(222222);

        let newDeal: DealData = DealData{
            rate: 0,
            rateMaker: deal.rate,
            percent: deal.percent,
            periodOrderExpiration: deal.expiration,
            slippageMaker: deal.slippage,
            collateralAmountMaker: collateralAmountMaker,
            dateOrderCreation: now(),
            dateOrderExpiration: now() + deal.expiration,
            dateStart: 0,
            dateStop: 0,
            buyerTokenId: 0,
            sellerTokenId: 0,
            maker: from,
            isSeller: !deal.makerPosition,
            status: 0
        };
        dump(333333);

        emit(DealCreatedEvent{
            queryId: queryId,
            dealId: dealId,
            maker: from,
            collateralAmountMaker: collateralAmountMaker
        }.toCell());

        dump(555555);

        self.saveDeal(queryId, dealId, value, newDeal, from);
    }

    fun handleTakeDeal(queryId: Int, takeDeal: TakeDealData, value: Int, amount: Int, from: Address) {
        let contextProcessDeal: Cell = beginCell()
            .storeUint(INNER_OP_CODE_TAKE_DEAL_AFTER_PRICE_RECEIVED, 8)
            .storeRef(ContextTakeDealForPriceReceived{
                from: from,
                amount: amount,
                dealId: takeDeal.dealId  
            }.toCell())
            .endCell();
        
        self.fetchPriceWithSaveContext(queryId, takeDeal.oracleData, value, contextProcessDeal);
    }

    // handlers of price received from oracle ------------------------------------------------------------


    fun takeDealAfterRecievedPrice(query: Cell, ctx: Context, queryId: Int, feedId: Int, price: Int, timestamp: Int) {
        let contextTakeDealAfterPrice: ContextTakeDealForPriceReceived = ContextTakeDealForPriceReceived.fromCell(query);
        let contextProcessDeal: Cell = beginCell()
            .storeUint(INNER_OP_CODE_TAKE_DEAL_AFTER_DEAL_RECEIVED, 8)
            .storeRef(ContextTakeDealForDealReceived{
                from: contextTakeDealAfterPrice.from,
                amount: contextTakeDealAfterPrice.amount,
                feedId: feedId,
                price: price,
                timestamp: timestamp / 1000,
            }.toCell())
            .endCell();
        self.fetchDeal(queryId, contextTakeDealAfterPrice.dealId, self.msgValue(ctx.value), contextProcessDeal);
    }

    fun processDealAfterRecievedPrice(query: Cell, ctx: Context, queryId: Int, feedId: Int, price: Int, timestamp: Int) {
        let contextProcessDealAfterPrice: ContextProcessDealForPriceReceived = ContextProcessDealForPriceReceived.fromCell(query);
        let contextProcessDeal: Cell = beginCell()
            .storeUint(INNER_OP_CODE_PROCESS_DEAL_AFTER_DEAL_RECEIVED, 8)
            .storeRef(ContextProcessDealForDealReceived{
                from: contextProcessDealAfterPrice.from,
                feedId: feedId,
                price: price,
                timestamp: timestamp / 1000
            }.toCell())
            .endCell();
        self.fetchDeal(queryId, contextProcessDealAfterPrice.dealId, self.msgValue(ctx.value), contextProcessDeal);    
    }   

    // handlers of deal received from Deal contract ------------------------------------------------------


    fun takeDealAfterRecievedDeal(deal: DealData, query: Cell, ctx: Context, queryId: Int, dealId: Int) {
        let contextTakeDealAfterDeal: ContextTakeDealForDealReceived = ContextTakeDealForDealReceived.fromCell(query);
        
        require(deal.maker != contextTakeDealAfterDeal.from, "Taker shouldn't be maker");
        require(deal.status == DEAL_STATUS_CREATED, "Deal is not created");
        require(contextTakeDealAfterDeal.feedId == self.feedId, "Wrong feedId");
        if(!(contextTakeDealAfterDeal.timestamp >= now() - TIME_SLIPPAGE)) { //todo return tokens
            self.returnTokens(queryId, contextTakeDealAfterDeal.amount, contextTakeDealAfterDeal.from, self.msgValue(ctx.value), ORACLE_PRICE_TOO_OLD);
        }

        let collateralAmount: Int = (deal.percent * contextTakeDealAfterDeal.price) / COLLATERAL_DENOMINATOR; 
        require(contextTakeDealAfterDeal.amount >= collateralAmount, "Insufficient amount of deposit for the deal");

        if(!(contextTakeDealAfterDeal.price >
                (deal.rateMaker -
                    (deal.rateMaker * deal.slippageMaker) /
                    COLLATERAL_DENOMINATOR)) ) { //todo return tokens
            self.returnTokens(queryId, contextTakeDealAfterDeal.amount, contextTakeDealAfterDeal.from, self.msgValue(ctx.value), MAKER_OUT_OF_RANGE);
        }

        let returnAmount: Int = deal.collateralAmountMaker - collateralAmount;
        if(returnAmount > 0) {
            send(SendParameters{
                to: self.jettonWallet,
                value: GAS_TO_SEND_JETTON,
                mode: 0,
                bounce: true,
                body: TokenTransfer{
                    amount: returnAmount,
                    query_id: queryId,  
                    recipient: deal.maker,
                    response_destination: null,
                    custom_payload: null,
                    forward_ton_amount: 0,
                    forward_payload: emptySlice(),
                    }.toCell()
            }); 
        }

        deal.rate = contextTakeDealAfterDeal.price;
        deal.dateStart = now();
        deal.dateStop = now() + deal.periodOrderExpiration;
        deal.status = DEAL_STATUS_ACCEPTED;

        if (deal.isSeller) {
            deal.buyerTokenId = self.mint(queryId, contextTakeDealAfterDeal.from, minTonsForStorage + gasConsumption, contextTakeDealAfterDeal.from);
            deal.sellerTokenId = self.mint(queryId, deal.maker, minTonsForStorage + gasConsumption, deal.maker);
        } else {
            deal.sellerTokenId = self.mint(queryId, contextTakeDealAfterDeal.from, minTonsForStorage + gasConsumption, contextTakeDealAfterDeal.from);
            deal.buyerTokenId = self.mint(queryId, deal.maker, minTonsForStorage + gasConsumption, deal.maker);
        }

        emit(DealAcceptedEvent{
            queryId: queryId,
            dealId: dealId,
            maker: deal.maker,
            collateralAmountMaker: deal.collateralAmountMaker
        }.toCell());


        self.saveDeal(queryId, dealId, ctx.value, deal, contextTakeDealAfterDeal.from);
    }

    fun cancelDealAfterRecievedDeal(deal: DealData, query: Cell, ctx: Context, queryId: Int, dealId: Int) {
        emit(CancelEvent{
            queryId: queryId,
            dealId: dealId,
            maker: deal.maker,
            collateralAmountMaker: deal.collateralAmountMaker
        }.toCell()); 
        self._cancelDeal(deal, ctx.sender, ctx, queryId, DEAL_STATUS_CANCELLED, dealId);
    }       

    fun processDealAfterRecievedDeal(deal: DealData, query: Cell, ctx: Context, queryId: Int, dealId: Int) {
        if (deal.status == DEAL_STATUS_CREATED && deal.dateOrderExpiration <= now()) {
            self._cancelDeal(deal, deal.maker, ctx, queryId, DEAL_STATUS_EXPIRED, dealId);
            emit(DealExpiredEvent{
                queryId: queryId,
                dealId: dealId,
                maker: deal.maker,
                collateralAmountMaker: deal.collateralAmountMaker
            }.toCell());
            return;
        }  
        let contextProcessDealAfterDeal: ContextProcessDealForDealReceived = ContextProcessDealForDealReceived.fromCell(query);


        require(deal.status == DEAL_STATUS_ACCEPTED && deal.dateStop <= now(), "deal.dateStop <= now()");
        require(contextProcessDealAfterDeal.feedId == self.feedId, "Wrong feedId");
        require(contextProcessDealAfterDeal.timestamp >= now() - TIME_SLIPPAGE, "Price is too old");

        let price: Int = contextProcessDealAfterDeal.price;

        let collateralAmount: Int = deal.collateralAmountMaker;
        let payoutBuyer: Int = 0;
        let payoutSeller: Int = 0;

        if (contextProcessDealAfterDeal.price <= deal.rate - collateralAmount) {
            payoutSeller = collateralAmount * 2;
        } else if (contextProcessDealAfterDeal.price > deal.rate - collateralAmount && contextProcessDealAfterDeal.price < deal.rate + collateralAmount) {
            payoutBuyer = contextProcessDealAfterDeal.price + collateralAmount - deal.rate;
            payoutSeller = deal.rate + collateralAmount - contextProcessDealAfterDeal.price;
        } else if (contextProcessDealAfterDeal.price >= deal.rate + collateralAmount) {
            payoutBuyer = collateralAmount * 2;
        }

        let operatorFee: Int = 0;
        let serviceFee: Int = 0;

        if (payoutBuyer > 0) {
            if (payoutBuyer > collateralAmount) {
                operatorFee = ((payoutBuyer - collateralAmount) * self.operatorFee) / FEE_DENOMINATOR;
                serviceFee = ((payoutBuyer - collateralAmount) * self.serviceFee) / FEE_DENOMINATOR;
                payoutBuyer = payoutBuyer - operatorFee - serviceFee;
            }
            self.sendTokens(deal.buyerTokenId, payoutBuyer, queryId);
        }

        if (payoutSeller > 0) {
            if (payoutSeller > collateralAmount) {
                operatorFee = ((payoutSeller - collateralAmount) * self.operatorFee) / FEE_DENOMINATOR;
                serviceFee = ((payoutSeller - collateralAmount) * self.serviceFee) / FEE_DENOMINATOR;
                payoutSeller = payoutSeller - operatorFee - serviceFee;
            }
            self.sendTokens(deal.sellerTokenId, payoutSeller, queryId + 1);
        }

        self.operatorFeeSum += operatorFee;
        self.serviceFeeSum += serviceFee;

        deal.status = DEAL_STATUS_COMPLETED;

        emit(DealCompletedEvent{
            queryId: queryId,
            dealId: dealId,
            maker: deal.maker,
            collateralAmountMaker: deal.collateralAmountMaker
        }.toCell());

        self.saveDeal(queryId, dealId, ctx.value, deal, ctx.sender);
    }

    // inner functions ---------------------------------------------------------------------------------

    fun _cancelDeal(deal: DealData, from: Address, ctx: Context, queryId: Int, status: Int, dealId: Int) {
        require(deal.maker == from, "Only maker can cancel deal");
        require(deal.status == DEAL_STATUS_CREATED, "Deal is not created");
        let value: Int = self.msgValue(ctx.value);
        send(SendParameters{
            to: self.jettonWallet,
            value: GAS_TO_SEND_JETTON,
            mode: 0,
            bounce: true,
            body: TokenTransfer{
                amount: deal.collateralAmountMaker,
                query_id: queryId,
                recipient: from,
                response_destination: null,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: emptySlice(),
            }.toCell()
        });
        deal.status = status;
        self.saveDeal(queryId, dealId, value - GAS_TO_SEND_JETTON, deal, from);   
    }

    // utils functions ---------------------------------------------------------------------------------

    fun sendTokens(tokenId: Int, amount: Int, queryId: Int) {
        require(self.mapQueriesToContext.get(queryId) == null, "QueryId already exists");

        let contextForGetOwner: ContextForGetOwner = ContextForGetOwner{
            amount: amount,
        };
        self.mapQueriesToContext.set(queryId, contextForGetOwner.toCell());

        self.fetchOwnerByIndex(queryId, tokenId, GAS_TO_FETCH_OWNER);
    }       

    receive(msg: ReportOwner) {
        let ctx: Context = context();
        let winit: StateInit = initOf NftItem( myAddress(), msg.index_id);

        require(ctx.sender == contractAddress(winit), "ReportOwner must be from nft contract");
        let contextForGetOwner: ContextForGetOwner = ContextForGetOwner.fromCell(self.mapQueriesToContext.get(msg.query_id)!!);
        self.mapQueriesToContext.del(msg.query_id);
        send(SendParameters{
            to: self.jettonWallet,
            value: self.msgValue(ctx.value),
            mode:  0, 
            bounce: true,
            body: TokenTransfer{
                amount: contextForGetOwner.amount,
                query_id: msg.query_id,
                recipient: msg.owner,
                response_destination: null,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: emptySlice(),
            }.toCell()
        });
    }

    fun saveDeal(queryId: Int, dealId: Int, value: Int, deal: DealData, originalGasTo: Address) { 
        let winit: StateInit = initOf Deal(dealId, myAddress());

        send(SendParameters{
            to: contractAddress(winit),
            value: value,
            mode: 0,
            bounce: true,
            body: SaveData{
                queryId: 0,
                originalGasTo: originalGasTo,
                data: deal.toCell()
            }.toCell()
        });
    }

    fun fetchPriceWithSaveContext(queryId: Int, oracleData: Cell, value: Int, saveContext: Cell) {
        require(self.mapQueriesToContext.get(queryId) == null, "QueryId already exists");

        self.mapQueriesToContext.set(queryId, saveContext);
        self.fetchPrice(queryId, oracleData, value);
    }

    override fun onPriceReceived(queryId: Int, feedId: Int, price: Int, timestamp: Int) {
        let ctx: Context = context();

        let query: Slice = self.mapQueriesToContext.get(queryId)!!.beginParse();
        self.mapQueriesToContext.del(queryId);

        let opcode: Int = query.loadUint(8);
        if (opcode == INNER_OP_CODE_TAKE_DEAL_AFTER_DEAL_RECEIVED) { 
            self.takeDealAfterRecievedPrice(query.loadRef(), ctx, queryId, feedId, price, timestamp);
        } else if (opcode == INNER_OP_CODE_PROCESS_DEAL_AFTER_DEAL_RECEIVED) {
            self.processDealAfterRecievedPrice(query.loadRef(), ctx, queryId, feedId, price, timestamp);
        }
    }


    fun fetchDeal(queryId: Int, dealId: Int, value: Int, saveContext: Cell) { 
        require(self.mapQueriesToContext.get(queryId) == null, "QueryId already exists");

        self.mapQueriesToContext.set(queryId, saveContext);
        let winit: StateInit = initOf Deal(dealId, myAddress());

        send(SendParameters{
            to: contractAddress(winit),
            value: value,
            mode: 0,
            bounce: true,
            body: GetData{
                queryId: queryId, 
            }.toCell()
        });
    }

    receive(msg: ReportData) {
        let ctx: Context = context();
        let winit: StateInit = initOf Deal(msg.id, myAddress());

        require(ctx.sender == contractAddress(winit), "ReportData must be from Deal contract");
        let deal: DealData = DealData.fromCell(msg.data);
        let query: Slice = self.mapQueriesToContext.get(msg.queryId)!!.beginParse();
        self.mapQueriesToContext.del(msg.queryId);

        let opcode: Int = query.loadUint(8);
        if (opcode == INNER_OP_CODE_TAKE_DEAL_AFTER_DEAL_RECEIVED) { 
            self.takeDealAfterRecievedDeal(deal, query.loadRef(), ctx, msg.queryId, msg.id);
        } else if (opcode == INNER_OP_CODE_CANCEL_DEAL_AFTER_DEAL_RECEIVED) {
            self.cancelDealAfterRecievedDeal(deal, query.loadRef(), ctx, msg.queryId, msg.id);
        } else if (opcode == INNER_OP_CODE_PROCESS_DEAL_AFTER_DEAL_RECEIVED) {
            self.processDealAfterRecievedDeal(deal, query.loadRef(), ctx, msg.queryId, msg.id);
        }   
    }
 
    fun returnTokens(queryId: Int, amount:Int, to: Address, value: Int, reason: Int) {
        send(SendParameters{
            to: self.jettonWallet,
            value: value,
            mode: 0,
            bounce: true,
            body: TokenTransfer{
                amount: amount,
                recipient: to,
                query_id: queryId,
                response_destination: null,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: beginCell().storeUint(reason, 8).asSlice()
            }.toCell()
        });
    }
    

    fun msgValue(value: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - value;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        return value - (storageFee);
    }

    // on errors
    override fun onOracleErrorReceived(queryId: Int, error: Slice) {
        self.mapQueriesToContext.del(queryId);
    }

    override fun onBouncedGetOwner(queryId: Int) {
        self.mapQueriesToContext.del(queryId);
    }   

    // bounced messages
    bounced(msg: GetData) {
        self.mapQueriesToContext.del(msg.queryId);
    }

    // getters -----------------------------------------------------------------------------------------

    get fun id(): Int {
        return self.id;
    }

    get fun amm(): Address {
        return self.amm;
    }

    get fun jettonWallet(): Address {
        return self.jettonWallet;
    }
    
    get fun underlyingAssetName(): String {
        return self.underlyingAssetName;
    }

    get fun duration(): Int {
        return self.duration;
    }

    get fun operatorFee(): Int {
        return self.operatorFee;
    }

    get fun serviceFee(): Int {
        return self.serviceFee;
    }

    get fun countDeal(): Int {
        return self.countDeal;
    }

    get fun next_item_index(): Int {
        return self.next_item_index;
    }

    get fun collection_content(): Cell {
        return self.collection_content;
    }

    get fun oracle(): Address {
        return self.oracle;
    }

    get fun feedId(): Int {
        return self.feedId;
    }

    get fun operatorFeeSum(): Int {
        return self.operatorFeeSum;
    }

    get fun serviceFeeSum(): Int {
        return self.serviceFeeSum;
    }

    get fun operatorFeeAddress(): Address {
        return self.operatorFeeAddress;
    }
}