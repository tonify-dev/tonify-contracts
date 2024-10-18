import "@stdlib/deploy";
import "./market.tact";

message DeployTokenMarket {
    queryId: Int as uint64;
    id: Int as uint32;
    owner: Address;
    coin: Address;
    amm: Address;
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
    amm: Address;
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
            msg.amm,
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
            amm: msg.amm,
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
            value: TO_TAKE_AMM,
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

    get fun id(): Int {
        return self.id;
    }
}
