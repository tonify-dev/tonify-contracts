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

-   Factory: EQBrUTgm5V6LAu3_phcQxdcbJbh7XYwU8SvMVronmovlm_x6
-   Market: EQAJgiFz8almoi7-4kes_XZrsBbsn1lw9Mlorob7OmO4FcwN  (asset ETH, token USDT)
-   Market with Amm: EQDwe0mfe7VUlNigbDU9Y2ZUO2JIMUZJ2wgt7GnOqbL-gUg4 (asset ETH, token USDT)
-   Amm: EQAu7zE6FXmvVwu8MPJq4GV0C-ykj8tPWlQfrLrjH858urLN (asset ETH, token USDT)
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
