# Factory Contract Documentation

The Factory contract is responsible for deploying Market contracts with or without AMM (Automated Market Maker) functionality. It handles the deployment process and emits corresponding events.

Before deploying a Market, it is necessary to calculate the jetton wallet address for the Market and for the AMM.

## Messages

### DeployTokenMarket

Message used to deploy a Market contract without AMM functionality.

Parameters:

-   `queryId`: Unique identifier for the deployment request (uint64)
-   `id`: Market identifier (uint32)
-   `owner`: Owner address of the market
-   `coin`: Address of the coin contract
-   `jettonWallet`: Address of the jetton wallet
-   `underlyingAssetName`: Name of the underlying asset
-   `duration`: Duration of the market in seconds (uint32)
-   `collection_content`: Collection content cell
-   `operatorFee`: Fee charged by the operator (in coins)
-   `serviceFee`: Service fee (in coins)
-   `oracle`: Oracle contract address
-   `feedIdAsset`: Asset feed identifier (uint256)
-   `feedIdToken`: Token feed identifier (uint256)
-   `operatorFeeAddress`: Address to receive operator fees
-   `originalGasTo`: Address to receive remaining gas

### MarketDeployedEvent

Event emitted when a Market contract is deployed without AMM.
Contains the same fields as DeployTokenMarket except `originalGasTo`, and includes:

-   `marketAddress`: Address of the deployed Market contract

### DeployTokenMarketWithAmm

Message used to deploy a Market contract with AMM functionality.
Contains the same fields as DeployTokenMarket plus:

-   `jettonWalletAmm`: Address of the AMM jetton wallet

### MarketDeployedEventWithAmm

Event emitted when a Market contract is deployed with AMM.
Contains the same fields as MarketDeployedEvent plus:

-   `amm`: Address of the deployed AMM contract
-   `jettonWalletAmm`: Address of the AMM jetton wallet

### DeployTonMarket

Message used to deploy a TON Market contract without AMM functionality.

Parameters:

-   `queryId`: Unique identifier for the deployment request (uint64)
-   `id`: Market identifier (uint32)
-   `owner`: Owner address of the market
-   `underlyingAssetName`: Name of the underlying asset
-   `duration`: Duration of the market in seconds (uint32)
-   `collection_content`: Collection content cell
-   `operatorFee`: Fee charged by the operator (in coins)
-   `serviceFee`: Service fee (in coins)
-   `oracle`: Oracle contract address
-   `feedIdAsset`: Asset feed identifier (uint256)
-   `feedIdToken`: Token feed identifier (uint256)
-   `operatorFeeAddress`: Address to receive operator fees
-   `originalGasTo`: Address to receive remaining gas

### MarketTonDeployedEvent

Event emitted when a TON Market contract is deployed without AMM.
Contains the same fields as DeployTonMarket except `originalGasTo`, and includes:

-   `marketAddress`: Address of the deployed Market contract

### DeployTonMarketWithAmm

Message used to deploy a TON Market contract with AMM functionality.
Contains the same fields as DeployTonMarket.

### MarketTonDeployedEventWithAmm

Event emitted when a TON Market contract is deployed with AMM.
Contains the same fields as MarketTonDeployedEvent plus:

-   `amm`: Address of the deployed AMM contract

Example of usage to deploy a Market contract without AMM:

