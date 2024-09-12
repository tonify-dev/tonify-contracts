const OP_REDSTONE_DATA_FETCHED: Int = 0x935fa9d1; //2c36fe0497717d21bb640dab03970ebf4952f582dbba462a76985802; ;; substr(keccak(RedStone_Data_Fetched), 8)

trait RedstoneOracleConsumerBase {
    oracle: Address;
    queryId: Int?;

    abstract fun onPriceReceived(queryId: Int, feedId: Int, price: Int, timestamp: Int);

    abstract fun onErrorReceived(queryId: Int);

    virtual fun fetchPrice(queryId: Int, oracleData: Cell) {
        self.queryId = queryId;
        send(SendParameters{to: self.oracle, value: 0, mode: SendRemainingBalance, body: oracleData});
    }

    receive(msg: Slice){
        let op = msg.loadUint(32);
        if (op == OP_REDSTONE_DATA_FETCHED) {
            self.onPriceReceived(self.queryId!!, msg.loadUint(256), msg.loadUint(256), msg.loadUint(48));
        }
    }
}