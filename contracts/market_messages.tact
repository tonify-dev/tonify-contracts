const OP_CODE_CREATE_DEAL: Int = 0xdfd74530; // sha256("CreateDeal").slice(0, 8)
const OP_CODE_TAKE_DEAL: Int = 0x38f0b8f5; // sha256("TakeDeal").slice(0, 8)    

message(0x38f0b8f5) TakeDeal {
    dealId: Int as uint32;
    oracleData: Cell;
}

struct TakeDealData {
    dealId: Int as uint32;
    oracleData: Cell;
}

message(0xdfd74530) CreateDeal {
    makerPosition: Bool;
    rate: Int as uint128;
    percent: Int as uint128;
    expiration: Int as uint32;
    slippage: Int as uint128;
    oracleData: Cell?;
}

message InnerDeployMarket {
    queryId: Int as uint64;
    jettonWallet: Address;
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

struct CreateDealData {
    makerPosition: Bool;
    rate: Int as uint128;
    percent: Int as uint128;
    expiration: Int as uint32;
    slippage: Int as uint128;
    oracleData: Cell?;
}

message CancelDeal {
    queryId: Int as uint64;
    dealId: Int as uint32;
}

message ProcessDeal {
    queryId: Int as uint64;
    dealId: Int as uint32;
    oracleData: Cell;
}

struct DealData {
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
    isSeller: Bool;
    status: Int as uint8;
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
    feedId: Int as uint32;
    price: Int as uint128;
    timestamp: Int as uint32;
}


struct ContextProcessDealForDealReceived {
    from: Address;
    feedId: Int as uint32;
    price: Int as uint128;
    timestamp: Int as uint32;
}

struct ContextTakeDealForPriceReceived {
    from: Address;
    amount: Int as coins;
    dealId: Int as uint32;
}

struct ContextProcessDealForPriceReceived {
    from: Address;
    dealId: Int as uint32;
}

struct ContextForGetOwner {
    amount: Int as coins;
}

