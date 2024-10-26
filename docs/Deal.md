
## Deal Contract Documentation

Deal contract is used to store deal data.
It store this data:

```typescript   
struct DealData {
    status: Int as uint8;
    isSeller: Bool;
    rate: Int as coins;
    rateMaker: Int as coins;
    percent: Int as coins;
    slippageMaker: Int as coins;
    collateralAmountMaker: Int as coins;
    dateOrderCreation: Int as uint32;
    dateOrderExpiration: Int as uint32;
    dateStart: Int as uint32;
    dateStop: Int as uint32;
    buyerTokenId: Int as uint32;
    sellerTokenId: Int as uint32;
    maker: Address;
}
```
- `status` - deal status:
  - `DEAL_STATUS_CREATED = 1` - Deal has been created but not yet accepted
  - `DEAL_STATUS_ACCEPTED = 2` - Deal has been accepted by other party
- `isSeller` - is seller a maker
- `rate` - deal rate
- `rateMaker` - maker rate
- `percent` - percent
- `slippageMaker` - slippage
- `collateralAmountMaker` - collateral amount  
- `dateOrderCreation` - date order creation
- `dateOrderExpiration` - date order expiration
- `dateStart` - date start
- `dateStop` - date stop
- `buyerTokenId` - buyer token id
- `sellerTokenId` - seller token id
- `maker` - maker address

### Example get deal data

Below is a complete example demonstrating how to retrieve and log deal data given a market address and a deal ID.


```typescript
import { Deal, loadDealData } from 'your-contract-wrappers'; // object lie in abi and account 

async function getDealData(marketAddress: string, dealId: number) {
    try {
        // Initialize the Deal contract instance
        const deal = await Deal.fromInit(dealId, marketAddress);

        // Fetch the raw deal data
        const dealDataSlice = (await deal.getData())!.asSlice();

        // Parse the deal data
        const dealData = loadDealData(dealDataSlice);

        // Access and display deal information
        console.log('Deal ID:', dealData.dealId);
        console.log('Oracle Asset Data:', dealData.oracleAssetData);
        console.log('Oracle Token Data:', dealData.oracleTokenData);

        return dealData;
    } catch (error) {
        console.error('Error retrieving deal data:', error);
    }
}

// Example invocation
const marketAddress = 'kQCoRXQUG4oHis-65lZ0R0M_O_DcKw6TysCfkbDpddRRh_gt';
const dealId = 12345;

getDealData(marketAddress, dealId);
```
