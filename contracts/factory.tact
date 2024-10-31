import "@stdlib/deploy";
import "./market.tact";
import "./market_ton.tact";
import "./amm.tact";
import "./amm_ton.tact";

message DeployTokenMarket {
    queryId: Int as uint64;
    id: Int as uint32;
    owner: Address;
    coin: Address;
    jettonWallet: Address;
    underlyingAssetName: String;
    duration: Int as uint32;
    collection_content: Cell;
    operatorFee: Int as coins;
    serviceFee: Int as coins;
    oracle: Address;
    feedIdAsset: Int as uint256;
    feedIdToken: Int as uint256;
    operatorFeeAddress: Address;
    originalGasTo: Address;
}

message MarketDeployedEvent {
    queryId: Int as uint64;
    marketAddress: Address;
    id: Int as uint32;
    owner: Address;
    coin: Address;
    jettonWallet: Address;
    underlyingAssetName: String;
    duration: Int as uint32;
    collection_content: Cell;
    operatorFee: Int as coins;
    serviceFee: Int as coins;
    oracle: Address;
    feedIdAsset: Int as uint256;
    feedIdToken: Int as uint256;
    operatorFeeAddress: Address;
}

message DeployTokenMarketWithAmm {
    queryId: Int as uint64;
    id: Int as uint32;
    owner: Address;
    coin: Address;
    jettonWallet: Address;
    jettonWalletAmm: Address;
    underlyingAssetName: String;
    duration: Int as uint32;
    collection_content: Cell;
    operatorFee: Int as coins;
    serviceFee: Int as coins;
    oracle: Address;
    feedIdAsset: Int as uint256;
    feedIdToken: Int as uint256;
    operatorFeeAddress: Address;
    originalGasTo: Address;
}

message MarketDeployedEventWithAmm {
    queryId: Int as uint64;
    marketAddress: Address;
    id: Int as uint32;
    owner: Address;
    coin: Address;
    amm: Address;
    jettonWallet: Address;
    jettonWalletAmm: Address;
    underlyingAssetName: String;
    duration: Int as uint32;
    collection_content: Cell;
    operatorFee: Int as coins;
    serviceFee: Int as coins;
    oracle: Address;
    feedIdAsset: Int as uint256;
    feedIdToken: Int as uint256;
    operatorFeeAddress: Address;
}




message DeployTonMarket {
    queryId: Int as uint64;
    id: Int as uint32;
    owner: Address;
    underlyingAssetName: String;
    duration: Int as uint32;
    collection_content: Cell;
    operatorFee: Int as coins;
    serviceFee: Int as coins;
    oracle: Address;
    feedIdAsset: Int as uint256;
    feedIdToken: Int as uint256;
    operatorFeeAddress: Address;
    originalGasTo: Address;
}

message MarketTonDeployedEvent {
    queryId: Int as uint64;
    marketAddress: Address;
    id: Int as uint32;
    owner: Address;
    underlyingAssetName: String;
    duration: Int as uint32;
    collection_content: Cell;
    operatorFee: Int as coins;
    serviceFee: Int as coins;
    oracle: Address;
    feedIdAsset: Int as uint256;
    feedIdToken: Int as uint256;
    operatorFeeAddress: Address;
}

message DeployTonMarketWithAmm {
    queryId: Int as uint64;
    id: Int as uint32;
    owner: Address;
    underlyingAssetName: String;
    duration: Int as uint32;
    collection_content: Cell;
    operatorFee: Int as coins;
    serviceFee: Int as coins;
    oracle: Address;
    feedIdAsset: Int as uint256;
    feedIdToken: Int as uint256;
    operatorFeeAddress: Address;
    originalGasTo: Address;
}

message MarketTonDeployedEventWithAmm {
    queryId: Int as uint64;
    marketAddress: Address;
    id: Int as uint32;
    owner: Address;
    amm: Address;
    underlyingAssetName: String;
    duration: Int as uint32;
    collection_content: Cell;
    operatorFee: Int as coins;
    serviceFee: Int as coins;
    oracle: Address;
    feedIdAsset: Int as uint256;
    feedIdToken: Int as uint256;
    operatorFeeAddress: Address;
}


