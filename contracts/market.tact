import "@stdlib/deploy";
import "@stdlib/stoppable";
import "./market_messages.tact";
import "./nft/nft_collection.tact";
import "./jetton/jetton_messages.tact";
import "./deal.tact";
import "./oracle/redstonte_oracle_consumer_base.tact";
import "./imports/constants.tact";
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
    feedIdAsset: Int as uint256;
    feedIdToken: Int as uint256;
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
        feedIdAsset: Int,
        feedIdToken: Int,
        operatorFeeAddress: Address){
        require(sender() == factory, "Only factory can deploy");
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
        self.feedIdAsset = feedIdAsset;
        self.feedIdToken = feedIdToken;
        self.operatorFeeAddress = operatorFeeAddress;
    }

    receive(msg: InnerDeployMarket) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
        self.jettonWallet = msg.jettonWallet;
        send(SendParameters{
            to: msg.originalGasTo,
            value: 0,
            mode: SendRemainingBalance,
            bounce: false,
            body: DeployOk{
                queryId: msg.queryId,
            }.toCell()
        });
    }

    receive(msg: WithdrawServiceFee) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
        self.requireOwner();
        require(msg.amount > 0, "Amount must be greater than 0");
        require(msg.amount <= self.serviceFeeSum, "Insufficient service fee");
        self.serviceFeeSum -= msg.amount;
        send(SendParameters{
            to: self.jettonWallet,
            value: 0,
            mode: SendRemainingBalance,
            bounce: true,
            body: TokenTransfer{
                amount: msg.amount,
                query_id: msg.queryId,
                recipient: msg.to,
                response_destination: sender(),
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: emptySlice(),
            }.toCell()
        });
    }   

    receive(msg: WithdrawOperatorFee) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
        let ctx: Context = context();

        require(ctx.sender == self.operatorFeeAddress, "Only operator fee address can withdraw operator fee");
        require(msg.amount > 0, "Amount must be greater than 0");
        require(msg.amount <= self.operatorFeeSum, "Insufficient operator fee");
        self.operatorFeeSum -= msg.amount;
        send(SendParameters{
            to: self.jettonWallet,
            value: 0,
            mode: SendRemainingBalance,
            bounce: true,
            body: TokenTransfer{
                amount: msg.amount,
                query_id: msg.queryId,
                recipient: msg.to,
                response_destination: sender(),
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: emptySlice(),
            }.toCell()
        });
    }

    receive(msg: TokenNotification) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
        let ctx: Context = context();
        require(ctx.sender == self.jettonWallet, "Transfer jetton must be from jetton wallet");

        if(ctx.value < GAS_MIN_VALUE) {
            self.returnTokens(msg.query_id, msg.amount, msg.from, SMALL_VALUE);
            return;
        }
        let opcode: Int = msg.forward_payload.loadUint(32);

        if(opcode == OP_CODE_CREATE_DEAL) {
            let deal: CreateDealData = CreateDealData.fromSlice(msg.forward_payload);
            self.handleCreateDeal(msg.query_id, deal, msg.amount, msg.from);
        } else if (opcode == OP_CODE_TAKE_DEAL) {
            let deal: TakeDealData = TakeDealData.fromSlice(msg.forward_payload);
            self.handleTakeDeal(msg.query_id, deal, msg.amount, msg.from, msg.from);
        } else if (opcode == OP_CODE_TAKE_DEAL_WITH_ORIGINAL_GAS_TO) {
            let deal: TakeDealDataWithOriginalGasTo = TakeDealDataWithOriginalGasTo.fromSlice(msg.forward_payload.loadRef().beginParse());
            self.handleTakeDeal(msg.query_id, TakeDealData{
                dealId: deal.dealId,
                oracleAssetData: deal.oracleAssetData,
                oracleTokenData: deal.oracleTokenData,
            }, msg.amount, msg.from, deal.originalGasTo);
        }
    }

    receive(msg: CancelDeal) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
        let ctx: Context = context();
        require(ctx.value >= GAS_MIN_VALUE, "Invalid value");

        let contextCancelDeal: Cell = beginCell().storeUint(INNER_OP_CODE_CANCEL_DEAL_AFTER_DEAL_RECEIVED, 8).storeRef(ContextCancelDealForDealReceived{from: ctx.sender}.toCell()).endCell();   
        self.fetchDeal(msg.queryId, msg.dealId, contextCancelDeal);    
    }

    receive(msg: ProcessDeal) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
        let ctx: Context = context();
        require(ctx.value >= GAS_MIN_VALUE, "Invalid value");

        let contextProcessDeal: Cell = beginCell()
            .storeUint(INNER_OP_CODE_PROCESS_DEAL_AFTER_PRICE_RECEIVED, 8)
            .storeRef(ContextProcessDealForPriceReceived{from: ctx.sender, dealId: msg.dealId}.toCell())
            .endCell();   
        self.fetchPriceWithSaveContext(msg.queryId, msg.oracleAssetData, msg.oracleTokenData, contextProcessDeal);    
    }
    
    fun handleCreateDeal(queryId: Int, deal: CreateDealData, amount: Int, from: Address) {
        let dealId: Int = self.countDeal;

        let slippageAmount: Int = (deal.rateAsset * deal.rateToken * deal.percent * deal.slippage) / SLIPPAGE_DENOMINATOR;
        let collateralAmountMaker: Int = (deal.rateAsset * deal.rateToken * deal.percent) / COLLATERAL_DENOMINATOR + slippageAmount;
       
        if(amount < collateralAmountMaker) {
            self.returnTokens(queryId, amount, from, SMALL_TOKEN_AMOUNT);
            return;
        }

        self.countDeal += 1;
        if (self.amm != ZERO_ADDRESS) {
            send(SendParameters{
                to: self.amm,
                value: TO_TAKE_AMM,
                mode: 0,
                bounce: true,
                body: TakeDealAmm{
                    dealId: dealId,
                    queryId: queryId,
                    amount: collateralAmountMaker,
                    originalGasTo: from,
                    oracleAssetData: deal.oracleAssetData!!,
                    oracleTokenData: deal.oracleTokenData!!
                }.toCell()
            });
        }

        let newDeal: DealData = DealData{
            rate: 0,
            rateMaker: deal.rateAsset,
            percent: deal.percent,
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
            status: DEAL_STATUS_CREATED
        };

        emit(DealCreatedEvent{
            queryId: queryId,
            dealId: dealId,
            maker: from,
            collateralAmountMaker: collateralAmountMaker
        }.toCell());

        self.saveDeal(queryId, dealId, newDeal, from);
    }

    fun handleTakeDeal(queryId: Int, takeDeal: TakeDealData, amount: Int, from: Address, originalGasTo: Address) {
        let contextProcessDeal: Cell = beginCell()
            .storeUint(INNER_OP_CODE_TAKE_DEAL_AFTER_PRICE_RECEIVED, 8)
            .storeRef(ContextTakeDealForPriceReceived{
                from: from,
                amount: amount,
                dealId: takeDeal.dealId,
                originalGasTo: originalGasTo
            }.toCell())
            .endCell();
        
        self.fetchPriceWithSaveContext(queryId, takeDeal.oracleAssetData, takeDeal.oracleTokenData, contextProcessDeal);
    }

    fun takeDealAfterRecievedPrice(query: Cell, ctx: Context, queryId: Int, feedId: Int, price: Int, timestamp: Int, feedId2: Int, price2: Int, timestamp2: Int) {
        let contextTakeDealAfterPrice: ContextTakeDealForPriceReceived = ContextTakeDealForPriceReceived.fromCell(query);
        let contextProcessDeal: Cell = beginCell()
            .storeUint(INNER_OP_CODE_TAKE_DEAL_AFTER_DEAL_RECEIVED, 8)
            .storeRef(ContextTakeDealForDealReceived{
                from: contextTakeDealAfterPrice.from,
                amount: contextTakeDealAfterPrice.amount,
                originalGasTo: contextTakeDealAfterPrice.originalGasTo,
                feedId: feedId,
                price: price,
                timestamp: timestamp / 1000,
                feedId2: feedId2,
                price2: price2,
                timestamp2: timestamp2 / 1000,
            }.toCell())
            .endCell();
        self.fetchDeal(queryId, contextTakeDealAfterPrice.dealId, contextProcessDeal);
    }

    fun processDealAfterRecievedPrice(query: Cell, ctx: Context, queryId: Int, feedId: Int, price: Int, timestamp: Int, feedId2: Int, price2: Int, timestamp2: Int) {
        let contextProcessDealAfterPrice: ContextProcessDealForPriceReceived = ContextProcessDealForPriceReceived.fromCell(query);
        let contextProcessDeal: Cell = beginCell()
            .storeUint(INNER_OP_CODE_PROCESS_DEAL_AFTER_DEAL_RECEIVED, 8)
            .storeRef(ContextProcessDealForDealReceived{
                from: contextProcessDealAfterPrice.from,
                feedId: feedId,
                price: price,
                timestamp: timestamp / 1000,
                feedId2: feedId2,
                price2: price2,
                timestamp2: timestamp2 / 1000,
            }.toCell())
            .endCell();
        self.fetchDeal(queryId, contextProcessDealAfterPrice.dealId, contextProcessDeal);    
    }   

    


    fun takeDealAfterRecievedDeal(deal: DealData, query: Cell, ctx: Context, queryId: Int, dealId: Int) {
        let contextTakeDealAfterDeal: ContextTakeDealForDealReceived = ContextTakeDealForDealReceived.fromCell(query);
        
        if (deal.maker == contextTakeDealAfterDeal.from) {
            self.returnTokens(queryId, contextTakeDealAfterDeal.amount, contextTakeDealAfterDeal.from, TRANSACTION_FROM_MAKER);
            return;
        }
        if (deal.status != DEAL_STATUS_CREATED) {
            self.returnTokens(queryId, contextTakeDealAfterDeal.amount, contextTakeDealAfterDeal.from, BAD_STATUS);
            return;
        }
        if (contextTakeDealAfterDeal.feedId != self.feedIdAsset || contextTakeDealAfterDeal.feedId2 != self.feedIdToken) {
            self.returnTokens(queryId, contextTakeDealAfterDeal.amount, contextTakeDealAfterDeal.from, BAD_FEED_ID);
            return;
        }
        if (contextTakeDealAfterDeal.timestamp < now() - TIME_SLIPPAGE) {
            self.returnTokens(queryId, contextTakeDealAfterDeal.amount, contextTakeDealAfterDeal.from, ORACLE_PRICE_TOO_OLD);
            return;
        }

        let collateralAmount: Int = (deal.percent * contextTakeDealAfterDeal.price * contextTakeDealAfterDeal.price2) / COLLATERAL_DENOMINATOR; 
        if (contextTakeDealAfterDeal.amount < collateralAmount) {
            self.returnTokens(queryId, contextTakeDealAfterDeal.amount, contextTakeDealAfterDeal.from, SMALL_AMOUNT);
            return;
        }

        if ((contextTakeDealAfterDeal.price <=
                (deal.rateMaker -
                    (deal.rateMaker * deal.slippageMaker) /
                    RATE_DENOMINATOR)) &&
            (contextTakeDealAfterDeal.price >=
                (deal.rateMaker +
                    (deal.rateMaker * deal.slippageMaker) /
                    RATE_DENOMINATOR))) {
            self.returnTokens(queryId, contextTakeDealAfterDeal.amount, contextTakeDealAfterDeal.from, MAKER_OUT_OF_RANGE);
            return;
        }

        let returnAmount: Int = deal.collateralAmountMaker - collateralAmount;
        if(returnAmount < 0) {
            self.returnTokens(queryId, contextTakeDealAfterDeal.amount, contextTakeDealAfterDeal.from, SMALL_AMOUNT_OF_MAKER);
            return;
        }
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
                    response_destination: contextTakeDealAfterDeal.from,
                    custom_payload: null,
                    forward_ton_amount: 0,
                    forward_payload: emptySlice(),
                }.toCell()
            }); 
        }

        deal.collateralAmountMaker = collateralAmount;
        deal.rate = contextTakeDealAfterDeal.price;
        deal.dateStart = now();
        deal.dateStop = now() + self.duration;
        deal.status = DEAL_STATUS_ACCEPTED;

        if (deal.isSeller) {
            deal.buyerTokenId = self.mint(queryId, contextTakeDealAfterDeal.from, minTonsForStorage + gasConsumption, contextTakeDealAfterDeal.originalGasTo);
            deal.sellerTokenId = self.mint(queryId, deal.maker, minTonsForStorage + gasConsumption, contextTakeDealAfterDeal.originalGasTo);
        } else {
            deal.sellerTokenId = self.mint(queryId, contextTakeDealAfterDeal.from, minTonsForStorage + gasConsumption, contextTakeDealAfterDeal.originalGasTo);
            deal.buyerTokenId = self.mint(queryId, deal.maker, minTonsForStorage + gasConsumption, contextTakeDealAfterDeal.originalGasTo);
        }

        emit(DealAcceptedEvent{
            queryId: queryId,
            dealId: dealId,
            maker: deal.maker,
            collateralAmountMaker: deal.collateralAmountMaker
        }.toCell());

        self.saveDeal(queryId, dealId, deal, contextTakeDealAfterDeal.originalGasTo);
    }

    fun cancelDealAfterRecievedDeal(deal: DealData, query: Cell, ctx: Context, queryId: Int, dealId: Int) {
        let contextCancelDealAfterDeal: ContextCancelDealForDealReceived = ContextCancelDealForDealReceived.fromCell(query);
        if (deal.maker != contextCancelDealAfterDeal.from) {
            return;
        }
        emit(CancelEvent{
            queryId: queryId,
            dealId: dealId,
            maker: deal.maker,
            collateralAmountMaker: deal.collateralAmountMaker
        }.toCell()); 
        self._cancelDeal(deal, contextCancelDealAfterDeal.from, queryId, dealId);
    }       

    fun processDealAfterRecievedDeal(deal: DealData, query: Cell, ctx: Context, queryId: Int, dealId: Int) {
        let contextProcessDealAfterDeal: ContextProcessDealForDealReceived = ContextProcessDealForDealReceived.fromCell(query);
        if (deal.status == DEAL_STATUS_CREATED && deal.dateOrderExpiration <= now()) {
            emit(DealExpiredEvent{
                queryId: queryId,
                dealId: dealId,
                maker: deal.maker,
                collateralAmountMaker: deal.collateralAmountMaker
            }.toCell());
            self._cancelDeal(deal, contextProcessDealAfterDeal.from, queryId, dealId);
            return;
        }  

        if (!(deal.status == DEAL_STATUS_ACCEPTED && deal.dateStop <= now())) {
            return;
        }
        if (contextProcessDealAfterDeal.feedId != self.feedIdAsset || contextProcessDealAfterDeal.feedId2 != self.feedIdToken) {
            return;
        }
        if (contextProcessDealAfterDeal.timestamp < deal.dateStop - TIME_SLIPPAGE || contextProcessDealAfterDeal.timestamp > deal.dateStop) {
            return;
        }
        if (contextProcessDealAfterDeal.timestamp2 < deal.dateStop - TIME_SLIPPAGE || contextProcessDealAfterDeal.timestamp2 > deal.dateStop) {
            return;
        }
        let collateralAmount: Int = deal.collateralAmountMaker;
        let payoutBuyer: Int = 0;
        let payoutSeller: Int = 0;

        let delta = (deal.rate - contextProcessDealAfterDeal.price) * contextProcessDealAfterDeal.price2 / RATE_DENOMINATOR;

        if(abs(delta) >= collateralAmount) {
            if (delta > 0) {
                payoutSeller = collateralAmount * 2;
            } else {
                payoutBuyer = collateralAmount * 2;
            }
        } else {
            payoutSeller = collateralAmount + delta;
            payoutBuyer = collateralAmount - delta;
        }

        let operatorFee: Int = 0;
        let serviceFee: Int = 0;

        if (payoutBuyer > 0) {
            if (payoutBuyer > collateralAmount) {
                operatorFee = ((payoutBuyer - collateralAmount) * self.operatorFee) / FEE_DENOMINATOR;
                serviceFee = ((payoutBuyer - collateralAmount) * self.serviceFee) / FEE_DENOMINATOR;
                payoutBuyer = payoutBuyer - operatorFee - serviceFee;
            }
            self.sendTokens(deal.buyerTokenId, payoutBuyer, queryId, contextProcessDealAfterDeal.from);
        }

        if (payoutSeller > 0) {
            if (payoutSeller > collateralAmount) {
                operatorFee = ((payoutSeller - collateralAmount) * self.operatorFee) / FEE_DENOMINATOR;
                serviceFee = ((payoutSeller - collateralAmount) * self.serviceFee) / FEE_DENOMINATOR;
                payoutSeller = payoutSeller - operatorFee - serviceFee;
            }
            self.sendTokens(deal.sellerTokenId, payoutSeller, queryId + 1, contextProcessDealAfterDeal.from);
        }

        self.operatorFeeSum += operatorFee;
        self.serviceFeeSum += serviceFee;

        emit(DealCompletedEvent{
            queryId: queryId,
            dealId: dealId,
            maker: deal.maker,
            collateralAmountMaker: deal.collateralAmountMaker
        }.toCell());
        self.deleteDeal(queryId, dealId, contextProcessDealAfterDeal.from);   
    }

    fun _cancelDeal(deal: DealData, originalGasTo: Address, queryId: Int, dealId: Int) {
        require(deal.status == DEAL_STATUS_CREATED, "Deal is not created");
        send(SendParameters{
            to: self.jettonWallet,
            value: GAS_TO_SEND_JETTON,
            mode: 0,
            bounce: true,
            body: TokenTransfer{
                amount: deal.collateralAmountMaker,
                query_id: queryId,
                recipient: deal.maker,
                response_destination: originalGasTo,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: emptySlice(),
            }.toCell()
        });
        self.deleteDeal(queryId, dealId, originalGasTo);   
    }

    fun sendTokens(tokenId: Int, amount: Int, queryId: Int, originalGasTo: Address) {
        require(self.mapQueriesToContext.get(queryId) == null, "QueryId already exists");

        let contextForGetOwner: ContextForGetOwner = ContextForGetOwner{
            amount: amount,
            originalGasTo: originalGasTo,
        };
        self.mapQueriesToContext.set(queryId, contextForGetOwner.toCell());

        self.fetchOwnerByIndex(queryId, tokenId, GAS_TO_FETCH_OWNER);
    }       

    receive(msg: ReportOwner) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
        let ctx: Context = context();
        let winit: StateInit = initOf NftItem(myAddress(), msg.index_id);

        require(ctx.sender == contractAddress(winit), "ReportOwner must be from nft contract");
        let contextForGetOwner: ContextForGetOwner = ContextForGetOwner.fromCell(self.mapQueriesToContext.get(msg.query_id));
        self.mapQueriesToContext.del(msg.query_id);
        send(SendParameters{
            to: self.jettonWallet,
            value: 0,
            mode:  SendRemainingBalance, 
            bounce: true,
            body: TokenTransfer{
                amount: contextForGetOwner.amount,
                query_id: msg.query_id,
                recipient: msg.owner,
                response_destination: contextForGetOwner.originalGasTo,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: emptySlice(),
            }.toCell()
        });
    }

    fun saveDeal(queryId: Int, dealId: Int, deal: DealData, originalGasTo: Address) { 
        let winit: StateInit = initOf Deal(dealId, myAddress());

        send(SendParameters{
            to: contractAddress(winit),
            value: 0,
            mode: SendRemainingBalance,
            bounce: false,
            body: SaveData{
                queryId: queryId,
                originalGasTo: originalGasTo,
                data: deal.toCell(),
            }.toCell(),
            code: winit.code,
            data: winit.data
        });
    }

    fun deleteDeal(queryId: Int, dealId: Int, originalGasTo: Address) { 
        let winit: StateInit = initOf Deal(dealId, myAddress());

        send(SendParameters{
            to: contractAddress(winit),
            value: 0,
            mode: SendRemainingBalance,
            bounce: false,
            body: DeleteData{
                queryId: queryId,
                originalGasTo: originalGasTo,
            }.toCell(),
            code: winit.code,
            data: winit.data
        });
    }

    fun fetchPriceWithSaveContext(queryId: Int, oracleAssetData: Cell, oracleTokenData: Cell, saveContext: Cell) {
        require(self.mapQueriesToContext.get(queryId) == null, "QueryId already exists");
        self.mapQueriesToContext.set(queryId, saveContext);
        self.fetchPrice(queryId, oracleAssetData, oracleTokenData);
    }

    override fun onPriceReceived(queryId: Int, feedId: Int, price: Int, timestamp: Int, feedId2: Int, price2: Int, timestamp2: Int) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
        let ctx: Context = context();
        let query: Slice = self.mapQueriesToContext.get(queryId)!!.beginParse();
        self.mapQueriesToContext.del(queryId);

        let opcode: Int = query.loadUint(8);

        if (opcode == INNER_OP_CODE_TAKE_DEAL_AFTER_PRICE_RECEIVED) { 
            self.takeDealAfterRecievedPrice(query.loadRef(), ctx, queryId, feedId, price, timestamp, feedId2, price2, timestamp2);
        } else if (opcode == INNER_OP_CODE_PROCESS_DEAL_AFTER_PRICE_RECEIVED) {
            self.processDealAfterRecievedPrice(query.loadRef(), ctx, queryId, feedId, price, timestamp, feedId2, price2, timestamp2);
        }
    }

    fun fetchDeal(queryId: Int, dealId: Int, saveContext: Cell) { 
        require(self.mapQueriesToContext.get(queryId) == null, "QueryId already exists");

        self.mapQueriesToContext.set(queryId, saveContext);
        let winit: StateInit = initOf Deal(dealId, myAddress());
        send(SendParameters{
            to: contractAddress(winit),
            value: 0,
            mode: SendRemainingBalance,
            bounce: true,
            body: GetData{
                queryId: queryId, 
            }.toCell()
        });
    }

    receive(msg: ReportData) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
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
 
    fun returnTokens(queryId: Int, amount:Int, to: Address, reason: Int) {
        send(SendParameters{
            to: self.jettonWallet,
            value: 0,
            mode: SendRemainingBalance,
            bounce: true,
            body: TokenTransfer{
                amount: amount,
                recipient: to,
                query_id: queryId,
                response_destination: to,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: beginCell().storeUint(reason, 8).asSlice()
            }.toCell()
        });
    }
    
    override fun onOracleErrorReceived(queryId: Int, error: Slice) {
        self.mapQueriesToContext.del(queryId);
    }

    override fun onBouncedGetOwner(queryId: Int) {
        self.mapQueriesToContext.del(queryId);
    }   
    
    bounced(msg: GetData) {
        self.mapQueriesToContext.del(msg.queryId);
    }

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
    
    get fun balance(): Int {
        return myBalance();
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

    get fun factory(): Address {
        return self.factory;
    }

    get fun feedIdAsset(): Int {
        return self.feedIdAsset;
    }

    get fun feedIdToken(): Int {
        return self.feedIdToken;
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
    
    get fun mapQueriesToContext(): map<Int, Cell> {
        return self.mapQueriesToContext;
    }
}