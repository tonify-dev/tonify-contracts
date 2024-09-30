import "@stdlib/deploy";

const OP_REDSTONE_DATA_FETCHED: Int = 0x935fa9d1; //2c36fe0497717d21bb640dab03970ebf4952f582dbba462a76985802; ;; substr(keccak(RedStone_Data_Fetched), 8)
const OP_REDSTONE_CHECK_AND_RETURN_PRICE: Int = 0x03df94aa;
message(0x03df94aa) CheckAndReturnPriceForTest {
    feedId: Int as uint256;
    price: Int as uint256;
    timestamp: Int as uint64;
    needBounce: Bool;
}
message(0x03df94aa) CheckAndReturnPrice {
    queryId: Int as uint64;
    feedId: Int as uint256;
    price: Int as uint256;
    timestamp: Int as uint64;
    needBounce: Bool;
}




// message(0x935fa9d1) DataFetched {
//     queryId: Int as uint64;
//     feedId: Int as uint256;
//     price: Int as uint256;
//     timestamp: Int as uint48;
// }

contract OracleMock with Deployable {
    id: Int as uint32 = 0;

    init(id: Int){
        self.id = id;
    }

    receive(msg: CheckAndReturnPrice){
            dump(1);
        require(!msg.needBounce, "Need bounce");
        let body =  beginCell().storeUint(OP_REDSTONE_DATA_FETCHED, 32).storeUint(msg.queryId, 64).storeRef(beginCell().storeUint(msg.feedId, 256).storeUint(msg.price, 256).storeUint(msg.timestamp, 48).endCell()).endCell();
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: body
        });
    }


}