contract Factory with Deployable {
    id: Int as uint32;

    init(id: Int) {
        self.id = id;
    }

    receive(msg: DeployTokenMarket) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
        let winit = initOf Market(
            msg.id,
            msg.owner,
            msg.coin,
            ZERO_ADDRESS,
            myAddress(),
            msg.underlyingAssetName,
            msg.duration,
            msg.collection_content,
            msg.operatorFee,
            msg.serviceFee,
            msg.oracle,
            msg.feedIdAsset,
            msg.feedIdToken,
            msg.operatorFeeAddress
        );
        
        emit(MarketDeployedEvent{
            queryId: msg.queryId,
            marketAddress: contractAddress(winit),
            id: msg.id,
            owner: msg.owner,
            coin: msg.coin,
            jettonWallet: msg.jettonWallet,
            underlyingAssetName: msg.underlyingAssetName,
            duration: msg.duration,
            collection_content: msg.collection_content,
            operatorFee: msg.operatorFee,
            serviceFee: msg.serviceFee,
            oracle: msg.oracle,
            feedIdAsset: msg.feedIdAsset,
            feedIdToken: msg.feedIdToken,
            operatorFeeAddress: msg.operatorFeeAddress
        }.toCell());
        send(SendParameters{
            to: contractAddress(winit),
            value: 0,
            mode: SendRemainingBalance,
            bounce: true,
            body: InnerDeployMarket{
                queryId: msg.queryId,
                jettonWallet: msg.jettonWallet,
                originalGasTo: msg.originalGasTo,
            }.toCell(),
            code: winit.code,
            data: winit.data,
        });
    }

    receive(msg: DeployTokenMarketWithAmm) {
        let ammWinit = initOf Amm(msg.id, myAddress(), msg.owner);
        nativeReserve(STORAGE_INIT_VALUE, 0);
        let winit = initOf Market(
            msg.id,
            msg.owner,
            msg.coin,
            contractAddress(ammWinit),
            myAddress(),
            msg.underlyingAssetName,
            msg.duration,
            msg.collection_content,
            msg.operatorFee,
            msg.serviceFee,
            msg.oracle,
            msg.feedIdAsset,
            msg.feedIdToken,
            msg.operatorFeeAddress
        );
        
        emit(MarketDeployedEventWithAmm{
            queryId: msg.queryId,
            marketAddress: contractAddress(winit),
            id: msg.id,
            owner: msg.owner,
            coin: msg.coin,
            amm: contractAddress(ammWinit),
            jettonWallet: msg.jettonWallet,
            jettonWalletAmm: msg.jettonWalletAmm,
            underlyingAssetName: msg.underlyingAssetName,
            duration: msg.duration,
            collection_content: msg.collection_content,
            operatorFee: msg.operatorFee,
            serviceFee: msg.serviceFee,
            oracle: msg.oracle,
            feedIdAsset: msg.feedIdAsset,
            feedIdToken: msg.feedIdToken,
            operatorFeeAddress: msg.operatorFeeAddress
        }.toCell());
        send(SendParameters{
            to: contractAddress(ammWinit),
            value: STORAGE_INIT_VALUE * 2,
            mode: 0,
            bounce: false,
            body: InnerDeployAmm{
                queryId: msg.queryId,
                jettonWallet: msg.jettonWalletAmm,
                market: contractAddress(winit),
                originalGasTo: msg.originalGasTo,
            }.toCell(),
            code: ammWinit.code,
            data: ammWinit.data,
        });
        send(SendParameters{
            to: contractAddress(winit),
            value: 0,
            mode: SendRemainingBalance,
            bounce: true,
            body: InnerDeployMarket{
                queryId: msg.queryId,
                jettonWallet: msg.jettonWallet,
                originalGasTo: msg.originalGasTo,
            }.toCell(),
            code: winit.code,
            data: winit.data,
        });
    }

    receive(msg: DeployTonMarket) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
        let winit = initOf MarketTon(
            msg.id,
            msg.owner,
            ZERO_ADDRESS,
            myAddress(),
            msg.underlyingAssetName,
            msg.duration,
            msg.collection_content,
            msg.operatorFee,
            msg.serviceFee,
            msg.oracle,
            msg.feedIdAsset,
            msg.feedIdToken,
            msg.operatorFeeAddress
        );
        
        emit(MarketTonDeployedEvent{
            queryId: msg.queryId,
            marketAddress: contractAddress(winit),
            id: msg.id,
            owner: msg.owner,
            underlyingAssetName: msg.underlyingAssetName,
            duration: msg.duration,
            collection_content: msg.collection_content,
            operatorFee: msg.operatorFee,
            serviceFee: msg.serviceFee,
            oracle: msg.oracle,
            feedIdAsset: msg.feedIdAsset,
            feedIdToken: msg.feedIdToken,
            operatorFeeAddress: msg.operatorFeeAddress
        }.toCell());
        send(SendParameters{
            to: contractAddress(winit),
            value: 0,
            mode: SendRemainingBalance,
            bounce: true,
            body: InnerDeployMarketTon{
                queryId: msg.queryId,
                originalGasTo: msg.originalGasTo,
            }.toCell(),
            code: winit.code,
            data: winit.data,
        });
    }

    receive(msg: DeployTonMarketWithAmm) {
        let ammWinit = initOf AmmTon(msg.id, myAddress(), msg.owner);
        nativeReserve(STORAGE_INIT_VALUE, 0);
        let winit = initOf MarketTon(
            msg.id,
            msg.owner,
            contractAddress(ammWinit),
            myAddress(),
            msg.underlyingAssetName,
            msg.duration,
            msg.collection_content,
            msg.operatorFee,
            msg.serviceFee,
            msg.oracle,
            msg.feedIdAsset,
            msg.feedIdToken,
            msg.operatorFeeAddress
        );
        
        emit(MarketTonDeployedEventWithAmm{
            queryId: msg.queryId,
            marketAddress: contractAddress(winit),
            id: msg.id,
            owner: msg.owner,
            amm: contractAddress(ammWinit),
            underlyingAssetName: msg.underlyingAssetName,
            duration: msg.duration,
            collection_content: msg.collection_content,
            operatorFee: msg.operatorFee,
            serviceFee: msg.serviceFee,
            oracle: msg.oracle,
            feedIdAsset: msg.feedIdAsset,
            feedIdToken: msg.feedIdToken,
            operatorFeeAddress: msg.operatorFeeAddress
        }.toCell());
        send(SendParameters{
            to: contractAddress(ammWinit),
            value: STORAGE_INIT_VALUE * 2,
            mode: 0,
            bounce: false,
            body: InnerDeployAmmTon{
                queryId: msg.queryId,
                market: contractAddress(winit),
                originalGasTo: msg.originalGasTo,
            }.toCell(),
            code: ammWinit.code,
            data: ammWinit.data,
        });
        send(SendParameters{
            to: contractAddress(winit),
            value: 0,
            mode: SendRemainingBalance,
            bounce: true,
            body: InnerDeployMarketTon{
                queryId: msg.queryId,
                originalGasTo: msg.originalGasTo,
            }.toCell(),
            code: winit.code,
            data: winit.data,
        });
    }

    get fun id(): Int {
        return self.id;
    }
}
