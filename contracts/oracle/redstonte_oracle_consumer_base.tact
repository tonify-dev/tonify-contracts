const OP_REDSTONE_DATA_FETCHED: Int = 0x935fa9d1; //2c36fe0497717d21bb640dab03970ebf4952f582dbba462a76985802; ;; substr(keccak(RedStone_Data_Fetched), 8)
const OP_REDSTONE_CHECK_AND_RETURN_PRICE: Int = 0x03df94aa;

trait RedstoneOracleConsumerBase {
    oracle: Address;

    abstract fun onPriceReceived(queryId: Int, feedId: Int, price: Int, timestamp: Int);

    abstract fun onOracleErrorReceived(queryId: Int, error: Slice);

    virtual fun fetchPrice(queryId: Int, oracleData: Cell) {
        let slice = oracleData.beginParse();
        let _oracleData = beginCell().storeUint(slice.loadUint(32), 32).storeUint(queryId, 64).storeSlice(slice).storeRef(beginCell().endCell()).endCell();
        send(SendParameters{to: self.oracle, value: 0, mode: SendRemainingBalance, body: _oracleData});
    }

    receive(msg: Slice){
        let op = msg.loadUint(32);
        if (op == OP_REDSTONE_DATA_FETCHED) {
            require(sender() == self.oracle, "only oracle can send this message");
            let queryId = msg.loadUint(64);
            let slice = msg.loadRef().beginParse();
            self.onPriceReceived(queryId, slice.loadUint(256), slice.loadUint(256), slice.loadUint(48));
        }
    }

    bounced(msg: Slice){
        let op = msg.loadUint(32);
        if (op == OP_REDSTONE_CHECK_AND_RETURN_PRICE) {
            let queryId = msg.loadUint(64);
            self.onOracleErrorReceived(queryId, msg);
        }
    }
}