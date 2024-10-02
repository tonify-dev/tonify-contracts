import "@stdlib/ownable";
import "./deal_messages";

contract Deal with Ownable {
    id: Int as uint32;
    owner: Address;
    data: Cell?;
    init(id: Int, owner: Address){
        self.id = id;
        self.owner = owner;
    }

    receive(msg: SaveData){
        self.requireOwner();
        self.data = msg.data;
        send(SendParameters{to: msg.originalGasTo, value: 0, mode: SendIgnoreErrors | SendRemainingValue, bounce: false});
    }

    receive(msg: GetData){
        let ctx: Context = context();
        send(SendParameters{
                to: ctx.sender,
                value: 0,
                mode: SendRemainingValue,
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