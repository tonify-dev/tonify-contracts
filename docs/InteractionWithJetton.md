## Example of sending a Jetton (Token)

Each Jetton has its own wallet address, which is calculated from the Jetton master address, the owner's address and jetton wallet code.
For interaction with Jetton, you need to use the your Jetton wallet address. And send internal messages to this address.

```typescript
jettonWallet = await JettonDefaultWallet.fromInit(market.address, jettonMaster.address);
// If jetton has other wallet your need to calculate address using other code of jetton wallet.


const transferPayload = beginCell()
    .store({
        $$type: 'Transfer',
        queryId: 0n, // Unique identifier for the transfer must be random
        amount: amount, // Amount of Jetton to transfer
        recipient: Address.parse(recipientAddress), // Recipient's address
        responseDestination: senderAddress, // Where to send the response
        customPayload: null, // Optional custom payload for jetton contract
        forwardTonAmount: 0n, // Optional TON to forward to the recipient with the forwardPayload
        forwardPayload: beginCell().asSlice(), // Optional payload to forward to the recipient (need for create deal, take deal)
    })
    .endCell();

const sendResult = await jettonWallet.send(
    senderWallet.getSender(),
    {
        value: toNano('0.1'), // Amount of TON to attach for the transaction
    },
    transferPayload,
);
```
