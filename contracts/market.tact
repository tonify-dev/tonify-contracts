import "@stdlib/deploy";
import "@stdlib/stoppable";
import "./market_messages.tact";
import "./nft/nft_collection.tact";
import "./jetton/jetton_messages.tact";
import "./deal.tact";
import "./oracle/redstonte_oracle_consumer_base.tact";
const SLIPPAGE_DENOMINATOR: Int = pow(10, 36);
const COLLATERAL_DENOMINATOR: Int = pow(10, 18);
const ZERO_ADDRESS: Address = address("UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ");
const STORAGE_INIT_VALUE: Int = ton("0.1");
const GAS_MIN_VALUE: Int = ton("0.05");
const TO_TAKE_AMM: Int = ton("0.15");
const GAS_TO_SEND_JETTON: Int = ton("0.01");

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


contract Market with Deployable, Resumable, NftCollection, RedstoneOracleConsumerBase {
    id: Int as uint32;
    owner: Address;
    amm: Address;
    jettonWallet: Address;
    factory: Address;
    underlyingAssetName: String;
    duration: Int as uint32;
    operatorFee: Int as uint32;
    serviceFee: Int as uint32;
    stopped: Bool = false;
    countDeal: Int as uint32 = 0;
    next_item_index: Int as uint32 = 0;
    collection_content: Cell;
    mapQueriesToContext: map<Int, Cell> = emptyMap();
    oracle: Address;
    feedId: Int as uint256;


    init(id: Int,
        owner: Address,
        coin: Address,
        amm: Address,
        factory: Address,
        jettonWallet: Address,
        underlyingAssetName: String,
        duration: Int,
        collection_content: Cell,
        operatorFee: Int,
        serviceFee: Int,
        oracle: Address,
        feedId: Int){
        self.id = id;
        self.owner = owner;
        self.jettonWallet = jettonWallet;
        self.amm = amm;
        self.factory = factory;
        self.underlyingAssetName = underlyingAssetName;
        self.duration = duration;
        self.operatorFee = operatorFee;
        self.serviceFee = serviceFee;
        self.collection_content = collection_content;
        self.oracle = oracle;
        self.feedId = feedId;
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
            self.handleTakeDeal(msg.query_id, deal, ctx, msg.amount, msg.from);
        }   
    }

    receive(msg: CancelDeal) {
        let ctx: Context = context();
        require(ctx.sender == self.jettonWallet, "Transfer jetton must be from jetton wallet");
        require(ctx.value >= GAS_MIN_VALUE, "Invalid value");

        let value: Int = self.msgValue(ctx.value);
        let contextCancelDeal: Cell = beginCell().storeUint(INNER_OP_CODE_CANCEL_DEAL, 8).storeRef(ContextCancelDeal{from: ctx.sender}.toCell()).endCell();   
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
                    rateTaker: deal.rate,
                    slippageTaker: deal.slippage,
                    oracleData: deal.oracleData!!
                }.toCell()
            });
        }

        let newDeal: DealData = DealData{
            rate: 0,
            rateMaker: deal.rate,
            percent: deal.percent,
            periodOrderExpiration: deal.expiration,
            slippageMaker: deal.slippage,
            slippageTaker: 0,
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

        self.saveDeal(queryId, dealId, value, newDeal, from);
    }

    fun handleTakeDeal(queryId: Int,takeDeal: TakeDealData, value: Int, amount: Int, from: Address) {
        let contextProcessDeal: Cell = beginCell()
            .storeUint(INNER_OP_CODE_TAKE_DEAL_AFTER_PRICE_RECEIVED, 8)
            .storeRef(ContextTakeDealForPriceReceived{
                from: from,
                amount: amount,
                dealId: msg.dealId  
            }.toCell())
            .endCell();
        
        self.fetchPriceWithSaveContext(queryId, msg.oracleData, value, contextProcessDeal);
    }

    // handlers of price received from oracle ------------------------------------------------------------


    fun takeDealAfterRecievedPrice(query: Cell, ctx: Context, queryId: Int, feedId: Int, price: Int, timestamp: Int) {
        let contextTakeDealAfterPrice: ContextTakeDealForPriceReceived = ContextTakeDealForPriceReceived.fromCell(query);
        let contextProcessDeal: Cell = beginCell()
            .storeUint(INNER_OP_CODE_TAKE_DEAL_AFTER_DEAL_RECEIVED, 8)
            .storeRef(ContextTakeDealForDealReceived{
                from: contextTakeDealAfterPrice.sender,
                amount: contextTakeDealAfterPrice.amount,
                feedId: feedId,
                price: price,
                timestamp: timestamp / 1000,
            }.toCell())
            .endCell();
        self.fetchDeal(queryId, contextTakeDealAfterPrice.dealId, value, contextProcessDeal);
    }

    fun processDealAfterRecievedPrice(query: Cell, ctx: Context, queryId: Int, dealId: Int, feedId: Int, price: Int, timestamp: Int) {
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
        self.fetchDeal(queryId, contextProcessDealAfterPrice.dealId, value, contextProcessDeal);    
    }   

    // handlers of deal received from Deal contract ------------------------------------------------------


    fun takeDealAfterRecievedDeal(deal: DealData, query: Cell, ctx: Context, queryId: Int, dealId: Int) {
        let contextTakeDealAfterDeal: ContextTakeDealForDealReceived = ContextTakeDealForDealReceived.fromCell(query);
        
        require(deal.maker != contextTakeDealAfterDeal.from, "Taker shouldn't be maker");
        require(deal.status == DEAL_STATUS_CREATED, "Deal is not created");
        require(contextTakeDealAfterDeal.feedId == self.feedId, "Wrong feedId");
        require(contextTakeDealAfterDeal.timestamp >= now() - TIME_SLIPPAGE, "Price is too old"); //todo return tokens

        let collateralAmount: Int = (deal.percent * contextTakeDealAfterDeal.price) / COLLATERAL_DENOMINATOR; 
        require(contextTakeDealAfterDeal.amount >= collateralAmount, "Insufficient amount of deposit for the deal");

        require(( contextTakeDealAfterDeal.price >
                (deal.rateMaker -
                    (deal.rateMaker * deal.slippageMaker!) /
                    COLLATERAL_DENOMINATOR)), "Deposit Out of range"); //todo return tokens

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
            deal.buyerTokenId = self.mint(queryId, contextTakeDealAfterDeal.from, storageFee + gasConsumption, contextTakeDealAfterDeal.from);
            deal.sellerTokenId = self.mint(queryId, deal.maker, storageFee + gasConsumption, deal.maker);
        } else {
            deal.sellerTokenId = self.mint(queryId, contextTakeDealAfterDeal.from, storageFee + gasConsumption, contextTakeDealAfterDeal.from);
            deal.buyerTokenId = self.mint(queryId, deal.maker, storageFee + gasConsumption, deal.maker);
        }

        // Emit DealAccepted event
        // self.emitDealAccepted(dealId);

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
        let winit: StateInit = initOf Deal(msg.id, myAddress());

        require(ctx.sender == contractAddress(winit), "ReportData must be from Deal contract");
        let deal: DealData = DealData.fromCell(msg.data);
        let query: Slice = self.mapQueriesToContext.get(msg.queryId)!!.beginParse();
        self.mapQueriesToContext.del(msg.queryId);

        let opcode: Int = query.loadUint(8);
        if (opcode == INNER_OP_CODE_TAKE_DEAL_AFTER_DEAL_RECEIVED) { 
            self.takeDealAfterRecievedPrice(query.loadRef(), ctx, msg.queryId, feedId, price, timestamp);
        } else if (opcode == INNER_OP_CODE_PROCESS_DEAL_AFTER_DEAL_RECEIVED) {
            self.processDealAfterRecievedPrice(query.loadRef(), ctx, msg.queryId, feedId, price, timestamp);
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
        } else if (opcode == INNER_OP_CODE_CANCEL_DEAL_AFRTER_DEAL_RECEIVED) {
            self.cancelDealAfterRecievedDeal(deal, query.loadRef(), ctx, msg.queryId, msg.id);
        } else if (opcode == INNER_OP_CODE_PROCESS_DEAL_AFRTER_DEAL_RECEIVED) {
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

    get fun factory(): Address {
        return self.factory;
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
}