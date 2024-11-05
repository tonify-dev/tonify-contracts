# Common description

You can bet tokens to grow or fall price of asset. Maker create deal to buy or sell asset. Taker can take deal or propose deal. Maker can cancel deal if taker not take it.

## Example

For example, let's say 1 TON = $10 and 1 ETH = $2000:

1. Maker creates a deal betting on 5% ETH price increase with 10% slippage.
   The bet amount is calculated as: $2000 _ 5% _ (100% + 10%) = $110 = 11 TON

2. Taker accepts the deal when ETH price is $2050 and TON price is $9.
   Taker's bet is: $2050 \* 5% = $102.5 = 11.39 TON
   Both parties end up betting 11.39 TON each.

3. When the deal expires, ETH price is $2000 and TON price is $20.
   Maker's loss would be $2050 - $2000 = $50 = 2.5 TON
   Since maker bet 11.39 TON, they lose 2.5 TON.

Market can be classified into two criteria: by the presence of AMM (automatic market maker) and by the type of supported assets (TON or other tokens). This division creates four types of markets:

1. Market without amm and TON
2. Market without amm and other tokens
3. Market with amm and TON
4. Market with amm and other tokens

The difference in the presence of AMM is that when there is AMM, the deal is automatically taken by AMM, when there is no AMM(our contract), the deal must be taken by taker(other users).

The difference in the type of supported assets is that TON is a native asset and other tokens are other tokens.

# Checking contract call execution results

If the contract call is successful, the market contract will create events: `CreateDealEvent` for `CreateDeal`, `TakeDealEvent` for `TakeDeal`, `ProcessDealEvent` for `ProcessDeal`, `CancelDealEvent` for `CancelDeal`.
The event body is also a message, meaning it contains an opcode and arguments.

Events can be retrieved from transaction requests to the market contract address by filtering by event opcode and query_id, or from the results of the sent message execution (depends on the client).

Example of event decoding:

```ts
import { loadDealCreatedEvent } from '../wrappers/Market';

const createDealResult = await jettonWalletMaker.send(
    maker.getSender(),
    {
        value: toNano('0.9'),
    },
    {
        $$type: 'TokenTransfer',
        amount: getAmount(rateAsset, rateToken, percent, slippage),
        query_id: 0n,
        recipient: market.address,
        response_destination: maker.address,
        custom_payload: null,
        forward_ton_amount: toNano('0.8'),
        forward_payload: createDealData,
    },
);

const dealCreatedEvent = loadDealCreatedEvent(createDealResult.externals[0].body.beginParse()); // argument can be another Slice containing the event
console.log(dealCreatedEvent);
```

# Description token market without amm

Token market has 4 functions:

1. Create deal
2. Take deal
3. Process deal
4. Cancel deal

## Create deal

You need to add 0.15 TON to the message for gas, remain amount of ton will be returned to sender.


There are two types of markets:

1. Market without amm
   When market is without amm, you don't need to pass oracleAssetData and oracleTokenData, you should specify null.
2. Market with amm
   When market is with amm, you need to pass oracleAssetData and oracleTokenData. After creating a deal automatically takes a deal. Please fetch rateAsset and rateToken from redstone.

### Token market

1. Fetch price about asset and token from oracle(redstone)
2. Send token to market with message `CreateDeal`

```ts
message(0xdfd74530) CreateDeal {
    makerPosition: Bool;
    rateAsset: Int as coins;
    rateToken: Int as coins;
    percent: Int as coins;
    expiration: Int as uint32;
    slippage: Int as coins;
    oracleAssetData: Cell?;
    oracleTokenData: Cell?;
}
```

-   `makerPosition` - true if maker want to buy asset, false if maker want to sell asset
-   `rateAsset` - price of asset in coins
-   `rateToken` - price of token in coins
-   `percent` - percent of price change
-   `expiration` - expiration time in seconds
-   `slippage` - slippage in percents
-   `oracleAssetData` - oracle data for asset (optional need if use amm)
-   `oracleTokenData` - oracle data for token (optional need if use amm)