```typescript
// Import necessary modules and functions
const jettonMasterAddress = Address.parse('EQAEjTwIDPZDLkPMbzUB5Pdu3BIbKYVdzgSp9wG3VHJL-rWw');
const oracleAddress = Address.parse('EQD1HG-Y_20MGKGZc_fi-hB_9iIGLJvNf4JVZGXTWG93sRmI');
const ammAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ'); // zero address
const feedAssetId = 4543560n; // ETH
const feedTokenId = 1431520340n; // USDT
const id = 1n;
const coin = jettonMasterAddress;
const serviceFee = toNano('0.01'); // 1%
const operatorFee = toNano('0.01'); // 1%
const content = Cell.EMPTY;
const duration = 60n; // 2 minutes
const underlyingAssetName = 'ETH';
const operatorFeeAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ');

export async function run(provider: NetworkProvider) {
    // Get the factory address from the network data
    const factoryAddress = data[provider.network()].factory;
    // Get the address of the sender (owner)
    const owner = provider.sender().address!;

    // Open the factory contract using the factory address
    const factory = provider.open(await Factory.fromAddress(Address.parse(factoryAddress)));

    // Initialize the market contract with the provided parameters for calculation of the jetton wallet address
    const market = provider.open(
        await Market.fromInit(
            id,
            owner,
            coin,
            ammAddress,
            factory.address,
            underlyingAssetName,
            duration,
            content,
            operatorFee,
            serviceFee,
            oracleAddress,
            feedAssetId,
            feedTokenId,
            operatorFeeAddress,
        ),
    );

    console.log('market', market.address);

    // Calculate the default jetton wallet address for the market
    const jettonDefaultWalletAddressMarket = await calculateJettonDefaultWalletAddress(
        jettonMasterAddress,
        market.address,
    );

    // Send the DeployTokenMarket message to the factory contract
    await factory.send(
        provider.sender(),
        {
            value: toNano('0.25'),
        },
        {
            $$type: 'DeployTokenMarket',
            queryId: 0n,
            id,
            owner,
            coin,
            jettonWallet: jettonDefaultWalletAddressMarket,
            underlyingAssetName,
            duration,
            collection_content: content,
            oracle: oracleAddress,
            feedIdAsset: feedAssetId,
            feedIdToken: feedTokenId,
            operatorFee,
            serviceFee,
            operatorFeeAddress,
            originalGasTo: owner,
        },
    );
}
```

Example of usage to deploy a Market contract with AMM:

```typescript
const jettonMasterAddress = Address.parse('EQAEjTwIDPZDLkPMbzUB5Pdu3BIbKYVdzgSp9wG3VHJL-rWw');
const oracleAddress = Address.parse('EQD1HG-Y_20MGKGZc_fi-hB_9iIGLJvNf4JVZGXTWG93sRmI');
const feedAssetId = 4543560n; // ETH
const feedTokenId = 1431520340n; // USDT
const id = 2n;
const coin = jettonMasterAddress;
const serviceFee = toNano('0.01'); // 1%
const operatorFee = toNano('0.01'); // 1%
const content = Cell.EMPTY;
const duration = 60n; // 1 minute
const underlyingAssetName = 'ETH';
const operatorFeeAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ');

export async function run(provider: NetworkProvider) {
    const factoryAddress = data[provider.network()].factory;
    const owner = provider.sender().address!;

    const factory = provider.open(await Factory.fromAddress(Address.parse(factoryAddress)));
    const amm = await Amm.fromInit(id, Address.parse(factoryAddress), owner);
    console.log('amm', amm.address);
    const jettonDefaultWalletAddressAmm = await calculateJettonDefaultWalletAddress(jettonMasterAddress, amm.address);
    const market = provider.open(
        await Market.fromInit(
            id,
            owner,
            coin,
            amm.address,
            factory.address,
            underlyingAssetName,
            duration,
            content,
            operatorFee,
            serviceFee,
            oracleAddress,
            feedAssetId,
            feedTokenId,
            operatorFeeAddress,
        ),
    );
    console.log('market', market.address);
    const jettonDefaultWalletAddressMarket = await calculateJettonDefaultWalletAddress(
        market.address,
        jettonMasterAddress,
    );

    await factory.send(
        provider.sender(),
        {
            value: toNano('0.45'),
        },
        {
            $$type: 'DeployTokenMarketWithAmm',
            queryId: 0n,
            id,
            owner,
            coin,
            jettonWallet: jettonDefaultWalletAddressMarket,
            jettonWalletAmm: jettonDefaultWalletAddressAmm,
            underlyingAssetName,
            duration,
            collection_content: content,
            oracle: oracleAddress,
            feedIdAsset: feedAssetId,
            feedIdToken: feedTokenId,
            operatorFee,
            serviceFee,
            operatorFeeAddress,
            originalGasTo: owner,
        },
    );
}
```

