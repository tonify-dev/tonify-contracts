import "@stdlib/deploy";
import "@stdlib/stoppable";
import "./market_messages.tact";

contract Market with Deployable, Resumable {
    id: Int as uint32;
    owner: Address;
    amm: Address;
    coin: Address;
    factory: Address;
    underlyingAssetName: String;
    duration: Int as uint32;
    operatorFee: Int as uint32;
    serviceFee: Int as uint32;
    stopped: Bool = false;

    init(id: Int, owner: Address, coin: Address, amm: Address, factory: Address, underlyingAssetName: String, duration: Int, operatorFee: Int, serviceFee: Int){
        self.id = id;
        self.owner = owner;
        self.coin = coin;
        self.amm = amm;
        self.factory = factory;
        self.underlyingAssetName = underlyingAssetName;
        self.duration = duration;
        self.operatorFee = operatorFee;
        self.serviceFee = serviceFee;
    }

    get fun id(): Int {
        return self.id;
    }

    get fun amm(): Address {
        return self.amm;
    }

    get fun coin(): Address {
        return self.coin;
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
