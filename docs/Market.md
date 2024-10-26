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

# Description token market without amm

Token market has 4 functions:

1. Create deal
2. Take deal
3. Process deal
4. Cancel deal

## Create deal

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

Example:

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

## Take deal

User send token to market to take deal. After that deal status will be `DEAL_STATUS_ACCEPTED` and maker and taker get nft(ownership of deal).

1. Check deal status [Deal.md](./Deal.md) , if deal status is not `DEAL_STATUS_CREATED` return error

2. Fetch price about asset and token with signature from oracle(redstone)

3. Send token to market with message `TakeDeal`
   You have data about asset and token from oracle, so you can calculate exactly amount of token to send to market.

```ts
message(0x38f0b8f5) TakeDeal {
    dealId: Int as uint32;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}
```

-   `dealId` - id of deal
-   `oracleAssetData` - oracle data for asset
-   `oracleTokenData` - oracle data for token

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

## Process deal

You can process deal if deal status is `DEAL_STATUS_ACCEPTED` and time is over or status is `DEAL_STATUS_CREATED` and deal is expired.

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
