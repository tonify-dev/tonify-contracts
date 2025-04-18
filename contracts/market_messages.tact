const OP_CODE_CREATE_DEAL: Int = 0xdfd74530; // sha256("CreateDeal").slice(0, 8)
const OP_CODE_TAKE_DEAL: Int = 0x38f0b8f5; // sha256("TakeDeal").slice(0, 8)
const OP_CODE_TAKE_DEAL_WITH_ORIGINAL_GAS_TO: Int = 0x78d830b2; // sha256("TakeDealWithOriginalGasTo").slice(0, 8)

message(0x38f0b8f5) TakeDeal {
    dealId: Int as uint32;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}
message TakeDealTon {
    queryId: Int as uint64;
    deal: TakeDealData;
}
struct TakeDealData {
    dealId: Int as uint32;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}
message(0x78d830b2) TakeDealWithOriginalGasTo {
    data: Cell;
}
message TakeDealWithOriginalGasToTon {
    queryId: Int as uint64;
    amount: Int as coins;
    deal: TakeDealDataWithOriginalGasTo;
}
struct TakeDealDataWithOriginalGasTo {  
    dealId: Int as uint32;
    originalGasTo: Address;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}
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
message InnerDeployMarket {
    queryId: Int as uint64;
    jettonWallet: Address;
    originalGasTo: Address;
}
message InnerDeployMarketTon {
    queryId: Int as uint64;
    originalGasTo: Address;
}
message WithdrawOperatorFee {
    queryId: Int as uint64;
    amount: Int as coins;
    to: Address;
}
message WithdrawServiceFee {
    queryId: Int as uint64;
    amount: Int as coins;
    to: Address;
}
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
message CancelDeal {
    queryId: Int as uint64;
    dealId: Int as uint32;
}
message ProcessDeal {
    queryId: Int as uint64;
    dealId: Int as uint32;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}
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

// events
message CancelEvent {
    queryId: Int as uint64;
    dealId: Int as uint32;
    maker: Address;
    collateralAmountMaker: Int as coins;
}
message DealAcceptedEvent {
    queryId: Int as uint64;
    dealId: Int as uint32;
    maker: Address;
    collateralAmountMaker: Int as coins;
}
message DealCreatedEvent {
    queryId: Int as uint64;
    dealId: Int as uint32;
    maker: Address;
    collateralAmountMaker: Int as coins;
}
message DealCompletedEvent {
    queryId: Int as uint64;
    dealId: Int as uint32;
    maker: Address;
    collateralAmountMaker: Int as coins;
}
message DealExpiredEvent {
    queryId: Int as uint64;
    dealId: Int as uint32;
    maker: Address;
    collateralAmountMaker: Int as coins;
}

// context

struct ContextCancelDealForDealReceived {
    from: Address;
}
struct ContextTakeDealForDealReceived {
    from: Address;
    amount: Int as coins;
    originalGasTo: Address;
    feedId: Int as uint32;
    price: Int as uint128;
    timestamp: Int as uint32;
    feedId2: Int as uint32;
    price2: Int as uint128;
    timestamp2: Int as uint32;
}

struct ContextProcessDealForDealReceived {
    from: Address;
    feedId: Int as uint32;
    price: Int as uint128;
    timestamp: Int as uint32;
    feedId2: Int as uint32;
    price2: Int as uint128;
    timestamp2: Int as uint32;
}
struct ContextTakeDealForPriceReceived {
    from: Address;
    amount: Int as coins;
    dealId: Int as uint32;
    originalGasTo: Address;
}
struct ContextProcessDealForPriceReceived {
    from: Address;
    dealId: Int as uint32;
}
struct ContextForGetOwner {
    amount: Int as coins;
    originalGasTo: Address;
}

message TakeDealAmm {
    queryId: Int as uint64;
    dealId: Int as uint32;
    amount: Int as coins;
    originalGasTo: Address;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}

message UpdateFees {
    queryId: Int as uint64;
    operatorFee: Int as uint32;
    serviceFee: Int as uint32;
}

message FeesUpdatedEvent {
    queryId: Int as uint64;
    operatorFee: Int as uint32;
    serviceFee: Int as uint32;
}