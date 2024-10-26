

# NFT Transfer

## Overview of TON NFTs

NFTs (Non-Fungible Tokens) on TON are implemented as smart contracts following the standard NFT interface. Each NFT consists of two main components:

1. Collection Contract - Manages the entire collection of NFTs(In our case it is market contract)
2. NFT Item Contract - Represents individual NFT tokens(Mint after take deal to maker and taker)

## Transfer Process

To transfer an NFT to a new owner, you need to:

1. Create a Transfer message
2. Send it to the NFT Item contract with sufficient gas

### Example Code

```ts
const transferResult = await nftItem.send(
    owner.getSender(),
    {
        value: toNano('0.05'),
    },
    {
        $$type: 'Transfer',
        query_id: 1n,
        new_owner: newOwner.address,
        response_destination: owner.address,
        custom_payload: null,
        forward_amount: 0n,
        forward_payload: beginCell().endCell().asSlice(),
    }
);
```
