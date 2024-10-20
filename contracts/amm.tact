import "@stdlib/deploy";
import "./market_messages.tact";
import "./imports/constants.tact";

message InnerDeployAmm {
    queryId: Int as uint64;
    jettonWallet: Address;
    originalGasTo: Address;
    market: Address;
}

contract Amm {
    id: Int as uint32;
    market: Address = address("UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ");
    jettonWallet: Address = address("UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ");

    init(id: Int) {
        self.id = id;
    }

    receive(msg: InnerDeployAmm) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
        self.jettonWallet = msg.jettonWallet;
        self.market = msg.market;   
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

    receive(msg: TakeDealAmm) {
        nativeReserve(STORAGE_INIT_VALUE, 0);
        require(sender() == self.market, "Only market can call this function");

        send(SendParameters{
            to: self.jettonWallet,
            value: 0,
            mode: SendRemainingBalance,
            bounce: true,
            body: TokenTransfer{
                amount: msg.amount,
                recipient: sender(),
                query_id: msg.queryId,
                response_destination: msg.originalGasTo,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: TakeDeal{
                    dealId: msg.dealId,
                    oracleData: msg.oracleData,
                    oracleData2: msg.oracleData2,
                }.toCell().beginParse(),
            }.toCell(),
        });
    }

    get fun id(): Int {
        return self.id;
    }
}
