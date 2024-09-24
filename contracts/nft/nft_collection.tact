import "./nft_item.tact";


trait NftCollection {
    next_item_index: Int;
    collection_content: Cell;

    // receive("Mint"){
    //     let ctx: Context = context();
    //     let msgValue: Int = ctx.value;
    //     let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
    //     let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
    //     msgValue = msgValue - (storageFee + gasConsumption);
    //     self.mint(ctx.sender, msgValue);

    //     emit(LogEventMintRecord{ minter: sender(), item_id: self.next_item_index, generate_number: nativeRandom() }.toCell());
    // }

    virtual fun mint(query_id: Int, new_owner: Address, msgValue: Int, response_destination: Address): Int {
        // require(self.next_item_index >= 0, "non-sequential NFTs");
        let nft_init: StateInit = self.getNftItemInit(self.next_item_index);
        send(SendParameters{
                to: contractAddress(nft_init),
                value: msgValue,
                bounce: false,
                mode: SendIgnoreErrors,
                body: Transfer{
                    query_id: query_id,
                    new_owner: new_owner,
                    response_destination: response_destination,
                    custom_payload: self.collection_content,
                    forward_amount: 0,
                    forward_payload: emptySlice()
                }.toCell(),
                code: nft_init.code,
                data: nft_init.data
            }
        );
        self.next_item_index = self.next_item_index + 1;
        return self.next_item_index - 1;
    }


    fun fetchOwnerByIndex(query_id: Int, item_index: Int) {
        let initCode: StateInit = self.getNftItemInit(item_index);
         send(SendParameters{
                to: contractAddress(initCode),
                value: 0,
                bounce: false,
                mode: SendIgnoreErrors|SendRemainingValue,
                body: GetOwner{
                    query_id: query_id,
                }.toCell(),
            }
        );
    }
    

    get fun get_collection_data(): CollectionData {
        let b: StringBuilder = beginString();
        let collectionDataString: String = self.collection_content.asSlice().asString();
        b.append(collectionDataString);
        b.append("meta.json");
        return
            CollectionData{
                next_item_index: self.next_item_index,
                collection_content: b.toCell(),
                owner_address: address("UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ"),
            };
    }

    get fun get_nft_address_by_index(item_index: Int): Address? {
        let initCode: StateInit = self.getNftItemInit(item_index);
        return contractAddress(initCode);
    }

    get fun getNftItemInit(item_index: Int): StateInit {
        return initOf NftItem(myAddress(), item_index);
    }

    get fun get_nft_content(index: Int, individual_content: Cell): Cell {
        let b: StringBuilder = beginString();
        let ic: String = individual_content.asSlice().asString();
        b.append(ic);
        return b.toCell();
    }
}