Example for token market without amm:

```ts
const createDealData = beginCell()
    .store(
        storeCreateDeal({
            $$type: 'CreateDeal',
            makerPosition: true,
            rateAsset: rateAsset,
            rateToken: rateToken,
            percent: percent,
            expiration: expiration,
            slippage: slippage,
            oracleAssetData: null,
            oracleTokenData: null,
        }),
    )
    .asSlice();

const SLIPPAGE_DENOMINATOR = 10n ** 25n;
const COLLATERAL_DENOMINATOR = 10n ** 16n;

function getAmount(rateAsset: bigint, rateToken: bigint, percent: bigint, slippage: bigint): bigint {
    return (
        (rateAsset * percent * rateToken) / COLLATERAL_DENOMINATOR +
        (rateAsset * percent * slippage * rateToken) / SLIPPAGE_DENOMINATOR
    );
}
const amount = getAmount(rateAsset, rateToken, percent, slippage);
const balanceBefore = (await walletOwner.getGetWalletData()).balance;

if (balanceBefore >= amount) {
    await walletOwner.send(
        provider.sender(),
        {
            value: toNano('0.15'),
        },
        {
            $$type: 'TokenTransfer',
            amount: amount,
            query_id: 0n,
            recipient: market.address,
            response_destination: owner,
            custom_payload: null,
            forward_ton_amount: toNano('0.1'),
            forward_payload: createDealData,
        },
    );
}
```

Example for token market with amm:

```ts
const createDealData = beginCell()
    .store(
        storeCreateDeal({
            $$type: 'CreateDeal',
            makerPosition: true,
            rateAsset: rateAsset,
            rateToken: rateToken,
            percent: percent,
            expiration: expiration,
            slippage: slippage,
            oracleAssetData: await createCellFromParamsProvider(
                new ContractParamsProvider({
                    dataServiceId: 'redstone-avalanche-prod',
                    uniqueSignersCount: 2,
                    dataPackagesIds: ['ETH'],
                }),
            ),
            oracleTokenData: await createCellFromParamsProvider(
                new ContractParamsProvider({
                    dataServiceId: 'redstone-avalanche-prod',
                    uniqueSignersCount: 2,
                    dataPackagesIds: ['USDT'],
                }),
            ),
        }),
    )
    .asSlice();

const amount = getAmount(rateAsset, rateToken, percent, slippage);
const balanceBefore = (await walletOwner.getGetWalletData()).balance;
console.log('Amount:', amount);
console.log('User balance:', balanceBefore);
if (balanceBefore >= amount) {
    await walletOwner.send(
        provider.sender(),
        {
            value: toNano('0.3'),
        },
        {
            $$type: 'TokenTransfer',
            amount: amount,
            query_id: 0n,
            recipient: market.address,
            response_destination: owner,
            custom_payload: null,
            forward_ton_amount: toNano('0.25'),
            forward_payload: createDealData,
        },
    );
}
```

### Ton market

1. Fetch price about asset from oracle(redstone)
2. Send ton to market with message `CreateDealTon`

```ts
message CreateDealTon {
    queryId: Int as uint64;
    deal: CreateDealData;
}
struct CreateDealData {
    makerPosition: Bool;
    rateAsset: Int as coins;
    rateToken: Int as coins;
    percent: Int as coins;
    expiration: Int as uint32;
    slippage: Int as coins;
    oracleAssetData: Cell?;
    oracleTokenData: Cell?;
}
```

-   `queryId` - some random number (set by frontend)
-   `makerPosition` - true if maker want to buy asset, false if maker want to sell asset (set by user)
-   `rateAsset` - price of asset in coins (set by frontend)
-   `rateToken` - price of token in coins (set by frontend)
-   `percent` - percent of price change (set by user)
-   `expiration` - expiration time in seconds (set by user)
-   `slippage` - slippage in percents (set by user)
-   `oracleAssetData` - oracle data for asset (set by frontend)
-   `oracleTokenData` - oracle data for token (set by frontend)

