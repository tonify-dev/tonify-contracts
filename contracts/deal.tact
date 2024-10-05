import "@stdlib/ownable";
import "./deal_messages";

const DEAL_RESERVE_VALUE : Int = ton("0.01");

contract Deal with Ownable {
    id: Int as uint32;
    owner: Address;
    data: Cell?;
    init(id: Int, owner: Address){
        self.id = id;
        self.owner = owner;
    }

    receive(msg: SaveData){
        nativeReserve(DEAL_RESERVE_VALUE, 0);
        self.requireOwner();
        self.data = msg.data;
        send(SendParameters{to: msg.originalGasTo, value: 0, mode: SendRemainingBalance, bounce: false});
    }

    receive(msg: DeleteData){
        nativeReserve(0, 0);
        self.requireOwner();
        send(SendParameters{to: msg.originalGasTo, value: 0, mode: SendRemainingBalance|SendDestroyIfZero, bounce: false});
    }

    receive(msg: GetData){
        nativeReserve(DEAL_RESERVE_VALUE, 0);
        let ctx: Context = context();
        send(SendParameters{
                to: ctx.sender,
                value: 0,
                mode: SendRemainingBalance,
                bounce: true,
                body: ReportData{queryId: msg.queryId, id: self.id, data: self.data!!}.toCell()
            }
        );
    }

    get fun id(): Int {
        return self.id;
    }

    get fun data(): Cell? {
        return self.data;
    }
}