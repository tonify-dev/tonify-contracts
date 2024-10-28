# go-derivatives-ton

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`

# Addresses

-   Factory: EQAgmMW8qb7MEko_tf5VueZSaoQm6yqTjAMCVBRDYQ7r0_Zv
-   Market: EQBt3AXW0hodMq-EbI9wQ085qbXBETdb1UXz12W09pNOYwB6  (asset ETH, token USDT)
-   Market with Amm: EQCWY3EFvhv0NFpKY26iQBmLJ6SXF3sbdj4EkGyhgS6Icwww (asset ETH, token USDT)
-   Amm: EQBRABVvQJ15DNZ3QokMeoeUSlqQycQHPm0mOGz3g-PPyTnE (asset ETH, token USDT)
-   MyJetton: EQAEjTwIDPZDLkPMbzUB5Pdu3BIbKYVdzgSp9wG3VHJL-rWw (Test USDT)



I use Blueprint, so I provide TypeScript examples for it. For frontend and backend, you will have different wallet interactions and you'll need to send transactions in your own way, but the internal message(body) should be formed as shown in my examples.

If you don't work with ton.  Then you need understand how to interact with Jetton and NFT.
[Interaction with Jetton](./docs/InteractionWithJetton.md)
[Interaction with NFT](./docs/InteractionWithNFT.md)


# Architecture

System have 4 contracts:

-   Factory - deploy new market
-   Market - main contract, that manage deals
-   Amm - take deal with user's deal automatically
-   Deal - have data about deal

[Market](./docs/Market.md)
[Deal](./docs/Deal.md)
[Factory](./docs/Factory.md)
[Amm](./docs/Amm.md)