Example for ton market without amm:

```ts
const amount = getAmount(rateAsset, rateToken, percent, slippage);

await market.send(
    provider.sender(),
    {
        value: toNano('0.3') + amount,
    },
    {
        $$type: 'CreateDealTon',
        deal: {
            $$type: 'CreateDealData',
            makerPosition: true,
            rateAsset: rateAsset,
            rateToken: rateToken,
            percent: percent,
            expiration: expiration,
            slippage: slippage,
            oracleAssetData: null,
            oracleTokenData: null,
        },
        queryId: 0n,
    },
);
```

Example for ton market with amm:

```ts
const amount = getAmount(rateAsset, rateToken, percent, slippage);

await market.send(
    provider.sender(),
    {
        value: toNano('0.3') + amount,
    },
    {
        $$type: 'CreateDealTon',
        deal: {
            $$type: 'CreateDealData',
            makerPosition: true,
            rateAsset: rateAsset,
            rateToken: rateToken,
            percent: percent,
            expiration: expiration,
            slippage: slippage,
            oracleAssetData: await createCellFromParamsProvider(
                new ContractParamsProvider({
                    dataServiceId: 'redstone-avalanche-prod',
                    uniqueSignersCount: 2,
                    dataPackagesIds: ['ETH'],
                }),
            ),
            oracleTokenData: await createCellFromParamsProvider(
                new ContractParamsProvider({
                    dataServiceId: 'redstone-avalanche-prod',
                    uniqueSignersCount: 2,
                    dataPackagesIds: ['USDT'],
                }),
            ),
        },
        queryId: 0n,
    },
);
```

## Take deal

You need to add 0.3 TON to the message for gas, remain amount of ton will be returned to sender.

User send token to market to take deal. After that deal status will be `DEAL_STATUS_ACCEPTED` and maker and taker get nft(ownership of deal).

1. Check deal status [Deal.md](./Deal.md) , if deal status is not `DEAL_STATUS_CREATED` return error

2. Fetch price about asset and token with signature from oracle(redstone)

3. Send token to market with message `TakeDeal`
   You have data about asset and token from oracle, so you can calculate exactly amount of token to send to market.

### Token market

```ts
message(0x38f0b8f5) TakeDeal {
    dealId: Int as uint32;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}
```

-   `dealId` - id of deal (user find deal)
-   `oracleAssetData` - oracle data for asset (set by frontend)
-   `oracleTokenData` - oracle data for token (set by frontend)

Example:

```ts
const takeDealData = beginCell()
    .store(
        storeTakeDeal({
            $$type: 'TakeDeal',
            dealId: dealId,
            oracleAssetData: await createCellFromParamsProvider(
                new ContractParamsProvider({
                    dataServiceId: 'redstone-avalanche-prod',
                    uniqueSignersCount: 2,
                    dataPackagesIds: ['USDT'],
                }),
            ),
            oracleTokenData: await createCellFromParamsProvider(
                new ContractParamsProvider({
                    dataServiceId: 'redstone-avalanche-prod',
                    uniqueSignersCount: 2,
                    dataPackagesIds: ['USDC'],
                }),
            ),
        }),
    )
    .asSlice();

const SLIPPAGE_DENOMINATOR = 10n ** 25n;
const COLLATERAL_DENOMINATOR = 10n ** 16n;

function getAmountWithoutSlippage(rateAsset: bigint, rateToken: bigint, percent: bigint): bigint {
    return (rateAsset * rateToken * percent) / COLLATERAL_DENOMINATOR;
}
const takeDealResult = await jettonWalletTaker.send(
    taker.getSender(),
    {
        value: toNano('0.35'),
    },
    {
        $$type: 'TokenTransfer',
        amount: getAmountWithoutSlippage(rateAsset, rateToken, percent),
        query_id: 0n,
        recipient: market.address,
        response_destination: taker.address,
        custom_payload: null,
        forward_ton_amount: toNano('0.3'),
        forward_payload: takeDealData,
    },
);
```

