import "@stdlib/deploy";
import "@stdlib/ownable";
import "./market_messages.tact";
import "./jetton/jetton_messages.tact";
import "./imports/constants.tact";

message InnerDeployAmm {
    queryId: Int as uint64;
    jettonWallet: Address;
    originalGasTo: Address;
    market: Address;
}
message WithdrawToken {
    queryId: Int as uint64;
    amount: Int as coins;
    originalGasTo: Address;
}

contract Amm with OwnableTransferable {
    id: Int as uint32;
    factory: Address;
    owner: Address;
    market: Address = address("UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ"); // ZERO_ADDRESS
    jettonWallet: Address = address("UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ"); // ZERO_ADDRESS

    init(id: Int, factory: Address, owner: Address) {
        self.id = id;
        self.factory = factory;
        self.owner = owner;
    }

    receive(msg: InnerDeployAmm) {
        require(sender() == self.factory, "Only factory can call this function");
        nativeReserve(STORAGE_INIT_VALUE, 0);
        require(self.market == ZERO_ADDRESS, "Market already set");
        require(self.jettonWallet == ZERO_ADDRESS, "Jetton wallet already set");
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
                forward_ton_amount: TO_TAKE_TO_MARKET,
                forward_payload: TakeDealWithOriginalGasTo{
                    data: TakeDealDataWithOriginalGasTo{
                        dealId: msg.dealId,
                        oracleAssetData: msg.oracleAssetData,
                        oracleTokenData: msg.oracleTokenData,
                        originalGasTo: msg.originalGasTo,
                    }.toCell(),
                }.toCell().beginParse(),
            }.toCell(),
        });
    }

    receive(msg: WithdrawToken) {
        self.requireOwner();
        nativeReserve(STORAGE_INIT_VALUE, 0);
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
                forward_payload: emptySlice(),
            }.toCell(),
        });
    }
    get fun id(): Int {
        return self.id;
    }
}
