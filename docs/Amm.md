## Amm Contract Documentation

The `Amm` (Automated Market Maker) contract make deal with user's deal.
Owner must top up contract balance to auto take deal with user.
Owner can withdraw tokens from contract if he don't want to make deal with users.

#### Example withdraw tokens

```ts
import { toNano, beginCell } from 'ton-core';
import { ContractProvider, WalletContract } from 'ton-contract-executor';
import { Amm } from './contracts/Amm'; // Adjust the import path as necessary

async function withdrawTokens() {
    const wallet = WalletContract.fromAddress('YOUR_WALLET_ADDRESS');
    const provider = new ContractProvider(wallet, 'YOUR_PROVIDER');

    const queryId = 1n;
    const amount = toNano('10');
    const originalGasTo = 'RECIPIENT_ADDRESS';

    const withdrawTokenMessage = beginCell()
        .store({
            $$type: 'WithdrawToken',
            queryId: queryId,
            amount: amount,
            originalGasTo: originalGasTo,
        })
        .endCell();

    await provider.sendMessage({
        sendTo: 'AMM_CONTRACT_ADDRESS',
        value: toNano('0.05'),
        bounce: false,
        body: withdrawTokenMessage,
    });

    console.log('WithdrawToken message sent successfully.');
}

withdrawTokens().catch(console.error);
```

### Contract Messages

#### WithdrawToken

Facilitates the withdrawal of tokens from the AMM contract.

- `queryId: Int as uint64` - Unique identifier for the withdrawal query.
- `amount: Int as coins` - Amount of tokens to withdraw.
- `originalGasTo: Address` - Address to receive any remaining gas after withdrawal.

The `Amm` contract defines several messages to handle different operations:

#### InnerDeployAmm

Used to deploy the AMM contract and set up initial parameters.

- `queryId: Int as uint64` - Unique identifier for the deployment query.
- `jettonWallet: Address` - Address of the jetton wallet.
- `originalGasTo: Address` - Address to receive any remaining gas after deployment.
- `market: Address` - Address of the market contract.

#### TakeDealAmm

Handles the acceptance of a deal by interacting with the jetton wallet.

- `queryId: Int as uint64` - Unique identifier for the take deal query.
- `amount: Int as coins` - Amount of tokens to be taken.
- `originalGasTo: Address` - Address to receive any remaining gas.
- `dealId: Int as uint32` - Identifier of the deal.
- `oracleAssetData: Cell` - Oracle data for the asset.
- `oracleTokenData: Cell` - Oracle data for the token.