### Ton market

```ts
message TakeDealTon {
    queryId: Int as uint64;
    deal: TakeDealData;
}
struct TakeDealData {
    dealId: Int as uint32;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}
```

Example:

```ts
const amount = getAmount(rateAsset, rateToken, percent, slippage);

await market.send(
    provider.sender(),
    {
        value: toNano('0.3') + amount,
    },
    {
        $$type: 'TakeDealTon',
        deal: {
            $$type: 'TakeDealData',
            dealId: 0n,
            oracleAssetData: await createCellFromParamsProvider(
                new ContractParamsProvider({
                    dataServiceId: 'redstone-avalanche-prod',
                    uniqueSignersCount: 2,
                    dataPackagesIds: ['ETH'],
                }),
            ),
            oracleTokenData: await createCellFromParamsProvider(
                new ContractParamsProvider({
                    dataServiceId: 'redstone-avalanche-prod',
                    uniqueSignersCount: 2,
                    dataPackagesIds: ['USDT'],
                }),
            ),
        },
        queryId: 0n,
    },
);
```

## Process deal

You can process deal if deal status is `DEAL_STATUS_ACCEPTED` and time is over or status is `DEAL_STATUS_CREATED` and deal is expired. Probably this should be done by backend periodically.
You need to add 0.5 TON to the message for gas, remain amount of ton will be returned to sender.

1. Check deal data [Deal.md](./Deal.md).
   If status is `DEAL_STATUS_ACCEPTED` then `dateStop` < `now()`
   If status is `DEAL_STATUS_CREATED` then `dateOrderExpiration` < `now()`
2. Send token to market with message `ProcessDeal`

```ts
message ProcessDeal {
    queryId: Int as uint64;
    dealId: Int as uint32;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}
```

-   `queryId` - some random number
-   `dealId` - id of deal
-   `oracleAssetData` - oracle data for asset
-   `oracleTokenData` - oracle data for token

Example:

```ts
const proceedDealResult = await market.send(
    operator.getSender(),
    {
        value: toNano('0.5'),
    },
    {
        $$type: 'ProcessDeal',
        dealId,
        queryId: queryId,
        oracleAssetData: await createCellFromParamsProvider(
            new ContractParamsProvider({
                dataServiceId: 'redstone-avalanche-prod',
                uniqueSignersCount: 2,
                dataPackagesIds: ['USDT'],
                historicalTimestamp: Number((dateStop / 10n) * 1000n * 10n),
            }),
        ),
        oracleTokenData: await createCellFromParamsProvider(
            new ContractParamsProvider({
                dataServiceId: 'redstone-avalanche-prod',
                uniqueSignersCount: 2,
                dataPackagesIds: ['USDC'],
                historicalTimestamp: Number((dateStop / 10n) * 1000n * 10n),
            }),
        ),
    },
);
```

## Cancel deal

Maker can cancel deal if deal status is `DEAL_STATUS_CREATED`.

You need to add 0.1 TON to the message for gas, remain amount of ton will be returned to sender.

1. Check deal data [Deal.md](./Deal.md).
2. Send token to market with message `CancelDeal`

```ts
message CancelDeal {
    queryId: Int as uint64;
    dealId: Int as uint32;
}
```

-   `queryId` - some random number
-   `dealId` - id of deal

Example:

```ts
const cancelDealResult = await market.send(
    maker.getSender(),
    {
        value: toNano('0.1'),
    },
    {
        $$type: 'CancelDeal',
        dealId: dealId,
        queryId: queryId,
    },
);
```
