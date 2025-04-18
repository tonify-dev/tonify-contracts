import "./nft_messges.tact";
import "../jetton/jetton_messages.tact";

const minTonsForStorage: Int = ton("0.01");
const gasConsumption: Int = ton("0.02");

contract NftItem {
    collection_address: Address;
    item_index: Int; 
    is_initialized: Bool;

    owner: Address?;
    individual_content: Cell?;

    init(collection_address: Address, item_index: Int){
        require(sender() == collection_address, "not from collection");
        self.collection_address = collection_address;
        self.item_index = item_index;
        self.is_initialized = false;
    }

    receive(msg: Transfer){
        let ctx: Context = context(); 
        let msgValue: Int = self.msgValue(ctx.value);
        
        if (self.is_initialized == false) {  
            require(ctx.sender == self.collection_address, "initialized tx need from collection");
            nativeReserve(minTonsForStorage, 0);
            self.is_initialized = true;
            self.owner = msg.new_owner;
            self.individual_content = msg.custom_payload;
            send(SendParameters{
                to: msg.response_destination!!,
                value: msgValue,
                mode: SendRemainingBalance,
                body: Excesses { query_id: msg.query_id }.toCell()
            });
        } else {
            require(ctx.sender == self.owner!!, "not owner");
            self.owner = msg.new_owner;  
            if (msg.forward_amount > 0) {
                send(SendParameters{
                    to: msg.new_owner,
                    value: msg.forward_amount,
                    mode:  SendPayGasSeparately, 
                    bounce: true,
                    body: OwnershipAssigned{
                        query_id: msg.query_id,
                        prev_owner: ctx.sender,
                        forward_payload: msg.forward_payload
                    }.toCell()
                }); 
            }

            msgValue = msgValue - ctx.readForwardFee(); 
            if (msg.response_destination != null) { 
                send(SendParameters{ 
                    to: msg.response_destination!!,
                    value: msgValue - msg.forward_amount,
                    mode: SendPayGasSeparately,
                    bounce: true,
                    body: Excesses { query_id: msg.query_id }.toCell()
                });
            } 
        }
    }

    // receive(msg: TokenNotification) {
    //     require(msg.from == self.collection_address, "Transfer jetton must be from collection");
    //     send(SendParameters{
    //         to: sender(),
    //         value: 0,
    //         mode: SendRemainingBalance,
    //         body: TokenTransfer{query_id: msg.query_id, amount: msg.amount, recipient: self.owner!!, response_destination: self.owner, custom_payload: null, forward_ton_amount: 0, forward_payload: emptySlice()}.toCell()
    //     });
    // }
    
    receive(msg: GetStaticData){ 
        let ctx: Context = context();
        send(SendParameters {
            to: ctx.sender,
            value: 0,
            mode: SendRemainingValue,  
            bounce: true,
            body: ReportStaticData{
                query_id: msg.query_id,
                index_id: self.item_index,
                collection: self.collection_address
            }.toCell()
        });
    }

    receive(msg: GetOwner){ 
        let ctx: Context = context();
        send(SendParameters {
            to: ctx.sender,
            value: 0,
            mode: SendRemainingBalance,  
            bounce: true,
            body: ReportOwner{
                query_id: msg.query_id,
                index_id: self.item_index,
                owner: self.owner!!
            }.toCell()
        });
    }

    fun msgValue(value: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - value;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        return value - (storageFee + gasConsumption);
    }

    
    get fun get_nft_data(): GetNftData {
        let b: StringBuilder = beginString();
        let collectionData: String = (self.individual_content!!).asSlice().asString();
        b.append(collectionData);
        b.append(self.item_index.toString());
        b.append(".json");

        return GetNftData {
            is_initialized: self.is_initialized, 
            index: self.item_index, 
            collection_address: self.collection_address, 
            owner_address: self.owner!!,
            individual_content: b.toCell()
        };
    }
}