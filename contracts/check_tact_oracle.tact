import "@stdlib/deploy";
import "./redstonte_oracle_consumer_base";
message SetPrice {
    queryId: Int as uint64;
    data: Cell;
}

contract CheckTactOracle with Deployable, RedstoneOracleConsumerBase {
    // Empty init() function is present by default in all Tact contracts
    // since v1.3.0, so the following may be omitted:
    //
    id: Int as uint32;
    oracle: Address;
    queryId: Int?;
    feedId: Int? as uint256;
    price: Int? as uint256;
    timestamp: Int? as uint64;
    init(id: Int, oracle: Address){
        self.id = id;
        self.oracle = oracle;
    }

    receive(msg: SetPrice){
        self.fetchPrice(msg.queryId, msg.data);
    }

    override fun onPriceReceived(queryId: Int, feedId: Int, price: Int, timestamp: Int) {
        self.feedId = feedId;
        self.price = price;
        self.timestamp = timestamp;
    }

    override fun onErrorReceived(queryId: Int) {
        dump(queryId);
    }

    get fun feedId(): Int? {
        return self.feedId;
    }

    get fun price(): Int? {
        return self.price;
    }

    get fun balance(): Int? {
        return myBalance();
    }

    get fun timestamp(): Int? {
        return self.timestamp;
    }
}