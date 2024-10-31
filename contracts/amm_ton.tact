import "@stdlib/deploy";
import "@stdlib/ownable";
import "./market_messages.tact";
import "./jetton/jetton_messages.tact";
import "./imports/constants.tact";

message InnerDeployAmmTon {
    queryId: Int as uint64;
    originalGasTo: Address;
    market: Address;
}
message WithdrawTon {
    queryId: Int as uint64;
    amount: Int as coins;
}

contract AmmTon with OwnableTransferable {
    id: Int as uint32;
    factory: Address;
    owner: Address;
    market: Address = address("UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ"); // ZERO_ADDRESS
    deposited: Int as coins = 0;

    init(id: Int, factory: Address, owner: Address) {
        self.id = id;
        self.factory = factory;
        self.owner = owner;
    }
    
    receive() {
        self.deposited += context().value;
    }
    receive(slice: Slice) {
        self.deposited += context().value;
    }

    receive(msg: InnerDeployAmmTon) {
        require(sender() == self.factory, "Only factory can call this function");
        nativeReserve(STORAGE_INIT_VALUE + self.deposited, 0);
        require(self.market == ZERO_ADDRESS, "Market already set");
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
        require(sender() == self.market, "Only market can call this function");
        self.deposited -= msg.amount;
        nativeReserve(STORAGE_INIT_VALUE + self.deposited, 0);
        send(SendParameters{
            to: self.market,
            value: 0,
            mode: SendRemainingBalance,
            bounce: true,
            body: TakeDealWithOriginalGasToTon{
                queryId: msg.queryId,
                amount: msg.amount,
                deal: TakeDealDataWithOriginalGasTo{
                    dealId: msg.dealId,
                    oracleAssetData: msg.oracleAssetData,
                    oracleTokenData: msg.oracleTokenData,
                    originalGasTo: msg.originalGasTo,
                },
            }.toCell(),
        });
    }

    receive(msg: WithdrawTon) {
        self.requireOwner();
        self.deposited -= msg.amount;
        nativeReserve(STORAGE_INIT_VALUE + self.deposited, 0);

        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingBalance,
            bounce: true,
        });
    }
    get fun id(): Int {
        return self.id;
    }

    get fun market(): Address {
        return self.market;
    }

    get fun deposited(): Int {
        return self.deposited;
    }   
    
    get fun balance(): Int {
        return myBalance();
    }

}