Example of usage to deploy a TON Market contract with AMM:

```typescript
const jettonMasterAddress = Address.parse('EQAEjTwIDPZDLkPMbzUB5Pdu3BIbKYVdzgSp9wG3VHJL-rWw');
const oracleAddress = Address.parse('EQD1HG-Y_20MGKGZc_fi-hB_9iIGLJvNf4JVZGXTWG93sRmI');
const ammAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ'); //zero address
const feedAssetId = 4543560n; // ETH
const feedTokenId = 1431520340n; // USDT
const id = 1n;
const coin = jettonMasterAddress;
const serviceFee = toNano('0.01'); // 1%
const operatorFee = toNano('0.01'); // 1%
const content = Cell.EMPTY;
const duration = 60n; // 1 minutes
const underlyingAssetName = 'ETH';
const operatorFeeAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ');

export async function run(provider: NetworkProvider) {
    const factoryAddress = data[provider.network()].factory;
    const owner = provider.sender().address!;

    const factory = provider.open(await Factory.fromAddress(Address.parse(factoryAddress)));

    const market = provider.open(
        await MarketTon.fromInit(
            id,
            owner,
            ammAddress,
            factory.address,
            underlyingAssetName,
            duration,
            content,
            operatorFee,
            serviceFee,
            oracleAddress,
            feedAssetId,
            feedTokenId,
            operatorFeeAddress,
        ),
    );

    await factory.send(
        provider.sender(),
        {
            value: toNano('0.45'),
        },
        {
            $$type: 'DeployTonMarketWithAmm',
            queryId: 0n,
            id,
            owner,
            underlyingAssetName,
            duration,
            collection_content: content,
            oracle: oracleAddress,
            feedIdAsset: feedAssetId,
            feedIdToken: feedTokenId,
            operatorFee,
            serviceFee,
            operatorFeeAddress,
            originalGasTo: owner,
        },
    );

    await provider.waitForDeploy(market.address);

    console.log('ID', await market.getId());
}
```

Example of usage to deploy a TON Market contract without AMM:

```typescript
const jettonMasterAddress = Address.parse('EQAEjTwIDPZDLkPMbzUB5Pdu3BIbKYVdzgSp9wG3VHJL-rWw');
const oracleAddress = Address.parse('EQD1HG-Y_20MGKGZc_fi-hB_9iIGLJvNf4JVZGXTWG93sRmI');
const ammAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ'); //zero address
const feedAssetId = 4543560n; // ETH
const feedTokenId = 1431520340n; // USDT
const id = 1n;
const coin = jettonMasterAddress;
const serviceFee = toNano('0.01'); // 1%
const operatorFee = toNano('0.01'); // 1%
const content = Cell.EMPTY;
const duration = 60n; // 1 minutes
const underlyingAssetName = 'ETH';
const operatorFeeAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ');

export async function run(provider: NetworkProvider) {
    const factoryAddress = data[provider.network()].factory;
    const owner = provider.sender().address!;

    const factory = provider.open(await Factory.fromAddress(Address.parse(factoryAddress)));

    const market = provider.open(
        await MarketTon.fromInit(
            id,
            owner,
            ammAddress,
            factory.address,
            underlyingAssetName,
            duration,
            content,
            operatorFee,
            serviceFee,
            oracleAddress,
            feedAssetId,
            feedTokenId,
            operatorFeeAddress,
        ),
    );

    await factory.send(
        provider.sender(),
        {
            value: toNano('0.35'),
        },
        {
            $$type: 'DeployTonMarket',
            queryId: 0n,
            id,
            owner,
            underlyingAssetName,
            duration,
            collection_content: content,
            oracle: oracleAddress,
            feedIdAsset: feedAssetId,
            feedIdToken: feedTokenId,
            operatorFee,
            serviceFee,
            operatorFeeAddress,
            originalGasTo: owner,
        },
    );

    await provider.waitForDeploy(market.address);

    console.log('ID', await market.getId());
}
```