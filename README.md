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

-   Factory: EQDs3GAEZOCLVE45ZkwBG_PbqpZne2qBJzEqN4LhmQOHNSxd
-   Market: kQBjGdvmWcMgIyZMVau2pbBqgR3Pjkb5sbxUzeH2bb5SZlBv
-   Market with Amm: kQA0APUqKE9Hd15SV0_nuHlUtGrj17SAsaDTSKOnBmK0ypT5
-   Amm: kQAxgJCvtxM7weVG-pqd1Q7Dmh9eNQucBaG-STq-5XXYzkaE
