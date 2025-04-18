import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Market$Data = {
    $$type: 'Market$Data';
    id: bigint;
    owner: Address;
    amm: Address;
    jettonWallet: Address;
    underlyingAssetName: string;
    duration: bigint;
    operatorFee: bigint;
    serviceFee: bigint;
    factory: Address;
    stopped: boolean;
    countDeal: bigint;
    next_item_index: bigint;
    collection_content: Cell;
    mapQueriesToContext: Dictionary<bigint, Cell>;
    oracle: Address;
    feedIdAsset: bigint;
    feedIdToken: bigint;
    operatorFeeSum: bigint;
    serviceFeeSum: bigint;
    operatorFeeAddress: Address;
}

export function storeMarket$Data(src: Market$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.amm);
        b_0.storeAddress(src.jettonWallet);
        b_0.storeStringRefTail(src.underlyingAssetName);
        b_0.storeUint(src.duration, 32);
        b_0.storeUint(src.operatorFee, 32);
        b_0.storeUint(src.serviceFee, 32);
        let b_1 = new Builder();
        b_1.storeAddress(src.factory);
        b_1.storeBit(src.stopped);
        b_1.storeUint(src.countDeal, 32);
        b_1.storeUint(src.next_item_index, 32);
        b_1.storeRef(src.collection_content);
        b_1.storeDict(src.mapQueriesToContext, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
        b_1.storeAddress(src.oracle);
        b_1.storeUint(src.feedIdAsset, 256);
        let b_2 = new Builder();
        b_2.storeUint(src.feedIdToken, 256);
        b_2.storeCoins(src.operatorFeeSum);
        b_2.storeCoins(src.serviceFeeSum);
        b_2.storeAddress(src.operatorFeeAddress);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarket$Data(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(32);
    let _owner = sc_0.loadAddress();
    let _amm = sc_0.loadAddress();
    let _jettonWallet = sc_0.loadAddress();
    let _underlyingAssetName = sc_0.loadStringRefTail();
    let _duration = sc_0.loadUintBig(32);
    let _operatorFee = sc_0.loadUintBig(32);
    let _serviceFee = sc_0.loadUintBig(32);
    let sc_1 = sc_0.loadRef().beginParse();
    let _factory = sc_1.loadAddress();
    let _stopped = sc_1.loadBit();
    let _countDeal = sc_1.loadUintBig(32);
    let _next_item_index = sc_1.loadUintBig(32);
    let _collection_content = sc_1.loadRef();
    let _mapQueriesToContext = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), sc_1);
    let _oracle = sc_1.loadAddress();
    let _feedIdAsset = sc_1.loadUintBig(256);
    let sc_2 = sc_1.loadRef().beginParse();
    let _feedIdToken = sc_2.loadUintBig(256);
    let _operatorFeeSum = sc_2.loadCoins();
    let _serviceFeeSum = sc_2.loadCoins();
    let _operatorFeeAddress = sc_2.loadAddress();
    return { $$type: 'Market$Data' as const, id: _id, owner: _owner, amm: _amm, jettonWallet: _jettonWallet, underlyingAssetName: _underlyingAssetName, duration: _duration, operatorFee: _operatorFee, serviceFee: _serviceFee, factory: _factory, stopped: _stopped, countDeal: _countDeal, next_item_index: _next_item_index, collection_content: _collection_content, mapQueriesToContext: _mapQueriesToContext, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeSum: _operatorFeeSum, serviceFeeSum: _serviceFeeSum, operatorFeeAddress: _operatorFeeAddress };
}

function loadTupleMarket$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _amm = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _factory = source.readAddress();
    let _stopped = source.readBoolean();
    let _countDeal = source.readBigNumber();
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _mapQueriesToContext = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    source = source.readTuple();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeSum = source.readBigNumber();
    let _serviceFeeSum = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    return { $$type: 'Market$Data' as const, id: _id, owner: _owner, amm: _amm, jettonWallet: _jettonWallet, underlyingAssetName: _underlyingAssetName, duration: _duration, operatorFee: _operatorFee, serviceFee: _serviceFee, factory: _factory, stopped: _stopped, countDeal: _countDeal, next_item_index: _next_item_index, collection_content: _collection_content, mapQueriesToContext: _mapQueriesToContext, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeSum: _operatorFeeSum, serviceFeeSum: _serviceFeeSum, operatorFeeAddress: _operatorFeeAddress };
}

function loadGetterTupleMarket$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _amm = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _factory = source.readAddress();
    let _stopped = source.readBoolean();
    let _countDeal = source.readBigNumber();
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _mapQueriesToContext = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeSum = source.readBigNumber();
    let _serviceFeeSum = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    return { $$type: 'Market$Data' as const, id: _id, owner: _owner, amm: _amm, jettonWallet: _jettonWallet, underlyingAssetName: _underlyingAssetName, duration: _duration, operatorFee: _operatorFee, serviceFee: _serviceFee, factory: _factory, stopped: _stopped, countDeal: _countDeal, next_item_index: _next_item_index, collection_content: _collection_content, mapQueriesToContext: _mapQueriesToContext, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeSum: _operatorFeeSum, serviceFeeSum: _serviceFeeSum, operatorFeeAddress: _operatorFeeAddress };
}

function storeTupleMarket$Data(source: Market$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.amm);
    builder.writeAddress(source.jettonWallet);
    builder.writeString(source.underlyingAssetName);
    builder.writeNumber(source.duration);
    builder.writeNumber(source.operatorFee);
    builder.writeNumber(source.serviceFee);
    builder.writeAddress(source.factory);
    builder.writeBoolean(source.stopped);
    builder.writeNumber(source.countDeal);
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.collection_content);
    builder.writeCell(source.mapQueriesToContext.size > 0 ? beginCell().storeDictDirect(source.mapQueriesToContext, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell()).endCell() : null);
    builder.writeAddress(source.oracle);
    builder.writeNumber(source.feedIdAsset);
    builder.writeNumber(source.feedIdToken);
    builder.writeNumber(source.operatorFeeSum);
    builder.writeNumber(source.serviceFeeSum);
    builder.writeAddress(source.operatorFeeAddress);
    return builder.build();
}

function dictValueParserMarket$Data(): DictionaryValue<Market$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarket$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMarket$Data(src.loadRef().beginParse());
        }
    }
}

export type MarketTon$Data = {
    $$type: 'MarketTon$Data';
    id: bigint;
    owner: Address;
    amm: Address;
    underlyingAssetName: string;
    duration: bigint;
    operatorFee: bigint;
    serviceFee: bigint;
    factory: Address;
    stopped: boolean;
    countDeal: bigint;
    next_item_index: bigint;
    collection_content: Cell;
    mapQueriesToContext: Dictionary<bigint, Cell>;
    oracle: Address;
    feedIdAsset: bigint;
    feedIdToken: bigint;
    operatorFeeSum: bigint;
    serviceFeeSum: bigint;
    tonDepositBalance: bigint;
    operatorFeeAddress: Address;
}

export function storeMarketTon$Data(src: MarketTon$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.amm);
        b_0.storeStringRefTail(src.underlyingAssetName);
        b_0.storeUint(src.duration, 32);
        b_0.storeUint(src.operatorFee, 32);
        b_0.storeUint(src.serviceFee, 32);
        b_0.storeAddress(src.factory);
        b_0.storeBit(src.stopped);
        b_0.storeUint(src.countDeal, 32);
        b_0.storeUint(src.next_item_index, 32);
        b_0.storeRef(src.collection_content);
        let b_1 = new Builder();
        b_1.storeDict(src.mapQueriesToContext, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
        b_1.storeAddress(src.oracle);
        b_1.storeUint(src.feedIdAsset, 256);
        b_1.storeUint(src.feedIdToken, 256);
        b_1.storeCoins(src.operatorFeeSum);
        let b_2 = new Builder();
        b_2.storeCoins(src.serviceFeeSum);
        b_2.storeCoins(src.tonDepositBalance);
        b_2.storeAddress(src.operatorFeeAddress);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarketTon$Data(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(32);
    let _owner = sc_0.loadAddress();
    let _amm = sc_0.loadAddress();
    let _underlyingAssetName = sc_0.loadStringRefTail();
    let _duration = sc_0.loadUintBig(32);
    let _operatorFee = sc_0.loadUintBig(32);
    let _serviceFee = sc_0.loadUintBig(32);
    let _factory = sc_0.loadAddress();
    let _stopped = sc_0.loadBit();
    let _countDeal = sc_0.loadUintBig(32);
    let _next_item_index = sc_0.loadUintBig(32);
    let _collection_content = sc_0.loadRef();
    let sc_1 = sc_0.loadRef().beginParse();
    let _mapQueriesToContext = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), sc_1);
    let _oracle = sc_1.loadAddress();
    let _feedIdAsset = sc_1.loadUintBig(256);
    let _feedIdToken = sc_1.loadUintBig(256);
    let _operatorFeeSum = sc_1.loadCoins();
    let sc_2 = sc_1.loadRef().beginParse();
    let _serviceFeeSum = sc_2.loadCoins();
    let _tonDepositBalance = sc_2.loadCoins();
    let _operatorFeeAddress = sc_2.loadAddress();
    return { $$type: 'MarketTon$Data' as const, id: _id, owner: _owner, amm: _amm, underlyingAssetName: _underlyingAssetName, duration: _duration, operatorFee: _operatorFee, serviceFee: _serviceFee, factory: _factory, stopped: _stopped, countDeal: _countDeal, next_item_index: _next_item_index, collection_content: _collection_content, mapQueriesToContext: _mapQueriesToContext, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeSum: _operatorFeeSum, serviceFeeSum: _serviceFeeSum, tonDepositBalance: _tonDepositBalance, operatorFeeAddress: _operatorFeeAddress };
}

function loadTupleMarketTon$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _amm = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _factory = source.readAddress();
    let _stopped = source.readBoolean();
    let _countDeal = source.readBigNumber();
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _mapQueriesToContext = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    let _oracle = source.readAddress();
    source = source.readTuple();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeSum = source.readBigNumber();
    let _serviceFeeSum = source.readBigNumber();
    let _tonDepositBalance = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    return { $$type: 'MarketTon$Data' as const, id: _id, owner: _owner, amm: _amm, underlyingAssetName: _underlyingAssetName, duration: _duration, operatorFee: _operatorFee, serviceFee: _serviceFee, factory: _factory, stopped: _stopped, countDeal: _countDeal, next_item_index: _next_item_index, collection_content: _collection_content, mapQueriesToContext: _mapQueriesToContext, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeSum: _operatorFeeSum, serviceFeeSum: _serviceFeeSum, tonDepositBalance: _tonDepositBalance, operatorFeeAddress: _operatorFeeAddress };
}

function loadGetterTupleMarketTon$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _amm = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _factory = source.readAddress();
    let _stopped = source.readBoolean();
    let _countDeal = source.readBigNumber();
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _mapQueriesToContext = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeSum = source.readBigNumber();
    let _serviceFeeSum = source.readBigNumber();
    let _tonDepositBalance = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    return { $$type: 'MarketTon$Data' as const, id: _id, owner: _owner, amm: _amm, underlyingAssetName: _underlyingAssetName, duration: _duration, operatorFee: _operatorFee, serviceFee: _serviceFee, factory: _factory, stopped: _stopped, countDeal: _countDeal, next_item_index: _next_item_index, collection_content: _collection_content, mapQueriesToContext: _mapQueriesToContext, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeSum: _operatorFeeSum, serviceFeeSum: _serviceFeeSum, tonDepositBalance: _tonDepositBalance, operatorFeeAddress: _operatorFeeAddress };
}

function storeTupleMarketTon$Data(source: MarketTon$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.amm);
    builder.writeString(source.underlyingAssetName);
    builder.writeNumber(source.duration);
    builder.writeNumber(source.operatorFee);
    builder.writeNumber(source.serviceFee);
    builder.writeAddress(source.factory);
    builder.writeBoolean(source.stopped);
    builder.writeNumber(source.countDeal);
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.collection_content);
    builder.writeCell(source.mapQueriesToContext.size > 0 ? beginCell().storeDictDirect(source.mapQueriesToContext, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell()).endCell() : null);
    builder.writeAddress(source.oracle);
    builder.writeNumber(source.feedIdAsset);
    builder.writeNumber(source.feedIdToken);
    builder.writeNumber(source.operatorFeeSum);
    builder.writeNumber(source.serviceFeeSum);
    builder.writeNumber(source.tonDepositBalance);
    builder.writeAddress(source.operatorFeeAddress);
    return builder.build();
}

function dictValueParserMarketTon$Data(): DictionaryValue<MarketTon$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarketTon$Data(src)).endCell());
        },
        parse: (src) => {
            return loadMarketTon$Data(src.loadRef().beginParse());
        }
    }
}

export type InnerDeployAmm = {
    $$type: 'InnerDeployAmm';
    queryId: bigint;
    jettonWallet: Address;
    originalGasTo: Address;
    market: Address;
}

export function storeInnerDeployAmm(src: InnerDeployAmm) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078977111, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.jettonWallet);
        b_0.storeAddress(src.originalGasTo);
        b_0.storeAddress(src.market);
    };
}

export function loadInnerDeployAmm(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078977111) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _jettonWallet = sc_0.loadAddress();
    let _originalGasTo = sc_0.loadAddress();
    let _market = sc_0.loadAddress();
    return { $$type: 'InnerDeployAmm' as const, queryId: _queryId, jettonWallet: _jettonWallet, originalGasTo: _originalGasTo, market: _market };
}

function loadTupleInnerDeployAmm(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _originalGasTo = source.readAddress();
    let _market = source.readAddress();
    return { $$type: 'InnerDeployAmm' as const, queryId: _queryId, jettonWallet: _jettonWallet, originalGasTo: _originalGasTo, market: _market };
}

function loadGetterTupleInnerDeployAmm(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _originalGasTo = source.readAddress();
    let _market = source.readAddress();
    return { $$type: 'InnerDeployAmm' as const, queryId: _queryId, jettonWallet: _jettonWallet, originalGasTo: _originalGasTo, market: _market };
}

function storeTupleInnerDeployAmm(source: InnerDeployAmm) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.originalGasTo);
    builder.writeAddress(source.market);
    return builder.build();
}

function dictValueParserInnerDeployAmm(): DictionaryValue<InnerDeployAmm> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInnerDeployAmm(src)).endCell());
        },
        parse: (src) => {
            return loadInnerDeployAmm(src.loadRef().beginParse());
        }
    }
}

export type WithdrawToken = {
    $$type: 'WithdrawToken';
    queryId: bigint;
    amount: bigint;
    originalGasTo: Address;
}

export function storeWithdrawToken(src: WithdrawToken) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1740151130, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.originalGasTo);
    };
}

export function loadWithdrawToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1740151130) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _originalGasTo = sc_0.loadAddress();
    return { $$type: 'WithdrawToken' as const, queryId: _queryId, amount: _amount, originalGasTo: _originalGasTo };
}

function loadTupleWithdrawToken(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    return { $$type: 'WithdrawToken' as const, queryId: _queryId, amount: _amount, originalGasTo: _originalGasTo };
}

function loadGetterTupleWithdrawToken(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    return { $$type: 'WithdrawToken' as const, queryId: _queryId, amount: _amount, originalGasTo: _originalGasTo };
}

function storeTupleWithdrawToken(source: WithdrawToken) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.originalGasTo);
    return builder.build();
}

function dictValueParserWithdrawToken(): DictionaryValue<WithdrawToken> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawToken(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawToken(src.loadRef().beginParse());
        }
    }
}

export type Amm$Data = {
    $$type: 'Amm$Data';
    id: bigint;
    factory: Address;
    owner: Address;
    market: Address;
    jettonWallet: Address;
}

export function storeAmm$Data(src: Amm$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.factory);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.market);
        let b_1 = new Builder();
        b_1.storeAddress(src.jettonWallet);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAmm$Data(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(32);
    let _factory = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _market = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _jettonWallet = sc_1.loadAddress();
    return { $$type: 'Amm$Data' as const, id: _id, factory: _factory, owner: _owner, market: _market, jettonWallet: _jettonWallet };
}

function loadTupleAmm$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _factory = source.readAddress();
    let _owner = source.readAddress();
    let _market = source.readAddress();
    let _jettonWallet = source.readAddress();
    return { $$type: 'Amm$Data' as const, id: _id, factory: _factory, owner: _owner, market: _market, jettonWallet: _jettonWallet };
}

function loadGetterTupleAmm$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _factory = source.readAddress();
    let _owner = source.readAddress();
    let _market = source.readAddress();
    let _jettonWallet = source.readAddress();
    return { $$type: 'Amm$Data' as const, id: _id, factory: _factory, owner: _owner, market: _market, jettonWallet: _jettonWallet };
}

function storeTupleAmm$Data(source: Amm$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.factory);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.market);
    builder.writeAddress(source.jettonWallet);
    return builder.build();
}

function dictValueParserAmm$Data(): DictionaryValue<Amm$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAmm$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAmm$Data(src.loadRef().beginParse());
        }
    }
}

export type InnerDeployAmmTon = {
    $$type: 'InnerDeployAmmTon';
    queryId: bigint;
    originalGasTo: Address;
    market: Address;
}

export function storeInnerDeployAmmTon(src: InnerDeployAmmTon) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3704021403, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.originalGasTo);
        b_0.storeAddress(src.market);
    };
}

export function loadInnerDeployAmmTon(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3704021403) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _originalGasTo = sc_0.loadAddress();
    let _market = sc_0.loadAddress();
    return { $$type: 'InnerDeployAmmTon' as const, queryId: _queryId, originalGasTo: _originalGasTo, market: _market };
}

function loadTupleInnerDeployAmmTon(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    let _market = source.readAddress();
    return { $$type: 'InnerDeployAmmTon' as const, queryId: _queryId, originalGasTo: _originalGasTo, market: _market };
}

function loadGetterTupleInnerDeployAmmTon(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    let _market = source.readAddress();
    return { $$type: 'InnerDeployAmmTon' as const, queryId: _queryId, originalGasTo: _originalGasTo, market: _market };
}

function storeTupleInnerDeployAmmTon(source: InnerDeployAmmTon) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.originalGasTo);
    builder.writeAddress(source.market);
    return builder.build();
}

function dictValueParserInnerDeployAmmTon(): DictionaryValue<InnerDeployAmmTon> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInnerDeployAmmTon(src)).endCell());
        },
        parse: (src) => {
            return loadInnerDeployAmmTon(src.loadRef().beginParse());
        }
    }
}

export type WithdrawTon = {
    $$type: 'WithdrawTon';
    queryId: bigint;
    amount: bigint;
}

export function storeWithdrawTon(src: WithdrawTon) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(456029640, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdrawTon(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 456029640) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    return { $$type: 'WithdrawTon' as const, queryId: _queryId, amount: _amount };
}

function loadTupleWithdrawTon(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawTon' as const, queryId: _queryId, amount: _amount };
}

function loadGetterTupleWithdrawTon(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawTon' as const, queryId: _queryId, amount: _amount };
}

function storeTupleWithdrawTon(source: WithdrawTon) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdrawTon(): DictionaryValue<WithdrawTon> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawTon(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawTon(src.loadRef().beginParse());
        }
    }
}

export type AmmTon$Data = {
    $$type: 'AmmTon$Data';
    id: bigint;
    factory: Address;
    owner: Address;
    market: Address;
    deposited: bigint;
}

export function storeAmmTon$Data(src: AmmTon$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.factory);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.market);
        b_0.storeCoins(src.deposited);
    };
}

export function loadAmmTon$Data(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(32);
    let _factory = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _market = sc_0.loadAddress();
    let _deposited = sc_0.loadCoins();
    return { $$type: 'AmmTon$Data' as const, id: _id, factory: _factory, owner: _owner, market: _market, deposited: _deposited };
}

function loadTupleAmmTon$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _factory = source.readAddress();
    let _owner = source.readAddress();
    let _market = source.readAddress();
    let _deposited = source.readBigNumber();
    return { $$type: 'AmmTon$Data' as const, id: _id, factory: _factory, owner: _owner, market: _market, deposited: _deposited };
}

function loadGetterTupleAmmTon$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _factory = source.readAddress();
    let _owner = source.readAddress();
    let _market = source.readAddress();
    let _deposited = source.readBigNumber();
    return { $$type: 'AmmTon$Data' as const, id: _id, factory: _factory, owner: _owner, market: _market, deposited: _deposited };
}

function storeTupleAmmTon$Data(source: AmmTon$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.factory);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.market);
    builder.writeNumber(source.deposited);
    return builder.build();
}

function dictValueParserAmmTon$Data(): DictionaryValue<AmmTon$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAmmTon$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAmmTon$Data(src.loadRef().beginParse());
        }
    }
}

export type TakeDeal = {
    $$type: 'TakeDeal';
    dealId: bigint;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}

export function storeTakeDeal(src: TakeDeal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(955300085, 32);
        b_0.storeUint(src.dealId, 32);
        b_0.storeRef(src.oracleAssetData);
        b_0.storeRef(src.oracleTokenData);
    };
}

export function loadTakeDeal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 955300085) { throw Error('Invalid prefix'); }
    let _dealId = sc_0.loadUintBig(32);
    let _oracleAssetData = sc_0.loadRef();
    let _oracleTokenData = sc_0.loadRef();
    return { $$type: 'TakeDeal' as const, dealId: _dealId, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadTupleTakeDeal(source: TupleReader) {
    let _dealId = source.readBigNumber();
    let _oracleAssetData = source.readCell();
    let _oracleTokenData = source.readCell();
    return { $$type: 'TakeDeal' as const, dealId: _dealId, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadGetterTupleTakeDeal(source: TupleReader) {
    let _dealId = source.readBigNumber();
    let _oracleAssetData = source.readCell();
    let _oracleTokenData = source.readCell();
    return { $$type: 'TakeDeal' as const, dealId: _dealId, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function storeTupleTakeDeal(source: TakeDeal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.dealId);
    builder.writeCell(source.oracleAssetData);
    builder.writeCell(source.oracleTokenData);
    return builder.build();
}

function dictValueParserTakeDeal(): DictionaryValue<TakeDeal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeDeal(src)).endCell());
        },
        parse: (src) => {
            return loadTakeDeal(src.loadRef().beginParse());
        }
    }
}

export type TakeDealTon = {
    $$type: 'TakeDealTon';
    queryId: bigint;
    deal: TakeDealData;
}

export function storeTakeDealTon(src: TakeDealTon) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3886765728, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.store(storeTakeDealData(src.deal));
    };
}

export function loadTakeDealTon(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3886765728) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _deal = loadTakeDealData(sc_0);
    return { $$type: 'TakeDealTon' as const, queryId: _queryId, deal: _deal };
}

function loadTupleTakeDealTon(source: TupleReader) {
    let _queryId = source.readBigNumber();
    const _deal = loadTupleTakeDealData(source);
    return { $$type: 'TakeDealTon' as const, queryId: _queryId, deal: _deal };
}

function loadGetterTupleTakeDealTon(source: TupleReader) {
    let _queryId = source.readBigNumber();
    const _deal = loadGetterTupleTakeDealData(source);
    return { $$type: 'TakeDealTon' as const, queryId: _queryId, deal: _deal };
}

function storeTupleTakeDealTon(source: TakeDealTon) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeTuple(storeTupleTakeDealData(source.deal));
    return builder.build();
}

function dictValueParserTakeDealTon(): DictionaryValue<TakeDealTon> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeDealTon(src)).endCell());
        },
        parse: (src) => {
            return loadTakeDealTon(src.loadRef().beginParse());
        }
    }
}

export type TakeDealData = {
    $$type: 'TakeDealData';
    dealId: bigint;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}

export function storeTakeDealData(src: TakeDealData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.dealId, 32);
        b_0.storeRef(src.oracleAssetData);
        b_0.storeRef(src.oracleTokenData);
    };
}

export function loadTakeDealData(slice: Slice) {
    let sc_0 = slice;
    let _dealId = sc_0.loadUintBig(32);
    let _oracleAssetData = sc_0.loadRef();
    let _oracleTokenData = sc_0.loadRef();
    return { $$type: 'TakeDealData' as const, dealId: _dealId, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadTupleTakeDealData(source: TupleReader) {
    let _dealId = source.readBigNumber();
    let _oracleAssetData = source.readCell();
    let _oracleTokenData = source.readCell();
    return { $$type: 'TakeDealData' as const, dealId: _dealId, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadGetterTupleTakeDealData(source: TupleReader) {
    let _dealId = source.readBigNumber();
    let _oracleAssetData = source.readCell();
    let _oracleTokenData = source.readCell();
    return { $$type: 'TakeDealData' as const, dealId: _dealId, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function storeTupleTakeDealData(source: TakeDealData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.dealId);
    builder.writeCell(source.oracleAssetData);
    builder.writeCell(source.oracleTokenData);
    return builder.build();
}

function dictValueParserTakeDealData(): DictionaryValue<TakeDealData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeDealData(src)).endCell());
        },
        parse: (src) => {
            return loadTakeDealData(src.loadRef().beginParse());
        }
    }
}

export type TakeDealWithOriginalGasTo = {
    $$type: 'TakeDealWithOriginalGasTo';
    data: Cell;
}

export function storeTakeDealWithOriginalGasTo(src: TakeDealWithOriginalGasTo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2027434162, 32);
        b_0.storeRef(src.data);
    };
}

export function loadTakeDealWithOriginalGasTo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2027434162) { throw Error('Invalid prefix'); }
    let _data = sc_0.loadRef();
    return { $$type: 'TakeDealWithOriginalGasTo' as const, data: _data };
}

function loadTupleTakeDealWithOriginalGasTo(source: TupleReader) {
    let _data = source.readCell();
    return { $$type: 'TakeDealWithOriginalGasTo' as const, data: _data };
}

function loadGetterTupleTakeDealWithOriginalGasTo(source: TupleReader) {
    let _data = source.readCell();
    return { $$type: 'TakeDealWithOriginalGasTo' as const, data: _data };
}

function storeTupleTakeDealWithOriginalGasTo(source: TakeDealWithOriginalGasTo) {
    let builder = new TupleBuilder();
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserTakeDealWithOriginalGasTo(): DictionaryValue<TakeDealWithOriginalGasTo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeDealWithOriginalGasTo(src)).endCell());
        },
        parse: (src) => {
            return loadTakeDealWithOriginalGasTo(src.loadRef().beginParse());
        }
    }
}

export type TakeDealWithOriginalGasToTon = {
    $$type: 'TakeDealWithOriginalGasToTon';
    queryId: bigint;
    amount: bigint;
    deal: TakeDealDataWithOriginalGasTo;
}

export function storeTakeDealWithOriginalGasToTon(src: TakeDealWithOriginalGasToTon) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(640326903, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.store(storeTakeDealDataWithOriginalGasTo(src.deal));
    };
}

export function loadTakeDealWithOriginalGasToTon(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 640326903) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _deal = loadTakeDealDataWithOriginalGasTo(sc_0);
    return { $$type: 'TakeDealWithOriginalGasToTon' as const, queryId: _queryId, amount: _amount, deal: _deal };
}

function loadTupleTakeDealWithOriginalGasToTon(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    const _deal = loadTupleTakeDealDataWithOriginalGasTo(source);
    return { $$type: 'TakeDealWithOriginalGasToTon' as const, queryId: _queryId, amount: _amount, deal: _deal };
}

function loadGetterTupleTakeDealWithOriginalGasToTon(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    const _deal = loadGetterTupleTakeDealDataWithOriginalGasTo(source);
    return { $$type: 'TakeDealWithOriginalGasToTon' as const, queryId: _queryId, amount: _amount, deal: _deal };
}

function storeTupleTakeDealWithOriginalGasToTon(source: TakeDealWithOriginalGasToTon) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeTuple(storeTupleTakeDealDataWithOriginalGasTo(source.deal));
    return builder.build();
}

function dictValueParserTakeDealWithOriginalGasToTon(): DictionaryValue<TakeDealWithOriginalGasToTon> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeDealWithOriginalGasToTon(src)).endCell());
        },
        parse: (src) => {
            return loadTakeDealWithOriginalGasToTon(src.loadRef().beginParse());
        }
    }
}

export type TakeDealDataWithOriginalGasTo = {
    $$type: 'TakeDealDataWithOriginalGasTo';
    dealId: bigint;
    originalGasTo: Address;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}

export function storeTakeDealDataWithOriginalGasTo(src: TakeDealDataWithOriginalGasTo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.dealId, 32);
        b_0.storeAddress(src.originalGasTo);
        b_0.storeRef(src.oracleAssetData);
        b_0.storeRef(src.oracleTokenData);
    };
}

export function loadTakeDealDataWithOriginalGasTo(slice: Slice) {
    let sc_0 = slice;
    let _dealId = sc_0.loadUintBig(32);
    let _originalGasTo = sc_0.loadAddress();
    let _oracleAssetData = sc_0.loadRef();
    let _oracleTokenData = sc_0.loadRef();
    return { $$type: 'TakeDealDataWithOriginalGasTo' as const, dealId: _dealId, originalGasTo: _originalGasTo, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadTupleTakeDealDataWithOriginalGasTo(source: TupleReader) {
    let _dealId = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    let _oracleAssetData = source.readCell();
    let _oracleTokenData = source.readCell();
    return { $$type: 'TakeDealDataWithOriginalGasTo' as const, dealId: _dealId, originalGasTo: _originalGasTo, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadGetterTupleTakeDealDataWithOriginalGasTo(source: TupleReader) {
    let _dealId = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    let _oracleAssetData = source.readCell();
    let _oracleTokenData = source.readCell();
    return { $$type: 'TakeDealDataWithOriginalGasTo' as const, dealId: _dealId, originalGasTo: _originalGasTo, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function storeTupleTakeDealDataWithOriginalGasTo(source: TakeDealDataWithOriginalGasTo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.dealId);
    builder.writeAddress(source.originalGasTo);
    builder.writeCell(source.oracleAssetData);
    builder.writeCell(source.oracleTokenData);
    return builder.build();
}

function dictValueParserTakeDealDataWithOriginalGasTo(): DictionaryValue<TakeDealDataWithOriginalGasTo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeDealDataWithOriginalGasTo(src)).endCell());
        },
        parse: (src) => {
            return loadTakeDealDataWithOriginalGasTo(src.loadRef().beginParse());
        }
    }
}

export type CreateDeal = {
    $$type: 'CreateDeal';
    makerPosition: boolean;
    rateAsset: bigint;
    rateToken: bigint;
    percent: bigint;
    expiration: bigint;
    slippage: bigint;
    oracleAssetData: Cell | null;
    oracleTokenData: Cell | null;
}

export function storeCreateDeal(src: CreateDeal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3755427120, 32);
        b_0.storeBit(src.makerPosition);
        b_0.storeCoins(src.rateAsset);
        b_0.storeCoins(src.rateToken);
        b_0.storeCoins(src.percent);
        b_0.storeUint(src.expiration, 32);
        b_0.storeCoins(src.slippage);
        if (src.oracleAssetData !== null && src.oracleAssetData !== undefined) { b_0.storeBit(true).storeRef(src.oracleAssetData); } else { b_0.storeBit(false); }
        if (src.oracleTokenData !== null && src.oracleTokenData !== undefined) { b_0.storeBit(true).storeRef(src.oracleTokenData); } else { b_0.storeBit(false); }
    };
}

export function loadCreateDeal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3755427120) { throw Error('Invalid prefix'); }
    let _makerPosition = sc_0.loadBit();
    let _rateAsset = sc_0.loadCoins();
    let _rateToken = sc_0.loadCoins();
    let _percent = sc_0.loadCoins();
    let _expiration = sc_0.loadUintBig(32);
    let _slippage = sc_0.loadCoins();
    let _oracleAssetData = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _oracleTokenData = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'CreateDeal' as const, makerPosition: _makerPosition, rateAsset: _rateAsset, rateToken: _rateToken, percent: _percent, expiration: _expiration, slippage: _slippage, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadTupleCreateDeal(source: TupleReader) {
    let _makerPosition = source.readBoolean();
    let _rateAsset = source.readBigNumber();
    let _rateToken = source.readBigNumber();
    let _percent = source.readBigNumber();
    let _expiration = source.readBigNumber();
    let _slippage = source.readBigNumber();
    let _oracleAssetData = source.readCellOpt();
    let _oracleTokenData = source.readCellOpt();
    return { $$type: 'CreateDeal' as const, makerPosition: _makerPosition, rateAsset: _rateAsset, rateToken: _rateToken, percent: _percent, expiration: _expiration, slippage: _slippage, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadGetterTupleCreateDeal(source: TupleReader) {
    let _makerPosition = source.readBoolean();
    let _rateAsset = source.readBigNumber();
    let _rateToken = source.readBigNumber();
    let _percent = source.readBigNumber();
    let _expiration = source.readBigNumber();
    let _slippage = source.readBigNumber();
    let _oracleAssetData = source.readCellOpt();
    let _oracleTokenData = source.readCellOpt();
    return { $$type: 'CreateDeal' as const, makerPosition: _makerPosition, rateAsset: _rateAsset, rateToken: _rateToken, percent: _percent, expiration: _expiration, slippage: _slippage, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function storeTupleCreateDeal(source: CreateDeal) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.makerPosition);
    builder.writeNumber(source.rateAsset);
    builder.writeNumber(source.rateToken);
    builder.writeNumber(source.percent);
    builder.writeNumber(source.expiration);
    builder.writeNumber(source.slippage);
    builder.writeCell(source.oracleAssetData);
    builder.writeCell(source.oracleTokenData);
    return builder.build();
}

function dictValueParserCreateDeal(): DictionaryValue<CreateDeal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateDeal(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDeal(src.loadRef().beginParse());
        }
    }
}

export type InnerDeployMarket = {
    $$type: 'InnerDeployMarket';
    queryId: bigint;
    jettonWallet: Address;
    originalGasTo: Address;
}

export function storeInnerDeployMarket(src: InnerDeployMarket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1762492384, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.jettonWallet);
        b_0.storeAddress(src.originalGasTo);
    };
}

export function loadInnerDeployMarket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1762492384) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _jettonWallet = sc_0.loadAddress();
    let _originalGasTo = sc_0.loadAddress();
    return { $$type: 'InnerDeployMarket' as const, queryId: _queryId, jettonWallet: _jettonWallet, originalGasTo: _originalGasTo };
}

function loadTupleInnerDeployMarket(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _originalGasTo = source.readAddress();
    return { $$type: 'InnerDeployMarket' as const, queryId: _queryId, jettonWallet: _jettonWallet, originalGasTo: _originalGasTo };
}

function loadGetterTupleInnerDeployMarket(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _jettonWallet = source.readAddress();
    let _originalGasTo = source.readAddress();
    return { $$type: 'InnerDeployMarket' as const, queryId: _queryId, jettonWallet: _jettonWallet, originalGasTo: _originalGasTo };
}

function storeTupleInnerDeployMarket(source: InnerDeployMarket) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.originalGasTo);
    return builder.build();
}

function dictValueParserInnerDeployMarket(): DictionaryValue<InnerDeployMarket> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInnerDeployMarket(src)).endCell());
        },
        parse: (src) => {
            return loadInnerDeployMarket(src.loadRef().beginParse());
        }
    }
}

export type InnerDeployMarketTon = {
    $$type: 'InnerDeployMarketTon';
    queryId: bigint;
    originalGasTo: Address;
}

export function storeInnerDeployMarketTon(src: InnerDeployMarketTon) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2696026851, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.originalGasTo);
    };
}

export function loadInnerDeployMarketTon(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2696026851) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _originalGasTo = sc_0.loadAddress();
    return { $$type: 'InnerDeployMarketTon' as const, queryId: _queryId, originalGasTo: _originalGasTo };
}

function loadTupleInnerDeployMarketTon(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    return { $$type: 'InnerDeployMarketTon' as const, queryId: _queryId, originalGasTo: _originalGasTo };
}

function loadGetterTupleInnerDeployMarketTon(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    return { $$type: 'InnerDeployMarketTon' as const, queryId: _queryId, originalGasTo: _originalGasTo };
}

function storeTupleInnerDeployMarketTon(source: InnerDeployMarketTon) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.originalGasTo);
    return builder.build();
}

function dictValueParserInnerDeployMarketTon(): DictionaryValue<InnerDeployMarketTon> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInnerDeployMarketTon(src)).endCell());
        },
        parse: (src) => {
            return loadInnerDeployMarketTon(src.loadRef().beginParse());
        }
    }
}

export type WithdrawOperatorFee = {
    $$type: 'WithdrawOperatorFee';
    queryId: bigint;
    amount: bigint;
    to: Address;
}

export function storeWithdrawOperatorFee(src: WithdrawOperatorFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3542167315, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.to);
    };
}

export function loadWithdrawOperatorFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3542167315) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _to = sc_0.loadAddress();
    return { $$type: 'WithdrawOperatorFee' as const, queryId: _queryId, amount: _amount, to: _to };
}

function loadTupleWithdrawOperatorFee(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'WithdrawOperatorFee' as const, queryId: _queryId, amount: _amount, to: _to };
}

function loadGetterTupleWithdrawOperatorFee(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'WithdrawOperatorFee' as const, queryId: _queryId, amount: _amount, to: _to };
}

function storeTupleWithdrawOperatorFee(source: WithdrawOperatorFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserWithdrawOperatorFee(): DictionaryValue<WithdrawOperatorFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawOperatorFee(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawOperatorFee(src.loadRef().beginParse());
        }
    }
}

export type WithdrawServiceFee = {
    $$type: 'WithdrawServiceFee';
    queryId: bigint;
    amount: bigint;
    to: Address;
}

export function storeWithdrawServiceFee(src: WithdrawServiceFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3909931163, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.to);
    };
}

export function loadWithdrawServiceFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3909931163) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _to = sc_0.loadAddress();
    return { $$type: 'WithdrawServiceFee' as const, queryId: _queryId, amount: _amount, to: _to };
}

function loadTupleWithdrawServiceFee(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'WithdrawServiceFee' as const, queryId: _queryId, amount: _amount, to: _to };
}

function loadGetterTupleWithdrawServiceFee(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'WithdrawServiceFee' as const, queryId: _queryId, amount: _amount, to: _to };
}

function storeTupleWithdrawServiceFee(source: WithdrawServiceFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserWithdrawServiceFee(): DictionaryValue<WithdrawServiceFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawServiceFee(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawServiceFee(src.loadRef().beginParse());
        }
    }
}

export type CreateDealTon = {
    $$type: 'CreateDealTon';
    queryId: bigint;
    deal: CreateDealData;
}

export function storeCreateDealTon(src: CreateDealTon) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4072276050, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.store(storeCreateDealData(src.deal));
    };
}

export function loadCreateDealTon(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4072276050) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _deal = loadCreateDealData(sc_0);
    return { $$type: 'CreateDealTon' as const, queryId: _queryId, deal: _deal };
}

function loadTupleCreateDealTon(source: TupleReader) {
    let _queryId = source.readBigNumber();
    const _deal = loadTupleCreateDealData(source);
    return { $$type: 'CreateDealTon' as const, queryId: _queryId, deal: _deal };
}

function loadGetterTupleCreateDealTon(source: TupleReader) {
    let _queryId = source.readBigNumber();
    const _deal = loadGetterTupleCreateDealData(source);
    return { $$type: 'CreateDealTon' as const, queryId: _queryId, deal: _deal };
}

function storeTupleCreateDealTon(source: CreateDealTon) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeTuple(storeTupleCreateDealData(source.deal));
    return builder.build();
}

function dictValueParserCreateDealTon(): DictionaryValue<CreateDealTon> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateDealTon(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDealTon(src.loadRef().beginParse());
        }
    }
}

export type CreateDealData = {
    $$type: 'CreateDealData';
    makerPosition: boolean;
    rateAsset: bigint;
    rateToken: bigint;
    percent: bigint;
    expiration: bigint;
    slippage: bigint;
    oracleAssetData: Cell | null;
    oracleTokenData: Cell | null;
}

export function storeCreateDealData(src: CreateDealData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.makerPosition);
        b_0.storeCoins(src.rateAsset);
        b_0.storeCoins(src.rateToken);
        b_0.storeCoins(src.percent);
        b_0.storeUint(src.expiration, 32);
        b_0.storeCoins(src.slippage);
        if (src.oracleAssetData !== null && src.oracleAssetData !== undefined) { b_0.storeBit(true).storeRef(src.oracleAssetData); } else { b_0.storeBit(false); }
        if (src.oracleTokenData !== null && src.oracleTokenData !== undefined) { b_0.storeBit(true).storeRef(src.oracleTokenData); } else { b_0.storeBit(false); }
    };
}

export function loadCreateDealData(slice: Slice) {
    let sc_0 = slice;
    let _makerPosition = sc_0.loadBit();
    let _rateAsset = sc_0.loadCoins();
    let _rateToken = sc_0.loadCoins();
    let _percent = sc_0.loadCoins();
    let _expiration = sc_0.loadUintBig(32);
    let _slippage = sc_0.loadCoins();
    let _oracleAssetData = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _oracleTokenData = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'CreateDealData' as const, makerPosition: _makerPosition, rateAsset: _rateAsset, rateToken: _rateToken, percent: _percent, expiration: _expiration, slippage: _slippage, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadTupleCreateDealData(source: TupleReader) {
    let _makerPosition = source.readBoolean();
    let _rateAsset = source.readBigNumber();
    let _rateToken = source.readBigNumber();
    let _percent = source.readBigNumber();
    let _expiration = source.readBigNumber();
    let _slippage = source.readBigNumber();
    let _oracleAssetData = source.readCellOpt();
    let _oracleTokenData = source.readCellOpt();
    return { $$type: 'CreateDealData' as const, makerPosition: _makerPosition, rateAsset: _rateAsset, rateToken: _rateToken, percent: _percent, expiration: _expiration, slippage: _slippage, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadGetterTupleCreateDealData(source: TupleReader) {
    let _makerPosition = source.readBoolean();
    let _rateAsset = source.readBigNumber();
    let _rateToken = source.readBigNumber();
    let _percent = source.readBigNumber();
    let _expiration = source.readBigNumber();
    let _slippage = source.readBigNumber();
    let _oracleAssetData = source.readCellOpt();
    let _oracleTokenData = source.readCellOpt();
    return { $$type: 'CreateDealData' as const, makerPosition: _makerPosition, rateAsset: _rateAsset, rateToken: _rateToken, percent: _percent, expiration: _expiration, slippage: _slippage, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function storeTupleCreateDealData(source: CreateDealData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.makerPosition);
    builder.writeNumber(source.rateAsset);
    builder.writeNumber(source.rateToken);
    builder.writeNumber(source.percent);
    builder.writeNumber(source.expiration);
    builder.writeNumber(source.slippage);
    builder.writeCell(source.oracleAssetData);
    builder.writeCell(source.oracleTokenData);
    return builder.build();
}

function dictValueParserCreateDealData(): DictionaryValue<CreateDealData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateDealData(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDealData(src.loadRef().beginParse());
        }
    }
}

export type CancelDeal = {
    $$type: 'CancelDeal';
    queryId: bigint;
    dealId: bigint;
}

export function storeCancelDeal(src: CancelDeal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2166842366, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.dealId, 32);
    };
}

export function loadCancelDeal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2166842366) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _dealId = sc_0.loadUintBig(32);
    return { $$type: 'CancelDeal' as const, queryId: _queryId, dealId: _dealId };
}

function loadTupleCancelDeal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    return { $$type: 'CancelDeal' as const, queryId: _queryId, dealId: _dealId };
}

function loadGetterTupleCancelDeal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    return { $$type: 'CancelDeal' as const, queryId: _queryId, dealId: _dealId };
}

function storeTupleCancelDeal(source: CancelDeal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.dealId);
    return builder.build();
}

function dictValueParserCancelDeal(): DictionaryValue<CancelDeal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelDeal(src)).endCell());
        },
        parse: (src) => {
            return loadCancelDeal(src.loadRef().beginParse());
        }
    }
}

export type ProcessDeal = {
    $$type: 'ProcessDeal';
    queryId: bigint;
    dealId: bigint;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}

export function storeProcessDeal(src: ProcessDeal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3915542458, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.dealId, 32);
        b_0.storeRef(src.oracleAssetData);
        b_0.storeRef(src.oracleTokenData);
    };
}

export function loadProcessDeal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3915542458) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _dealId = sc_0.loadUintBig(32);
    let _oracleAssetData = sc_0.loadRef();
    let _oracleTokenData = sc_0.loadRef();
    return { $$type: 'ProcessDeal' as const, queryId: _queryId, dealId: _dealId, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadTupleProcessDeal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _oracleAssetData = source.readCell();
    let _oracleTokenData = source.readCell();
    return { $$type: 'ProcessDeal' as const, queryId: _queryId, dealId: _dealId, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadGetterTupleProcessDeal(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _oracleAssetData = source.readCell();
    let _oracleTokenData = source.readCell();
    return { $$type: 'ProcessDeal' as const, queryId: _queryId, dealId: _dealId, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function storeTupleProcessDeal(source: ProcessDeal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.dealId);
    builder.writeCell(source.oracleAssetData);
    builder.writeCell(source.oracleTokenData);
    return builder.build();
}

function dictValueParserProcessDeal(): DictionaryValue<ProcessDeal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProcessDeal(src)).endCell());
        },
        parse: (src) => {
            return loadProcessDeal(src.loadRef().beginParse());
        }
    }
}

export type DealData = {
    $$type: 'DealData';
    status: bigint;
    isSeller: boolean;
    rate: bigint;
    rateMaker: bigint;
    percent: bigint;
    slippageMaker: bigint;
    collateralAmountMaker: bigint;
    dateOrderCreation: bigint;
    dateOrderExpiration: bigint;
    dateStart: bigint;
    dateStop: bigint;
    buyerTokenId: bigint;
    sellerTokenId: bigint;
    maker: Address;
}

export function storeDealData(src: DealData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.status, 8);
        b_0.storeBit(src.isSeller);
        b_0.storeCoins(src.rate);
        b_0.storeCoins(src.rateMaker);
        b_0.storeCoins(src.percent);
        b_0.storeCoins(src.slippageMaker);
        b_0.storeCoins(src.collateralAmountMaker);
        b_0.storeUint(src.dateOrderCreation, 32);
        b_0.storeUint(src.dateOrderExpiration, 32);
        b_0.storeUint(src.dateStart, 32);
        b_0.storeUint(src.dateStop, 32);
        b_0.storeUint(src.buyerTokenId, 32);
        b_0.storeUint(src.sellerTokenId, 32);
        let b_1 = new Builder();
        b_1.storeAddress(src.maker);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDealData(slice: Slice) {
    let sc_0 = slice;
    let _status = sc_0.loadUintBig(8);
    let _isSeller = sc_0.loadBit();
    let _rate = sc_0.loadCoins();
    let _rateMaker = sc_0.loadCoins();
    let _percent = sc_0.loadCoins();
    let _slippageMaker = sc_0.loadCoins();
    let _collateralAmountMaker = sc_0.loadCoins();
    let _dateOrderCreation = sc_0.loadUintBig(32);
    let _dateOrderExpiration = sc_0.loadUintBig(32);
    let _dateStart = sc_0.loadUintBig(32);
    let _dateStop = sc_0.loadUintBig(32);
    let _buyerTokenId = sc_0.loadUintBig(32);
    let _sellerTokenId = sc_0.loadUintBig(32);
    let sc_1 = sc_0.loadRef().beginParse();
    let _maker = sc_1.loadAddress();
    return { $$type: 'DealData' as const, status: _status, isSeller: _isSeller, rate: _rate, rateMaker: _rateMaker, percent: _percent, slippageMaker: _slippageMaker, collateralAmountMaker: _collateralAmountMaker, dateOrderCreation: _dateOrderCreation, dateOrderExpiration: _dateOrderExpiration, dateStart: _dateStart, dateStop: _dateStop, buyerTokenId: _buyerTokenId, sellerTokenId: _sellerTokenId, maker: _maker };
}

function loadTupleDealData(source: TupleReader) {
    let _status = source.readBigNumber();
    let _isSeller = source.readBoolean();
    let _rate = source.readBigNumber();
    let _rateMaker = source.readBigNumber();
    let _percent = source.readBigNumber();
    let _slippageMaker = source.readBigNumber();
    let _collateralAmountMaker = source.readBigNumber();
    let _dateOrderCreation = source.readBigNumber();
    let _dateOrderExpiration = source.readBigNumber();
    let _dateStart = source.readBigNumber();
    let _dateStop = source.readBigNumber();
    let _buyerTokenId = source.readBigNumber();
    let _sellerTokenId = source.readBigNumber();
    let _maker = source.readAddress();
    return { $$type: 'DealData' as const, status: _status, isSeller: _isSeller, rate: _rate, rateMaker: _rateMaker, percent: _percent, slippageMaker: _slippageMaker, collateralAmountMaker: _collateralAmountMaker, dateOrderCreation: _dateOrderCreation, dateOrderExpiration: _dateOrderExpiration, dateStart: _dateStart, dateStop: _dateStop, buyerTokenId: _buyerTokenId, sellerTokenId: _sellerTokenId, maker: _maker };
}

function loadGetterTupleDealData(source: TupleReader) {
    let _status = source.readBigNumber();
    let _isSeller = source.readBoolean();
    let _rate = source.readBigNumber();
    let _rateMaker = source.readBigNumber();
    let _percent = source.readBigNumber();
    let _slippageMaker = source.readBigNumber();
    let _collateralAmountMaker = source.readBigNumber();
    let _dateOrderCreation = source.readBigNumber();
    let _dateOrderExpiration = source.readBigNumber();
    let _dateStart = source.readBigNumber();
    let _dateStop = source.readBigNumber();
    let _buyerTokenId = source.readBigNumber();
    let _sellerTokenId = source.readBigNumber();
    let _maker = source.readAddress();
    return { $$type: 'DealData' as const, status: _status, isSeller: _isSeller, rate: _rate, rateMaker: _rateMaker, percent: _percent, slippageMaker: _slippageMaker, collateralAmountMaker: _collateralAmountMaker, dateOrderCreation: _dateOrderCreation, dateOrderExpiration: _dateOrderExpiration, dateStart: _dateStart, dateStop: _dateStop, buyerTokenId: _buyerTokenId, sellerTokenId: _sellerTokenId, maker: _maker };
}

function storeTupleDealData(source: DealData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.status);
    builder.writeBoolean(source.isSeller);
    builder.writeNumber(source.rate);
    builder.writeNumber(source.rateMaker);
    builder.writeNumber(source.percent);
    builder.writeNumber(source.slippageMaker);
    builder.writeNumber(source.collateralAmountMaker);
    builder.writeNumber(source.dateOrderCreation);
    builder.writeNumber(source.dateOrderExpiration);
    builder.writeNumber(source.dateStart);
    builder.writeNumber(source.dateStop);
    builder.writeNumber(source.buyerTokenId);
    builder.writeNumber(source.sellerTokenId);
    builder.writeAddress(source.maker);
    return builder.build();
}

function dictValueParserDealData(): DictionaryValue<DealData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDealData(src)).endCell());
        },
        parse: (src) => {
            return loadDealData(src.loadRef().beginParse());
        }
    }
}

export type CancelEvent = {
    $$type: 'CancelEvent';
    queryId: bigint;
    dealId: bigint;
    maker: Address;
    collateralAmountMaker: bigint;
}

export function storeCancelEvent(src: CancelEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3409203741, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.dealId, 32);
        b_0.storeAddress(src.maker);
        b_0.storeCoins(src.collateralAmountMaker);
    };
}

export function loadCancelEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3409203741) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _dealId = sc_0.loadUintBig(32);
    let _maker = sc_0.loadAddress();
    let _collateralAmountMaker = sc_0.loadCoins();
    return { $$type: 'CancelEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function loadTupleCancelEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _maker = source.readAddress();
    let _collateralAmountMaker = source.readBigNumber();
    return { $$type: 'CancelEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function loadGetterTupleCancelEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _maker = source.readAddress();
    let _collateralAmountMaker = source.readBigNumber();
    return { $$type: 'CancelEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function storeTupleCancelEvent(source: CancelEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.dealId);
    builder.writeAddress(source.maker);
    builder.writeNumber(source.collateralAmountMaker);
    return builder.build();
}

function dictValueParserCancelEvent(): DictionaryValue<CancelEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCancelEvent(src.loadRef().beginParse());
        }
    }
}

export type DealAcceptedEvent = {
    $$type: 'DealAcceptedEvent';
    queryId: bigint;
    dealId: bigint;
    maker: Address;
    collateralAmountMaker: bigint;
}

export function storeDealAcceptedEvent(src: DealAcceptedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(73313137, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.dealId, 32);
        b_0.storeAddress(src.maker);
        b_0.storeCoins(src.collateralAmountMaker);
    };
}

export function loadDealAcceptedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 73313137) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _dealId = sc_0.loadUintBig(32);
    let _maker = sc_0.loadAddress();
    let _collateralAmountMaker = sc_0.loadCoins();
    return { $$type: 'DealAcceptedEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function loadTupleDealAcceptedEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _maker = source.readAddress();
    let _collateralAmountMaker = source.readBigNumber();
    return { $$type: 'DealAcceptedEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function loadGetterTupleDealAcceptedEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _maker = source.readAddress();
    let _collateralAmountMaker = source.readBigNumber();
    return { $$type: 'DealAcceptedEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function storeTupleDealAcceptedEvent(source: DealAcceptedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.dealId);
    builder.writeAddress(source.maker);
    builder.writeNumber(source.collateralAmountMaker);
    return builder.build();
}

function dictValueParserDealAcceptedEvent(): DictionaryValue<DealAcceptedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDealAcceptedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDealAcceptedEvent(src.loadRef().beginParse());
        }
    }
}

export type DealCreatedEvent = {
    $$type: 'DealCreatedEvent';
    queryId: bigint;
    dealId: bigint;
    maker: Address;
    collateralAmountMaker: bigint;
}

export function storeDealCreatedEvent(src: DealCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(17345355, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.dealId, 32);
        b_0.storeAddress(src.maker);
        b_0.storeCoins(src.collateralAmountMaker);
    };
}

export function loadDealCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 17345355) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _dealId = sc_0.loadUintBig(32);
    let _maker = sc_0.loadAddress();
    let _collateralAmountMaker = sc_0.loadCoins();
    return { $$type: 'DealCreatedEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function loadTupleDealCreatedEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _maker = source.readAddress();
    let _collateralAmountMaker = source.readBigNumber();
    return { $$type: 'DealCreatedEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function loadGetterTupleDealCreatedEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _maker = source.readAddress();
    let _collateralAmountMaker = source.readBigNumber();
    return { $$type: 'DealCreatedEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function storeTupleDealCreatedEvent(source: DealCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.dealId);
    builder.writeAddress(source.maker);
    builder.writeNumber(source.collateralAmountMaker);
    return builder.build();
}

function dictValueParserDealCreatedEvent(): DictionaryValue<DealCreatedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDealCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDealCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type DealCompletedEvent = {
    $$type: 'DealCompletedEvent';
    queryId: bigint;
    dealId: bigint;
    maker: Address;
    collateralAmountMaker: bigint;
}

export function storeDealCompletedEvent(src: DealCompletedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339190802, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.dealId, 32);
        b_0.storeAddress(src.maker);
        b_0.storeCoins(src.collateralAmountMaker);
    };
}

export function loadDealCompletedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339190802) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _dealId = sc_0.loadUintBig(32);
    let _maker = sc_0.loadAddress();
    let _collateralAmountMaker = sc_0.loadCoins();
    return { $$type: 'DealCompletedEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function loadTupleDealCompletedEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _maker = source.readAddress();
    let _collateralAmountMaker = source.readBigNumber();
    return { $$type: 'DealCompletedEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function loadGetterTupleDealCompletedEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _maker = source.readAddress();
    let _collateralAmountMaker = source.readBigNumber();
    return { $$type: 'DealCompletedEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function storeTupleDealCompletedEvent(source: DealCompletedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.dealId);
    builder.writeAddress(source.maker);
    builder.writeNumber(source.collateralAmountMaker);
    return builder.build();
}

function dictValueParserDealCompletedEvent(): DictionaryValue<DealCompletedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDealCompletedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDealCompletedEvent(src.loadRef().beginParse());
        }
    }
}

export type DealExpiredEvent = {
    $$type: 'DealExpiredEvent';
    queryId: bigint;
    dealId: bigint;
    maker: Address;
    collateralAmountMaker: bigint;
}

export function storeDealExpiredEvent(src: DealExpiredEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(292536636, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.dealId, 32);
        b_0.storeAddress(src.maker);
        b_0.storeCoins(src.collateralAmountMaker);
    };
}

export function loadDealExpiredEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 292536636) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _dealId = sc_0.loadUintBig(32);
    let _maker = sc_0.loadAddress();
    let _collateralAmountMaker = sc_0.loadCoins();
    return { $$type: 'DealExpiredEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function loadTupleDealExpiredEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _maker = source.readAddress();
    let _collateralAmountMaker = source.readBigNumber();
    return { $$type: 'DealExpiredEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function loadGetterTupleDealExpiredEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _maker = source.readAddress();
    let _collateralAmountMaker = source.readBigNumber();
    return { $$type: 'DealExpiredEvent' as const, queryId: _queryId, dealId: _dealId, maker: _maker, collateralAmountMaker: _collateralAmountMaker };
}

function storeTupleDealExpiredEvent(source: DealExpiredEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.dealId);
    builder.writeAddress(source.maker);
    builder.writeNumber(source.collateralAmountMaker);
    return builder.build();
}

function dictValueParserDealExpiredEvent(): DictionaryValue<DealExpiredEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDealExpiredEvent(src)).endCell());
        },
        parse: (src) => {
            return loadDealExpiredEvent(src.loadRef().beginParse());
        }
    }
}

export type ContextCancelDealForDealReceived = {
    $$type: 'ContextCancelDealForDealReceived';
    from: Address;
}

export function storeContextCancelDealForDealReceived(src: ContextCancelDealForDealReceived) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.from);
    };
}

export function loadContextCancelDealForDealReceived(slice: Slice) {
    let sc_0 = slice;
    let _from = sc_0.loadAddress();
    return { $$type: 'ContextCancelDealForDealReceived' as const, from: _from };
}

function loadTupleContextCancelDealForDealReceived(source: TupleReader) {
    let _from = source.readAddress();
    return { $$type: 'ContextCancelDealForDealReceived' as const, from: _from };
}

function loadGetterTupleContextCancelDealForDealReceived(source: TupleReader) {
    let _from = source.readAddress();
    return { $$type: 'ContextCancelDealForDealReceived' as const, from: _from };
}

function storeTupleContextCancelDealForDealReceived(source: ContextCancelDealForDealReceived) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    return builder.build();
}

function dictValueParserContextCancelDealForDealReceived(): DictionaryValue<ContextCancelDealForDealReceived> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContextCancelDealForDealReceived(src)).endCell());
        },
        parse: (src) => {
            return loadContextCancelDealForDealReceived(src.loadRef().beginParse());
        }
    }
}

export type ContextTakeDealForDealReceived = {
    $$type: 'ContextTakeDealForDealReceived';
    from: Address;
    amount: bigint;
    originalGasTo: Address;
    feedId: bigint;
    price: bigint;
    timestamp: bigint;
    feedId2: bigint;
    price2: bigint;
    timestamp2: bigint;
}

export function storeContextTakeDealForDealReceived(src: ContextTakeDealForDealReceived) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.from);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.originalGasTo);
        b_0.storeUint(src.feedId, 32);
        b_0.storeUint(src.price, 128);
        b_0.storeUint(src.timestamp, 32);
        b_0.storeUint(src.feedId2, 32);
        b_0.storeUint(src.price2, 128);
        let b_1 = new Builder();
        b_1.storeUint(src.timestamp2, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadContextTakeDealForDealReceived(slice: Slice) {
    let sc_0 = slice;
    let _from = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _originalGasTo = sc_0.loadAddress();
    let _feedId = sc_0.loadUintBig(32);
    let _price = sc_0.loadUintBig(128);
    let _timestamp = sc_0.loadUintBig(32);
    let _feedId2 = sc_0.loadUintBig(32);
    let _price2 = sc_0.loadUintBig(128);
    let sc_1 = sc_0.loadRef().beginParse();
    let _timestamp2 = sc_1.loadUintBig(32);
    return { $$type: 'ContextTakeDealForDealReceived' as const, from: _from, amount: _amount, originalGasTo: _originalGasTo, feedId: _feedId, price: _price, timestamp: _timestamp, feedId2: _feedId2, price2: _price2, timestamp2: _timestamp2 };
}

function loadTupleContextTakeDealForDealReceived(source: TupleReader) {
    let _from = source.readAddress();
    let _amount = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    let _feedId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _timestamp = source.readBigNumber();
    let _feedId2 = source.readBigNumber();
    let _price2 = source.readBigNumber();
    let _timestamp2 = source.readBigNumber();
    return { $$type: 'ContextTakeDealForDealReceived' as const, from: _from, amount: _amount, originalGasTo: _originalGasTo, feedId: _feedId, price: _price, timestamp: _timestamp, feedId2: _feedId2, price2: _price2, timestamp2: _timestamp2 };
}

function loadGetterTupleContextTakeDealForDealReceived(source: TupleReader) {
    let _from = source.readAddress();
    let _amount = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    let _feedId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _timestamp = source.readBigNumber();
    let _feedId2 = source.readBigNumber();
    let _price2 = source.readBigNumber();
    let _timestamp2 = source.readBigNumber();
    return { $$type: 'ContextTakeDealForDealReceived' as const, from: _from, amount: _amount, originalGasTo: _originalGasTo, feedId: _feedId, price: _price, timestamp: _timestamp, feedId2: _feedId2, price2: _price2, timestamp2: _timestamp2 };
}

function storeTupleContextTakeDealForDealReceived(source: ContextTakeDealForDealReceived) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.originalGasTo);
    builder.writeNumber(source.feedId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.timestamp);
    builder.writeNumber(source.feedId2);
    builder.writeNumber(source.price2);
    builder.writeNumber(source.timestamp2);
    return builder.build();
}

function dictValueParserContextTakeDealForDealReceived(): DictionaryValue<ContextTakeDealForDealReceived> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContextTakeDealForDealReceived(src)).endCell());
        },
        parse: (src) => {
            return loadContextTakeDealForDealReceived(src.loadRef().beginParse());
        }
    }
}

export type ContextProcessDealForDealReceived = {
    $$type: 'ContextProcessDealForDealReceived';
    from: Address;
    feedId: bigint;
    price: bigint;
    timestamp: bigint;
    feedId2: bigint;
    price2: bigint;
    timestamp2: bigint;
}

export function storeContextProcessDealForDealReceived(src: ContextProcessDealForDealReceived) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.from);
        b_0.storeUint(src.feedId, 32);
        b_0.storeUint(src.price, 128);
        b_0.storeUint(src.timestamp, 32);
        b_0.storeUint(src.feedId2, 32);
        b_0.storeUint(src.price2, 128);
        b_0.storeUint(src.timestamp2, 32);
    };
}

export function loadContextProcessDealForDealReceived(slice: Slice) {
    let sc_0 = slice;
    let _from = sc_0.loadAddress();
    let _feedId = sc_0.loadUintBig(32);
    let _price = sc_0.loadUintBig(128);
    let _timestamp = sc_0.loadUintBig(32);
    let _feedId2 = sc_0.loadUintBig(32);
    let _price2 = sc_0.loadUintBig(128);
    let _timestamp2 = sc_0.loadUintBig(32);
    return { $$type: 'ContextProcessDealForDealReceived' as const, from: _from, feedId: _feedId, price: _price, timestamp: _timestamp, feedId2: _feedId2, price2: _price2, timestamp2: _timestamp2 };
}

function loadTupleContextProcessDealForDealReceived(source: TupleReader) {
    let _from = source.readAddress();
    let _feedId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _timestamp = source.readBigNumber();
    let _feedId2 = source.readBigNumber();
    let _price2 = source.readBigNumber();
    let _timestamp2 = source.readBigNumber();
    return { $$type: 'ContextProcessDealForDealReceived' as const, from: _from, feedId: _feedId, price: _price, timestamp: _timestamp, feedId2: _feedId2, price2: _price2, timestamp2: _timestamp2 };
}

function loadGetterTupleContextProcessDealForDealReceived(source: TupleReader) {
    let _from = source.readAddress();
    let _feedId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _timestamp = source.readBigNumber();
    let _feedId2 = source.readBigNumber();
    let _price2 = source.readBigNumber();
    let _timestamp2 = source.readBigNumber();
    return { $$type: 'ContextProcessDealForDealReceived' as const, from: _from, feedId: _feedId, price: _price, timestamp: _timestamp, feedId2: _feedId2, price2: _price2, timestamp2: _timestamp2 };
}

function storeTupleContextProcessDealForDealReceived(source: ContextProcessDealForDealReceived) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeNumber(source.feedId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.timestamp);
    builder.writeNumber(source.feedId2);
    builder.writeNumber(source.price2);
    builder.writeNumber(source.timestamp2);
    return builder.build();
}

function dictValueParserContextProcessDealForDealReceived(): DictionaryValue<ContextProcessDealForDealReceived> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContextProcessDealForDealReceived(src)).endCell());
        },
        parse: (src) => {
            return loadContextProcessDealForDealReceived(src.loadRef().beginParse());
        }
    }
}

export type ContextTakeDealForPriceReceived = {
    $$type: 'ContextTakeDealForPriceReceived';
    from: Address;
    amount: bigint;
    dealId: bigint;
    originalGasTo: Address;
}

export function storeContextTakeDealForPriceReceived(src: ContextTakeDealForPriceReceived) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.from);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.dealId, 32);
        b_0.storeAddress(src.originalGasTo);
    };
}

export function loadContextTakeDealForPriceReceived(slice: Slice) {
    let sc_0 = slice;
    let _from = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _dealId = sc_0.loadUintBig(32);
    let _originalGasTo = sc_0.loadAddress();
    return { $$type: 'ContextTakeDealForPriceReceived' as const, from: _from, amount: _amount, dealId: _dealId, originalGasTo: _originalGasTo };
}

function loadTupleContextTakeDealForPriceReceived(source: TupleReader) {
    let _from = source.readAddress();
    let _amount = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    return { $$type: 'ContextTakeDealForPriceReceived' as const, from: _from, amount: _amount, dealId: _dealId, originalGasTo: _originalGasTo };
}

function loadGetterTupleContextTakeDealForPriceReceived(source: TupleReader) {
    let _from = source.readAddress();
    let _amount = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    return { $$type: 'ContextTakeDealForPriceReceived' as const, from: _from, amount: _amount, dealId: _dealId, originalGasTo: _originalGasTo };
}

function storeTupleContextTakeDealForPriceReceived(source: ContextTakeDealForPriceReceived) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.dealId);
    builder.writeAddress(source.originalGasTo);
    return builder.build();
}

function dictValueParserContextTakeDealForPriceReceived(): DictionaryValue<ContextTakeDealForPriceReceived> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContextTakeDealForPriceReceived(src)).endCell());
        },
        parse: (src) => {
            return loadContextTakeDealForPriceReceived(src.loadRef().beginParse());
        }
    }
}

export type ContextProcessDealForPriceReceived = {
    $$type: 'ContextProcessDealForPriceReceived';
    from: Address;
    dealId: bigint;
}

export function storeContextProcessDealForPriceReceived(src: ContextProcessDealForPriceReceived) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.from);
        b_0.storeUint(src.dealId, 32);
    };
}

export function loadContextProcessDealForPriceReceived(slice: Slice) {
    let sc_0 = slice;
    let _from = sc_0.loadAddress();
    let _dealId = sc_0.loadUintBig(32);
    return { $$type: 'ContextProcessDealForPriceReceived' as const, from: _from, dealId: _dealId };
}

function loadTupleContextProcessDealForPriceReceived(source: TupleReader) {
    let _from = source.readAddress();
    let _dealId = source.readBigNumber();
    return { $$type: 'ContextProcessDealForPriceReceived' as const, from: _from, dealId: _dealId };
}

function loadGetterTupleContextProcessDealForPriceReceived(source: TupleReader) {
    let _from = source.readAddress();
    let _dealId = source.readBigNumber();
    return { $$type: 'ContextProcessDealForPriceReceived' as const, from: _from, dealId: _dealId };
}

function storeTupleContextProcessDealForPriceReceived(source: ContextProcessDealForPriceReceived) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeNumber(source.dealId);
    return builder.build();
}

function dictValueParserContextProcessDealForPriceReceived(): DictionaryValue<ContextProcessDealForPriceReceived> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContextProcessDealForPriceReceived(src)).endCell());
        },
        parse: (src) => {
            return loadContextProcessDealForPriceReceived(src.loadRef().beginParse());
        }
    }
}

export type ContextForGetOwner = {
    $$type: 'ContextForGetOwner';
    amount: bigint;
    originalGasTo: Address;
}

export function storeContextForGetOwner(src: ContextForGetOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.originalGasTo);
    };
}

export function loadContextForGetOwner(slice: Slice) {
    let sc_0 = slice;
    let _amount = sc_0.loadCoins();
    let _originalGasTo = sc_0.loadAddress();
    return { $$type: 'ContextForGetOwner' as const, amount: _amount, originalGasTo: _originalGasTo };
}

function loadTupleContextForGetOwner(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    return { $$type: 'ContextForGetOwner' as const, amount: _amount, originalGasTo: _originalGasTo };
}

function loadGetterTupleContextForGetOwner(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    return { $$type: 'ContextForGetOwner' as const, amount: _amount, originalGasTo: _originalGasTo };
}

function storeTupleContextForGetOwner(source: ContextForGetOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.originalGasTo);
    return builder.build();
}

function dictValueParserContextForGetOwner(): DictionaryValue<ContextForGetOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContextForGetOwner(src)).endCell());
        },
        parse: (src) => {
            return loadContextForGetOwner(src.loadRef().beginParse());
        }
    }
}

export type TakeDealAmm = {
    $$type: 'TakeDealAmm';
    queryId: bigint;
    dealId: bigint;
    amount: bigint;
    originalGasTo: Address;
    oracleAssetData: Cell;
    oracleTokenData: Cell;
}

export function storeTakeDealAmm(src: TakeDealAmm) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1895074275, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.dealId, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.originalGasTo);
        b_0.storeRef(src.oracleAssetData);
        b_0.storeRef(src.oracleTokenData);
    };
}

export function loadTakeDealAmm(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1895074275) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _dealId = sc_0.loadUintBig(32);
    let _amount = sc_0.loadCoins();
    let _originalGasTo = sc_0.loadAddress();
    let _oracleAssetData = sc_0.loadRef();
    let _oracleTokenData = sc_0.loadRef();
    return { $$type: 'TakeDealAmm' as const, queryId: _queryId, dealId: _dealId, amount: _amount, originalGasTo: _originalGasTo, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadTupleTakeDealAmm(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    let _oracleAssetData = source.readCell();
    let _oracleTokenData = source.readCell();
    return { $$type: 'TakeDealAmm' as const, queryId: _queryId, dealId: _dealId, amount: _amount, originalGasTo: _originalGasTo, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function loadGetterTupleTakeDealAmm(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _dealId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    let _oracleAssetData = source.readCell();
    let _oracleTokenData = source.readCell();
    return { $$type: 'TakeDealAmm' as const, queryId: _queryId, dealId: _dealId, amount: _amount, originalGasTo: _originalGasTo, oracleAssetData: _oracleAssetData, oracleTokenData: _oracleTokenData };
}

function storeTupleTakeDealAmm(source: TakeDealAmm) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.dealId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.originalGasTo);
    builder.writeCell(source.oracleAssetData);
    builder.writeCell(source.oracleTokenData);
    return builder.build();
}

function dictValueParserTakeDealAmm(): DictionaryValue<TakeDealAmm> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeDealAmm(src)).endCell());
        },
        parse: (src) => {
            return loadTakeDealAmm(src.loadRef().beginParse());
        }
    }
}

export type UpdateFees = {
    $$type: 'UpdateFees';
    queryId: bigint;
    operatorFee: bigint;
    serviceFee: bigint;
}

export function storeUpdateFees(src: UpdateFees) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(587185847, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.operatorFee, 32);
        b_0.storeUint(src.serviceFee, 32);
    };
}

export function loadUpdateFees(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 587185847) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _operatorFee = sc_0.loadUintBig(32);
    let _serviceFee = sc_0.loadUintBig(32);
    return { $$type: 'UpdateFees' as const, queryId: _queryId, operatorFee: _operatorFee, serviceFee: _serviceFee };
}

function loadTupleUpdateFees(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    return { $$type: 'UpdateFees' as const, queryId: _queryId, operatorFee: _operatorFee, serviceFee: _serviceFee };
}

function loadGetterTupleUpdateFees(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    return { $$type: 'UpdateFees' as const, queryId: _queryId, operatorFee: _operatorFee, serviceFee: _serviceFee };
}

function storeTupleUpdateFees(source: UpdateFees) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.operatorFee);
    builder.writeNumber(source.serviceFee);
    return builder.build();
}

function dictValueParserUpdateFees(): DictionaryValue<UpdateFees> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateFees(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateFees(src.loadRef().beginParse());
        }
    }
}

export type FeesUpdatedEvent = {
    $$type: 'FeesUpdatedEvent';
    queryId: bigint;
    operatorFee: bigint;
    serviceFee: bigint;
}

export function storeFeesUpdatedEvent(src: FeesUpdatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2897393818, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.operatorFee, 32);
        b_0.storeUint(src.serviceFee, 32);
    };
}

export function loadFeesUpdatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2897393818) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _operatorFee = sc_0.loadUintBig(32);
    let _serviceFee = sc_0.loadUintBig(32);
    return { $$type: 'FeesUpdatedEvent' as const, queryId: _queryId, operatorFee: _operatorFee, serviceFee: _serviceFee };
}

function loadTupleFeesUpdatedEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    return { $$type: 'FeesUpdatedEvent' as const, queryId: _queryId, operatorFee: _operatorFee, serviceFee: _serviceFee };
}

function loadGetterTupleFeesUpdatedEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    return { $$type: 'FeesUpdatedEvent' as const, queryId: _queryId, operatorFee: _operatorFee, serviceFee: _serviceFee };
}

function storeTupleFeesUpdatedEvent(source: FeesUpdatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.operatorFee);
    builder.writeNumber(source.serviceFee);
    return builder.build();
}

function dictValueParserFeesUpdatedEvent(): DictionaryValue<FeesUpdatedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFeesUpdatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadFeesUpdatedEvent(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    total_supply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    wallet_code: Cell;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.wallet_code);
    };
}

export function loadJettonData(slice: Slice) {
    let sc_0 = slice;
    let _total_supply = sc_0.loadIntBig(257);
    let _mintable = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function loadGetterTupleJettonData(source: TupleReader) {
    let _total_supply = source.readBigNumber();
    let _mintable = source.readBoolean();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _wallet_code = source.readCell();
    return { $$type: 'JettonData' as const, total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}

function storeTupleJettonData(source: JettonData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.wallet_code);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadJettonWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadGetterTupleJettonWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    recipient: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.recipient);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _recipient = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, recipient: _recipient, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _recipient = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, recipient: _recipient, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _recipient = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, recipient: _recipient, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.recipient);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenTransferInternal = {
    $$type: 'TokenTransferInternal';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeTokenTransferInternal(src: TokenTransferInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransferInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTokenTransferInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenTransferInternal' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Slice;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadGetterTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address | null;
    custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadGetterTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type TokenBurnNotification = {
    $$type: 'TokenBurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address | null;
}

export function storeTokenBurnNotification(src: TokenBurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadTokenBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadGetterTupleTokenBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadGetterTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenUpdateContent = {
    $$type: 'TokenUpdateContent';
    content: Cell;
}

export function storeTokenUpdateContent(src: TokenUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}

export function loadTokenUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function loadGetterTupleTokenUpdateContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'TokenUpdateContent' as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadGetterTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Slice;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeBuilder(src.owner_address.asBuilder());
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0;
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell().asSlice();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadGetterTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readCell().asSlice();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeSlice(source.owner_address.asCell());
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type Deal$Data = {
    $$type: 'Deal$Data';
    id: bigint;
    owner: Address;
    data: Cell | null;
}

export function storeDeal$Data(src: Deal$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.owner);
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadDeal$Data(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(32);
    let _owner = sc_0.loadAddress();
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Deal$Data' as const, id: _id, owner: _owner, data: _data };
}

function loadTupleDeal$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _data = source.readCellOpt();
    return { $$type: 'Deal$Data' as const, id: _id, owner: _owner, data: _data };
}

function loadGetterTupleDeal$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _data = source.readCellOpt();
    return { $$type: 'Deal$Data' as const, id: _id, owner: _owner, data: _data };
}

function storeTupleDeal$Data(source: Deal$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserDeal$Data(): DictionaryValue<Deal$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeal$Data(src)).endCell());
        },
        parse: (src) => {
            return loadDeal$Data(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type NftItem$Data = {
    $$type: 'NftItem$Data';
    collection_address: Address;
    item_index: bigint;
    is_initialized: boolean;
    owner: Address | null;
    individual_content: Cell | null;
}

export function storeNftItem$Data(src: NftItem$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.collection_address);
        b_0.storeInt(src.item_index, 257);
        b_0.storeBit(src.is_initialized);
        b_0.storeAddress(src.owner);
        if (src.individual_content !== null && src.individual_content !== undefined) { b_0.storeBit(true).storeRef(src.individual_content); } else { b_0.storeBit(false); }
    };
}

export function loadNftItem$Data(slice: Slice) {
    let sc_0 = slice;
    let _collection_address = sc_0.loadAddress();
    let _item_index = sc_0.loadIntBig(257);
    let _is_initialized = sc_0.loadBit();
    let _owner = sc_0.loadMaybeAddress();
    let _individual_content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'NftItem$Data' as const, collection_address: _collection_address, item_index: _item_index, is_initialized: _is_initialized, owner: _owner, individual_content: _individual_content };
}

function loadTupleNftItem$Data(source: TupleReader) {
    let _collection_address = source.readAddress();
    let _item_index = source.readBigNumber();
    let _is_initialized = source.readBoolean();
    let _owner = source.readAddressOpt();
    let _individual_content = source.readCellOpt();
    return { $$type: 'NftItem$Data' as const, collection_address: _collection_address, item_index: _item_index, is_initialized: _is_initialized, owner: _owner, individual_content: _individual_content };
}

function loadGetterTupleNftItem$Data(source: TupleReader) {
    let _collection_address = source.readAddress();
    let _item_index = source.readBigNumber();
    let _is_initialized = source.readBoolean();
    let _owner = source.readAddressOpt();
    let _individual_content = source.readCellOpt();
    return { $$type: 'NftItem$Data' as const, collection_address: _collection_address, item_index: _item_index, is_initialized: _is_initialized, owner: _owner, individual_content: _individual_content };
}

function storeTupleNftItem$Data(source: NftItem$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.collection_address);
    builder.writeNumber(source.item_index);
    builder.writeBoolean(source.is_initialized);
    builder.writeAddress(source.owner);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserNftItem$Data(): DictionaryValue<NftItem$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftItem$Data(src)).endCell());
        },
        parse: (src) => {
            return loadNftItem$Data(src.loadRef().beginParse());
        }
    }
}

export type GetData = {
    $$type: 'GetData';
    queryId: bigint;
}

export function storeGetData(src: GetData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3858888933, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadGetData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3858888933) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'GetData' as const, queryId: _queryId };
}

function loadTupleGetData(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'GetData' as const, queryId: _queryId };
}

function loadGetterTupleGetData(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'GetData' as const, queryId: _queryId };
}

function storeTupleGetData(source: GetData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserGetData(): DictionaryValue<GetData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetData(src)).endCell());
        },
        parse: (src) => {
            return loadGetData(src.loadRef().beginParse());
        }
    }
}

export type ReportData = {
    $$type: 'ReportData';
    queryId: bigint;
    id: bigint;
    data: Cell;
}

export function storeReportData(src: ReportData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3062344471, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.id, 32);
        b_0.storeRef(src.data);
    };
}

export function loadReportData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3062344471) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _id = sc_0.loadUintBig(32);
    let _data = sc_0.loadRef();
    return { $$type: 'ReportData' as const, queryId: _queryId, id: _id, data: _data };
}

function loadTupleReportData(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _id = source.readBigNumber();
    let _data = source.readCell();
    return { $$type: 'ReportData' as const, queryId: _queryId, id: _id, data: _data };
}

function loadGetterTupleReportData(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _id = source.readBigNumber();
    let _data = source.readCell();
    return { $$type: 'ReportData' as const, queryId: _queryId, id: _id, data: _data };
}

function storeTupleReportData(source: ReportData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.id);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserReportData(): DictionaryValue<ReportData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportData(src)).endCell());
        },
        parse: (src) => {
            return loadReportData(src.loadRef().beginParse());
        }
    }
}

export type SaveData = {
    $$type: 'SaveData';
    queryId: bigint;
    originalGasTo: Address;
    data: Cell;
}

export function storeSaveData(src: SaveData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2951296309, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.originalGasTo);
        b_0.storeRef(src.data);
    };
}

export function loadSaveData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2951296309) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _originalGasTo = sc_0.loadAddress();
    let _data = sc_0.loadRef();
    return { $$type: 'SaveData' as const, queryId: _queryId, originalGasTo: _originalGasTo, data: _data };
}

function loadTupleSaveData(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    let _data = source.readCell();
    return { $$type: 'SaveData' as const, queryId: _queryId, originalGasTo: _originalGasTo, data: _data };
}

function loadGetterTupleSaveData(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    let _data = source.readCell();
    return { $$type: 'SaveData' as const, queryId: _queryId, originalGasTo: _originalGasTo, data: _data };
}

function storeTupleSaveData(source: SaveData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.originalGasTo);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSaveData(): DictionaryValue<SaveData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSaveData(src)).endCell());
        },
        parse: (src) => {
            return loadSaveData(src.loadRef().beginParse());
        }
    }
}

export type DeleteData = {
    $$type: 'DeleteData';
    queryId: bigint;
    originalGasTo: Address;
}

export function storeDeleteData(src: DeleteData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3097733652, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.originalGasTo);
    };
}

export function loadDeleteData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3097733652) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _originalGasTo = sc_0.loadAddress();
    return { $$type: 'DeleteData' as const, queryId: _queryId, originalGasTo: _originalGasTo };
}

function loadTupleDeleteData(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    return { $$type: 'DeleteData' as const, queryId: _queryId, originalGasTo: _originalGasTo };
}

function loadGetterTupleDeleteData(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _originalGasTo = source.readAddress();
    return { $$type: 'DeleteData' as const, queryId: _queryId, originalGasTo: _originalGasTo };
}

function storeTupleDeleteData(source: DeleteData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.originalGasTo);
    return builder.build();
}

function dictValueParserDeleteData(): DictionaryValue<DeleteData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeleteData(src)).endCell());
        },
        parse: (src) => {
            return loadDeleteData(src.loadRef().beginParse());
        }
    }
}

export type LogEventMintRecord = {
    $$type: 'LogEventMintRecord';
    minter: Address;
    item_id: bigint;
    generate_number: bigint;
}

export function storeLogEventMintRecord(src: LogEventMintRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2743565669, 32);
        b_0.storeAddress(src.minter);
        b_0.storeInt(src.item_id, 257);
        b_0.storeInt(src.generate_number, 257);
    };
}

export function loadLogEventMintRecord(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2743565669) { throw Error('Invalid prefix'); }
    let _minter = sc_0.loadAddress();
    let _item_id = sc_0.loadIntBig(257);
    let _generate_number = sc_0.loadIntBig(257);
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function loadTupleLogEventMintRecord(source: TupleReader) {
    let _minter = source.readAddress();
    let _item_id = source.readBigNumber();
    let _generate_number = source.readBigNumber();
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function loadGetterTupleLogEventMintRecord(source: TupleReader) {
    let _minter = source.readAddress();
    let _item_id = source.readBigNumber();
    let _generate_number = source.readBigNumber();
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function storeTupleLogEventMintRecord(source: LogEventMintRecord) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.minter);
    builder.writeNumber(source.item_id);
    builder.writeNumber(source.generate_number);
    return builder.build();
}

function dictValueParserLogEventMintRecord(): DictionaryValue<LogEventMintRecord> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLogEventMintRecord(src)).endCell());
        },
        parse: (src) => {
            return loadLogEventMintRecord(src.loadRef().beginParse());
        }
    }
}

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    query_id: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadGetterTupleGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadGetterTupleReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    collection_content: Cell;
    owner_address: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.next_item_index, 257);
        b_0.storeRef(src.collection_content);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_item_index = sc_0.loadIntBig(257);
    let _collection_content = sc_0.loadRef();
    let _owner_address = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadGetterTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.collection_content);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    let _destination = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadGetterTupleRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Slice;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Slice;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadGetterTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadGetterTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    query_id: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadGetterTupleGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    query_id: bigint;
    index_id: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.index_id, 257);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index_id = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadGetterTupleReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index_id);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type GetOwner = {
    $$type: 'GetOwner';
    query_id: bigint;
}

export function storeGetOwner(src: GetOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3156669640, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3156669640) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetOwner' as const, query_id: _query_id };
}

function loadTupleGetOwner(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetOwner' as const, query_id: _query_id };
}

function loadGetterTupleGetOwner(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetOwner' as const, query_id: _query_id };
}

function storeTupleGetOwner(source: GetOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetOwner(): DictionaryValue<GetOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetOwner(src)).endCell());
        },
        parse: (src) => {
            return loadGetOwner(src.loadRef().beginParse());
        }
    }
}

export type ReportOwner = {
    $$type: 'ReportOwner';
    query_id: bigint;
    index_id: bigint;
    owner: Address;
}

export function storeReportOwner(src: ReportOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(704662021, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.index_id, 257);
        b_0.storeAddress(src.owner);
    };
}

export function loadReportOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 704662021) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index_id = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    return { $$type: 'ReportOwner' as const, query_id: _query_id, index_id: _index_id, owner: _owner };
}

function loadTupleReportOwner(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _owner = source.readAddress();
    return { $$type: 'ReportOwner' as const, query_id: _query_id, index_id: _index_id, owner: _owner };
}

function loadGetterTupleReportOwner(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _owner = source.readAddress();
    return { $$type: 'ReportOwner' as const, query_id: _query_id, index_id: _index_id, owner: _owner };
}

function storeTupleReportOwner(source: ReportOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index_id);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserReportOwner(): DictionaryValue<ReportOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportOwner(src)).endCell());
        },
        parse: (src) => {
            return loadReportOwner(src.loadRef().beginParse());
        }
    }
}

export type GetNftData = {
    $$type: 'GetNftData';
    is_initialized: boolean;
    index: bigint;
    collection_address: Address;
    owner_address: Address;
    individual_content: Cell;
}

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.is_initialized);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection_address);
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.individual_content);
    };
}

export function loadGetNftData(slice: Slice) {
    let sc_0 = slice;
    let _is_initialized = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadAddress();
    let _individual_content = sc_0.loadRef();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function loadTupleGetNftData(source: TupleReader) {
    let _is_initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _owner_address = source.readAddress();
    let _individual_content = source.readCell();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function loadGetterTupleGetNftData(source: TupleReader) {
    let _is_initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _owner_address = source.readAddress();
    let _individual_content = source.readCell();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function storeTupleGetNftData(source: GetNftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.is_initialized);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection_address);
    builder.writeAddress(source.owner_address);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserGetNftData(): DictionaryValue<GetNftData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetNftData(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftData(src.loadRef().beginParse());
        }
    }
}

export type DeployTokenMarket = {
    $$type: 'DeployTokenMarket';
    queryId: bigint;
    id: bigint;
    owner: Address;
    coin: Address;
    jettonWallet: Address;
    underlyingAssetName: string;
    duration: bigint;
    collection_content: Cell;
    operatorFee: bigint;
    serviceFee: bigint;
    oracle: Address;
    feedIdAsset: bigint;
    feedIdToken: bigint;
    operatorFeeAddress: Address;
    originalGasTo: Address;
}

export function storeDeployTokenMarket(src: DeployTokenMarket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3133287539, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.coin);
        b_0.storeAddress(src.jettonWallet);
        b_0.storeStringRefTail(src.underlyingAssetName);
        b_0.storeUint(src.duration, 32);
        b_0.storeRef(src.collection_content);
        let b_1 = new Builder();
        b_1.storeCoins(src.operatorFee);
        b_1.storeCoins(src.serviceFee);
        b_1.storeAddress(src.oracle);
        b_1.storeUint(src.feedIdAsset, 256);
        let b_2 = new Builder();
        b_2.storeUint(src.feedIdToken, 256);
        b_2.storeAddress(src.operatorFeeAddress);
        b_2.storeAddress(src.originalGasTo);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeployTokenMarket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3133287539) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _id = sc_0.loadUintBig(32);
    let _owner = sc_0.loadAddress();
    let _coin = sc_0.loadAddress();
    let _jettonWallet = sc_0.loadAddress();
    let _underlyingAssetName = sc_0.loadStringRefTail();
    let _duration = sc_0.loadUintBig(32);
    let _collection_content = sc_0.loadRef();
    let sc_1 = sc_0.loadRef().beginParse();
    let _operatorFee = sc_1.loadCoins();
    let _serviceFee = sc_1.loadCoins();
    let _oracle = sc_1.loadAddress();
    let _feedIdAsset = sc_1.loadUintBig(256);
    let sc_2 = sc_1.loadRef().beginParse();
    let _feedIdToken = sc_2.loadUintBig(256);
    let _operatorFeeAddress = sc_2.loadAddress();
    let _originalGasTo = sc_2.loadAddress();
    return { $$type: 'DeployTokenMarket' as const, queryId: _queryId, id: _id, owner: _owner, coin: _coin, jettonWallet: _jettonWallet, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress, originalGasTo: _originalGasTo };
}

function loadTupleDeployTokenMarket(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _coin = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    let _originalGasTo = source.readAddress();
    return { $$type: 'DeployTokenMarket' as const, queryId: _queryId, id: _id, owner: _owner, coin: _coin, jettonWallet: _jettonWallet, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress, originalGasTo: _originalGasTo };
}

function loadGetterTupleDeployTokenMarket(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _coin = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    let _originalGasTo = source.readAddress();
    return { $$type: 'DeployTokenMarket' as const, queryId: _queryId, id: _id, owner: _owner, coin: _coin, jettonWallet: _jettonWallet, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress, originalGasTo: _originalGasTo };
}

function storeTupleDeployTokenMarket(source: DeployTokenMarket) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.coin);
    builder.writeAddress(source.jettonWallet);
    builder.writeString(source.underlyingAssetName);
    builder.writeNumber(source.duration);
    builder.writeCell(source.collection_content);
    builder.writeNumber(source.operatorFee);
    builder.writeNumber(source.serviceFee);
    builder.writeAddress(source.oracle);
    builder.writeNumber(source.feedIdAsset);
    builder.writeNumber(source.feedIdToken);
    builder.writeAddress(source.operatorFeeAddress);
    builder.writeAddress(source.originalGasTo);
    return builder.build();
}

function dictValueParserDeployTokenMarket(): DictionaryValue<DeployTokenMarket> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployTokenMarket(src)).endCell());
        },
        parse: (src) => {
            return loadDeployTokenMarket(src.loadRef().beginParse());
        }
    }
}

export type MarketDeployedEvent = {
    $$type: 'MarketDeployedEvent';
    queryId: bigint;
    marketAddress: Address;
    id: bigint;
    owner: Address;
    coin: Address;
    jettonWallet: Address;
    underlyingAssetName: string;
    duration: bigint;
    collection_content: Cell;
    operatorFee: bigint;
    serviceFee: bigint;
    oracle: Address;
    feedIdAsset: bigint;
    feedIdToken: bigint;
    operatorFeeAddress: Address;
}

export function storeMarketDeployedEvent(src: MarketDeployedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4087132332, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.marketAddress);
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.coin);
        let b_1 = new Builder();
        b_1.storeAddress(src.jettonWallet);
        b_1.storeStringRefTail(src.underlyingAssetName);
        b_1.storeUint(src.duration, 32);
        b_1.storeRef(src.collection_content);
        b_1.storeCoins(src.operatorFee);
        b_1.storeCoins(src.serviceFee);
        b_1.storeAddress(src.oracle);
        let b_2 = new Builder();
        b_2.storeUint(src.feedIdAsset, 256);
        b_2.storeUint(src.feedIdToken, 256);
        b_2.storeAddress(src.operatorFeeAddress);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarketDeployedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4087132332) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _marketAddress = sc_0.loadAddress();
    let _id = sc_0.loadUintBig(32);
    let _owner = sc_0.loadAddress();
    let _coin = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _jettonWallet = sc_1.loadAddress();
    let _underlyingAssetName = sc_1.loadStringRefTail();
    let _duration = sc_1.loadUintBig(32);
    let _collection_content = sc_1.loadRef();
    let _operatorFee = sc_1.loadCoins();
    let _serviceFee = sc_1.loadCoins();
    let _oracle = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _feedIdAsset = sc_2.loadUintBig(256);
    let _feedIdToken = sc_2.loadUintBig(256);
    let _operatorFeeAddress = sc_2.loadAddress();
    return { $$type: 'MarketDeployedEvent' as const, queryId: _queryId, marketAddress: _marketAddress, id: _id, owner: _owner, coin: _coin, jettonWallet: _jettonWallet, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress };
}

function loadTupleMarketDeployedEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _marketAddress = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _coin = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    return { $$type: 'MarketDeployedEvent' as const, queryId: _queryId, marketAddress: _marketAddress, id: _id, owner: _owner, coin: _coin, jettonWallet: _jettonWallet, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress };
}

function loadGetterTupleMarketDeployedEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _marketAddress = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _coin = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    return { $$type: 'MarketDeployedEvent' as const, queryId: _queryId, marketAddress: _marketAddress, id: _id, owner: _owner, coin: _coin, jettonWallet: _jettonWallet, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress };
}

function storeTupleMarketDeployedEvent(source: MarketDeployedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.marketAddress);
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.coin);
    builder.writeAddress(source.jettonWallet);
    builder.writeString(source.underlyingAssetName);
    builder.writeNumber(source.duration);
    builder.writeCell(source.collection_content);
    builder.writeNumber(source.operatorFee);
    builder.writeNumber(source.serviceFee);
    builder.writeAddress(source.oracle);
    builder.writeNumber(source.feedIdAsset);
    builder.writeNumber(source.feedIdToken);
    builder.writeAddress(source.operatorFeeAddress);
    return builder.build();
}

function dictValueParserMarketDeployedEvent(): DictionaryValue<MarketDeployedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarketDeployedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadMarketDeployedEvent(src.loadRef().beginParse());
        }
    }
}

export type DeployTokenMarketWithAmm = {
    $$type: 'DeployTokenMarketWithAmm';
    queryId: bigint;
    id: bigint;
    owner: Address;
    coin: Address;
    jettonWallet: Address;
    jettonWalletAmm: Address;
    underlyingAssetName: string;
    duration: bigint;
    collection_content: Cell;
    operatorFee: bigint;
    serviceFee: bigint;
    oracle: Address;
    feedIdAsset: bigint;
    feedIdToken: bigint;
    operatorFeeAddress: Address;
    originalGasTo: Address;
}

export function storeDeployTokenMarketWithAmm(src: DeployTokenMarketWithAmm) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1684562987, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.coin);
        b_0.storeAddress(src.jettonWallet);
        let b_1 = new Builder();
        b_1.storeAddress(src.jettonWalletAmm);
        b_1.storeStringRefTail(src.underlyingAssetName);
        b_1.storeUint(src.duration, 32);
        b_1.storeRef(src.collection_content);
        b_1.storeCoins(src.operatorFee);
        b_1.storeCoins(src.serviceFee);
        b_1.storeAddress(src.oracle);
        let b_2 = new Builder();
        b_2.storeUint(src.feedIdAsset, 256);
        b_2.storeUint(src.feedIdToken, 256);
        b_2.storeAddress(src.operatorFeeAddress);
        let b_3 = new Builder();
        b_3.storeAddress(src.originalGasTo);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeployTokenMarketWithAmm(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1684562987) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _id = sc_0.loadUintBig(32);
    let _owner = sc_0.loadAddress();
    let _coin = sc_0.loadAddress();
    let _jettonWallet = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _jettonWalletAmm = sc_1.loadAddress();
    let _underlyingAssetName = sc_1.loadStringRefTail();
    let _duration = sc_1.loadUintBig(32);
    let _collection_content = sc_1.loadRef();
    let _operatorFee = sc_1.loadCoins();
    let _serviceFee = sc_1.loadCoins();
    let _oracle = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _feedIdAsset = sc_2.loadUintBig(256);
    let _feedIdToken = sc_2.loadUintBig(256);
    let _operatorFeeAddress = sc_2.loadAddress();
    let sc_3 = sc_2.loadRef().beginParse();
    let _originalGasTo = sc_3.loadAddress();
    return { $$type: 'DeployTokenMarketWithAmm' as const, queryId: _queryId, id: _id, owner: _owner, coin: _coin, jettonWallet: _jettonWallet, jettonWalletAmm: _jettonWalletAmm, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress, originalGasTo: _originalGasTo };
}

function loadTupleDeployTokenMarketWithAmm(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _coin = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _jettonWalletAmm = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    source = source.readTuple();
    let _operatorFeeAddress = source.readAddress();
    let _originalGasTo = source.readAddress();
    return { $$type: 'DeployTokenMarketWithAmm' as const, queryId: _queryId, id: _id, owner: _owner, coin: _coin, jettonWallet: _jettonWallet, jettonWalletAmm: _jettonWalletAmm, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress, originalGasTo: _originalGasTo };
}

function loadGetterTupleDeployTokenMarketWithAmm(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _coin = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _jettonWalletAmm = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    let _originalGasTo = source.readAddress();
    return { $$type: 'DeployTokenMarketWithAmm' as const, queryId: _queryId, id: _id, owner: _owner, coin: _coin, jettonWallet: _jettonWallet, jettonWalletAmm: _jettonWalletAmm, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress, originalGasTo: _originalGasTo };
}

function storeTupleDeployTokenMarketWithAmm(source: DeployTokenMarketWithAmm) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.coin);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.jettonWalletAmm);
    builder.writeString(source.underlyingAssetName);
    builder.writeNumber(source.duration);
    builder.writeCell(source.collection_content);
    builder.writeNumber(source.operatorFee);
    builder.writeNumber(source.serviceFee);
    builder.writeAddress(source.oracle);
    builder.writeNumber(source.feedIdAsset);
    builder.writeNumber(source.feedIdToken);
    builder.writeAddress(source.operatorFeeAddress);
    builder.writeAddress(source.originalGasTo);
    return builder.build();
}

function dictValueParserDeployTokenMarketWithAmm(): DictionaryValue<DeployTokenMarketWithAmm> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployTokenMarketWithAmm(src)).endCell());
        },
        parse: (src) => {
            return loadDeployTokenMarketWithAmm(src.loadRef().beginParse());
        }
    }
}

export type MarketDeployedEventWithAmm = {
    $$type: 'MarketDeployedEventWithAmm';
    queryId: bigint;
    marketAddress: Address;
    id: bigint;
    owner: Address;
    coin: Address;
    amm: Address;
    jettonWallet: Address;
    jettonWalletAmm: Address;
    underlyingAssetName: string;
    duration: bigint;
    collection_content: Cell;
    operatorFee: bigint;
    serviceFee: bigint;
    oracle: Address;
    feedIdAsset: bigint;
    feedIdToken: bigint;
    operatorFeeAddress: Address;
}

export function storeMarketDeployedEventWithAmm(src: MarketDeployedEventWithAmm) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3042373849, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.marketAddress);
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.coin);
        let b_1 = new Builder();
        b_1.storeAddress(src.amm);
        b_1.storeAddress(src.jettonWallet);
        b_1.storeAddress(src.jettonWalletAmm);
        b_1.storeStringRefTail(src.underlyingAssetName);
        b_1.storeUint(src.duration, 32);
        b_1.storeRef(src.collection_content);
        b_1.storeCoins(src.operatorFee);
        let b_2 = new Builder();
        b_2.storeCoins(src.serviceFee);
        b_2.storeAddress(src.oracle);
        b_2.storeUint(src.feedIdAsset, 256);
        b_2.storeUint(src.feedIdToken, 256);
        let b_3 = new Builder();
        b_3.storeAddress(src.operatorFeeAddress);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarketDeployedEventWithAmm(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3042373849) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _marketAddress = sc_0.loadAddress();
    let _id = sc_0.loadUintBig(32);
    let _owner = sc_0.loadAddress();
    let _coin = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _amm = sc_1.loadAddress();
    let _jettonWallet = sc_1.loadAddress();
    let _jettonWalletAmm = sc_1.loadAddress();
    let _underlyingAssetName = sc_1.loadStringRefTail();
    let _duration = sc_1.loadUintBig(32);
    let _collection_content = sc_1.loadRef();
    let _operatorFee = sc_1.loadCoins();
    let sc_2 = sc_1.loadRef().beginParse();
    let _serviceFee = sc_2.loadCoins();
    let _oracle = sc_2.loadAddress();
    let _feedIdAsset = sc_2.loadUintBig(256);
    let _feedIdToken = sc_2.loadUintBig(256);
    let sc_3 = sc_2.loadRef().beginParse();
    let _operatorFeeAddress = sc_3.loadAddress();
    return { $$type: 'MarketDeployedEventWithAmm' as const, queryId: _queryId, marketAddress: _marketAddress, id: _id, owner: _owner, coin: _coin, amm: _amm, jettonWallet: _jettonWallet, jettonWalletAmm: _jettonWalletAmm, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress };
}

function loadTupleMarketDeployedEventWithAmm(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _marketAddress = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _coin = source.readAddress();
    let _amm = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _jettonWalletAmm = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    source = source.readTuple();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    return { $$type: 'MarketDeployedEventWithAmm' as const, queryId: _queryId, marketAddress: _marketAddress, id: _id, owner: _owner, coin: _coin, amm: _amm, jettonWallet: _jettonWallet, jettonWalletAmm: _jettonWalletAmm, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress };
}

function loadGetterTupleMarketDeployedEventWithAmm(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _marketAddress = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _coin = source.readAddress();
    let _amm = source.readAddress();
    let _jettonWallet = source.readAddress();
    let _jettonWalletAmm = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    return { $$type: 'MarketDeployedEventWithAmm' as const, queryId: _queryId, marketAddress: _marketAddress, id: _id, owner: _owner, coin: _coin, amm: _amm, jettonWallet: _jettonWallet, jettonWalletAmm: _jettonWalletAmm, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress };
}

function storeTupleMarketDeployedEventWithAmm(source: MarketDeployedEventWithAmm) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.marketAddress);
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.coin);
    builder.writeAddress(source.amm);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.jettonWalletAmm);
    builder.writeString(source.underlyingAssetName);
    builder.writeNumber(source.duration);
    builder.writeCell(source.collection_content);
    builder.writeNumber(source.operatorFee);
    builder.writeNumber(source.serviceFee);
    builder.writeAddress(source.oracle);
    builder.writeNumber(source.feedIdAsset);
    builder.writeNumber(source.feedIdToken);
    builder.writeAddress(source.operatorFeeAddress);
    return builder.build();
}

function dictValueParserMarketDeployedEventWithAmm(): DictionaryValue<MarketDeployedEventWithAmm> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarketDeployedEventWithAmm(src)).endCell());
        },
        parse: (src) => {
            return loadMarketDeployedEventWithAmm(src.loadRef().beginParse());
        }
    }
}

export type DeployTonMarket = {
    $$type: 'DeployTonMarket';
    queryId: bigint;
    id: bigint;
    owner: Address;
    underlyingAssetName: string;
    duration: bigint;
    collection_content: Cell;
    operatorFee: bigint;
    serviceFee: bigint;
    oracle: Address;
    feedIdAsset: bigint;
    feedIdToken: bigint;
    operatorFeeAddress: Address;
    originalGasTo: Address;
}

export function storeDeployTonMarket(src: DeployTonMarket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4267639384, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.owner);
        b_0.storeStringRefTail(src.underlyingAssetName);
        b_0.storeUint(src.duration, 32);
        b_0.storeRef(src.collection_content);
        b_0.storeCoins(src.operatorFee);
        b_0.storeCoins(src.serviceFee);
        b_0.storeAddress(src.oracle);
        let b_1 = new Builder();
        b_1.storeUint(src.feedIdAsset, 256);
        b_1.storeUint(src.feedIdToken, 256);
        b_1.storeAddress(src.operatorFeeAddress);
        let b_2 = new Builder();
        b_2.storeAddress(src.originalGasTo);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeployTonMarket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4267639384) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _id = sc_0.loadUintBig(32);
    let _owner = sc_0.loadAddress();
    let _underlyingAssetName = sc_0.loadStringRefTail();
    let _duration = sc_0.loadUintBig(32);
    let _collection_content = sc_0.loadRef();
    let _operatorFee = sc_0.loadCoins();
    let _serviceFee = sc_0.loadCoins();
    let _oracle = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _feedIdAsset = sc_1.loadUintBig(256);
    let _feedIdToken = sc_1.loadUintBig(256);
    let _operatorFeeAddress = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _originalGasTo = sc_2.loadAddress();
    return { $$type: 'DeployTonMarket' as const, queryId: _queryId, id: _id, owner: _owner, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress, originalGasTo: _originalGasTo };
}

function loadTupleDeployTonMarket(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    let _originalGasTo = source.readAddress();
    return { $$type: 'DeployTonMarket' as const, queryId: _queryId, id: _id, owner: _owner, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress, originalGasTo: _originalGasTo };
}

function loadGetterTupleDeployTonMarket(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    let _originalGasTo = source.readAddress();
    return { $$type: 'DeployTonMarket' as const, queryId: _queryId, id: _id, owner: _owner, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress, originalGasTo: _originalGasTo };
}

function storeTupleDeployTonMarket(source: DeployTonMarket) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeString(source.underlyingAssetName);
    builder.writeNumber(source.duration);
    builder.writeCell(source.collection_content);
    builder.writeNumber(source.operatorFee);
    builder.writeNumber(source.serviceFee);
    builder.writeAddress(source.oracle);
    builder.writeNumber(source.feedIdAsset);
    builder.writeNumber(source.feedIdToken);
    builder.writeAddress(source.operatorFeeAddress);
    builder.writeAddress(source.originalGasTo);
    return builder.build();
}

function dictValueParserDeployTonMarket(): DictionaryValue<DeployTonMarket> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployTonMarket(src)).endCell());
        },
        parse: (src) => {
            return loadDeployTonMarket(src.loadRef().beginParse());
        }
    }
}

export type MarketTonDeployedEvent = {
    $$type: 'MarketTonDeployedEvent';
    queryId: bigint;
    marketAddress: Address;
    id: bigint;
    owner: Address;
    underlyingAssetName: string;
    duration: bigint;
    collection_content: Cell;
    operatorFee: bigint;
    serviceFee: bigint;
    oracle: Address;
    feedIdAsset: bigint;
    feedIdToken: bigint;
    operatorFeeAddress: Address;
}

export function storeMarketTonDeployedEvent(src: MarketTonDeployedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4135699990, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.marketAddress);
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.owner);
        b_0.storeStringRefTail(src.underlyingAssetName);
        b_0.storeUint(src.duration, 32);
        b_0.storeRef(src.collection_content);
        b_0.storeCoins(src.operatorFee);
        b_0.storeCoins(src.serviceFee);
        let b_1 = new Builder();
        b_1.storeAddress(src.oracle);
        b_1.storeUint(src.feedIdAsset, 256);
        b_1.storeUint(src.feedIdToken, 256);
        let b_2 = new Builder();
        b_2.storeAddress(src.operatorFeeAddress);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarketTonDeployedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4135699990) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _marketAddress = sc_0.loadAddress();
    let _id = sc_0.loadUintBig(32);
    let _owner = sc_0.loadAddress();
    let _underlyingAssetName = sc_0.loadStringRefTail();
    let _duration = sc_0.loadUintBig(32);
    let _collection_content = sc_0.loadRef();
    let _operatorFee = sc_0.loadCoins();
    let _serviceFee = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _oracle = sc_1.loadAddress();
    let _feedIdAsset = sc_1.loadUintBig(256);
    let _feedIdToken = sc_1.loadUintBig(256);
    let sc_2 = sc_1.loadRef().beginParse();
    let _operatorFeeAddress = sc_2.loadAddress();
    return { $$type: 'MarketTonDeployedEvent' as const, queryId: _queryId, marketAddress: _marketAddress, id: _id, owner: _owner, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress };
}

function loadTupleMarketTonDeployedEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _marketAddress = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    return { $$type: 'MarketTonDeployedEvent' as const, queryId: _queryId, marketAddress: _marketAddress, id: _id, owner: _owner, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress };
}

function loadGetterTupleMarketTonDeployedEvent(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _marketAddress = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    return { $$type: 'MarketTonDeployedEvent' as const, queryId: _queryId, marketAddress: _marketAddress, id: _id, owner: _owner, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress };
}

function storeTupleMarketTonDeployedEvent(source: MarketTonDeployedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.marketAddress);
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeString(source.underlyingAssetName);
    builder.writeNumber(source.duration);
    builder.writeCell(source.collection_content);
    builder.writeNumber(source.operatorFee);
    builder.writeNumber(source.serviceFee);
    builder.writeAddress(source.oracle);
    builder.writeNumber(source.feedIdAsset);
    builder.writeNumber(source.feedIdToken);
    builder.writeAddress(source.operatorFeeAddress);
    return builder.build();
}

function dictValueParserMarketTonDeployedEvent(): DictionaryValue<MarketTonDeployedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarketTonDeployedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadMarketTonDeployedEvent(src.loadRef().beginParse());
        }
    }
}

export type DeployTonMarketWithAmm = {
    $$type: 'DeployTonMarketWithAmm';
    queryId: bigint;
    id: bigint;
    owner: Address;
    underlyingAssetName: string;
    duration: bigint;
    collection_content: Cell;
    operatorFee: bigint;
    serviceFee: bigint;
    oracle: Address;
    feedIdAsset: bigint;
    feedIdToken: bigint;
    operatorFeeAddress: Address;
    originalGasTo: Address;
}

export function storeDeployTonMarketWithAmm(src: DeployTonMarketWithAmm) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2976600156, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.owner);
        b_0.storeStringRefTail(src.underlyingAssetName);
        b_0.storeUint(src.duration, 32);
        b_0.storeRef(src.collection_content);
        b_0.storeCoins(src.operatorFee);
        b_0.storeCoins(src.serviceFee);
        b_0.storeAddress(src.oracle);
        let b_1 = new Builder();
        b_1.storeUint(src.feedIdAsset, 256);
        b_1.storeUint(src.feedIdToken, 256);
        b_1.storeAddress(src.operatorFeeAddress);
        let b_2 = new Builder();
        b_2.storeAddress(src.originalGasTo);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDeployTonMarketWithAmm(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2976600156) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _id = sc_0.loadUintBig(32);
    let _owner = sc_0.loadAddress();
    let _underlyingAssetName = sc_0.loadStringRefTail();
    let _duration = sc_0.loadUintBig(32);
    let _collection_content = sc_0.loadRef();
    let _operatorFee = sc_0.loadCoins();
    let _serviceFee = sc_0.loadCoins();
    let _oracle = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _feedIdAsset = sc_1.loadUintBig(256);
    let _feedIdToken = sc_1.loadUintBig(256);
    let _operatorFeeAddress = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _originalGasTo = sc_2.loadAddress();
    return { $$type: 'DeployTonMarketWithAmm' as const, queryId: _queryId, id: _id, owner: _owner, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress, originalGasTo: _originalGasTo };
}

function loadTupleDeployTonMarketWithAmm(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    let _originalGasTo = source.readAddress();
    return { $$type: 'DeployTonMarketWithAmm' as const, queryId: _queryId, id: _id, owner: _owner, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress, originalGasTo: _originalGasTo };
}

function loadGetterTupleDeployTonMarketWithAmm(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    let _originalGasTo = source.readAddress();
    return { $$type: 'DeployTonMarketWithAmm' as const, queryId: _queryId, id: _id, owner: _owner, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress, originalGasTo: _originalGasTo };
}

function storeTupleDeployTonMarketWithAmm(source: DeployTonMarketWithAmm) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeString(source.underlyingAssetName);
    builder.writeNumber(source.duration);
    builder.writeCell(source.collection_content);
    builder.writeNumber(source.operatorFee);
    builder.writeNumber(source.serviceFee);
    builder.writeAddress(source.oracle);
    builder.writeNumber(source.feedIdAsset);
    builder.writeNumber(source.feedIdToken);
    builder.writeAddress(source.operatorFeeAddress);
    builder.writeAddress(source.originalGasTo);
    return builder.build();
}

function dictValueParserDeployTonMarketWithAmm(): DictionaryValue<DeployTonMarketWithAmm> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployTonMarketWithAmm(src)).endCell());
        },
        parse: (src) => {
            return loadDeployTonMarketWithAmm(src.loadRef().beginParse());
        }
    }
}

export type MarketTonDeployedEventWithAmm = {
    $$type: 'MarketTonDeployedEventWithAmm';
    queryId: bigint;
    marketAddress: Address;
    id: bigint;
    owner: Address;
    amm: Address;
    underlyingAssetName: string;
    duration: bigint;
    collection_content: Cell;
    operatorFee: bigint;
    serviceFee: bigint;
    oracle: Address;
    feedIdAsset: bigint;
    feedIdToken: bigint;
    operatorFeeAddress: Address;
}

export function storeMarketTonDeployedEventWithAmm(src: MarketTonDeployedEventWithAmm) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(158221594, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.marketAddress);
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.amm);
        b_0.storeStringRefTail(src.underlyingAssetName);
        b_0.storeUint(src.duration, 32);
        b_0.storeRef(src.collection_content);
        let b_1 = new Builder();
        b_1.storeCoins(src.operatorFee);
        b_1.storeCoins(src.serviceFee);
        b_1.storeAddress(src.oracle);
        b_1.storeUint(src.feedIdAsset, 256);
        let b_2 = new Builder();
        b_2.storeUint(src.feedIdToken, 256);
        b_2.storeAddress(src.operatorFeeAddress);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadMarketTonDeployedEventWithAmm(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 158221594) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _marketAddress = sc_0.loadAddress();
    let _id = sc_0.loadUintBig(32);
    let _owner = sc_0.loadAddress();
    let _amm = sc_0.loadAddress();
    let _underlyingAssetName = sc_0.loadStringRefTail();
    let _duration = sc_0.loadUintBig(32);
    let _collection_content = sc_0.loadRef();
    let sc_1 = sc_0.loadRef().beginParse();
    let _operatorFee = sc_1.loadCoins();
    let _serviceFee = sc_1.loadCoins();
    let _oracle = sc_1.loadAddress();
    let _feedIdAsset = sc_1.loadUintBig(256);
    let sc_2 = sc_1.loadRef().beginParse();
    let _feedIdToken = sc_2.loadUintBig(256);
    let _operatorFeeAddress = sc_2.loadAddress();
    return { $$type: 'MarketTonDeployedEventWithAmm' as const, queryId: _queryId, marketAddress: _marketAddress, id: _id, owner: _owner, amm: _amm, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress };
}

function loadTupleMarketTonDeployedEventWithAmm(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _marketAddress = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _amm = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    return { $$type: 'MarketTonDeployedEventWithAmm' as const, queryId: _queryId, marketAddress: _marketAddress, id: _id, owner: _owner, amm: _amm, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress };
}

function loadGetterTupleMarketTonDeployedEventWithAmm(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _marketAddress = source.readAddress();
    let _id = source.readBigNumber();
    let _owner = source.readAddress();
    let _amm = source.readAddress();
    let _underlyingAssetName = source.readString();
    let _duration = source.readBigNumber();
    let _collection_content = source.readCell();
    let _operatorFee = source.readBigNumber();
    let _serviceFee = source.readBigNumber();
    let _oracle = source.readAddress();
    let _feedIdAsset = source.readBigNumber();
    let _feedIdToken = source.readBigNumber();
    let _operatorFeeAddress = source.readAddress();
    return { $$type: 'MarketTonDeployedEventWithAmm' as const, queryId: _queryId, marketAddress: _marketAddress, id: _id, owner: _owner, amm: _amm, underlyingAssetName: _underlyingAssetName, duration: _duration, collection_content: _collection_content, operatorFee: _operatorFee, serviceFee: _serviceFee, oracle: _oracle, feedIdAsset: _feedIdAsset, feedIdToken: _feedIdToken, operatorFeeAddress: _operatorFeeAddress };
}

function storeTupleMarketTonDeployedEventWithAmm(source: MarketTonDeployedEventWithAmm) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.marketAddress);
    builder.writeNumber(source.id);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.amm);
    builder.writeString(source.underlyingAssetName);
    builder.writeNumber(source.duration);
    builder.writeCell(source.collection_content);
    builder.writeNumber(source.operatorFee);
    builder.writeNumber(source.serviceFee);
    builder.writeAddress(source.oracle);
    builder.writeNumber(source.feedIdAsset);
    builder.writeNumber(source.feedIdToken);
    builder.writeAddress(source.operatorFeeAddress);
    return builder.build();
}

function dictValueParserMarketTonDeployedEventWithAmm(): DictionaryValue<MarketTonDeployedEventWithAmm> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMarketTonDeployedEventWithAmm(src)).endCell());
        },
        parse: (src) => {
            return loadMarketTonDeployedEventWithAmm(src.loadRef().beginParse());
        }
    }
}

export type Factory$Data = {
    $$type: 'Factory$Data';
    id: bigint;
}

export function storeFactory$Data(src: Factory$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 32);
    };
}

export function loadFactory$Data(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(32);
    return { $$type: 'Factory$Data' as const, id: _id };
}

function loadTupleFactory$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    return { $$type: 'Factory$Data' as const, id: _id };
}

function loadGetterTupleFactory$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    return { $$type: 'Factory$Data' as const, id: _id };
}

function storeTupleFactory$Data(source: Factory$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    return builder.build();
}

function dictValueParserFactory$Data(): DictionaryValue<Factory$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactory$Data(src)).endCell());
        },
        parse: (src) => {
            return loadFactory$Data(src.loadRef().beginParse());
        }
    }
}

 type Factory_init_args = {
    $$type: 'Factory_init_args';
    id: bigint;
}

function initFactory_init_args(src: Factory_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
    };
}

async function Factory_init(id: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('te6cckICAekAAQAAbggAAAEBwAABAgEgAAIBCwIBIAADAMkCASAABACNAQW2uJAABQEU/wD0pBP0vPLICwAGAgFiAAcAVAPu0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA5VHds88uCCyPhDAcx/AcoAERQRExESEREREFXg2zzJ7VQAhwAIAFIE9O2i7fsBj2mAINchcCHXScIflTAg1wsf3iCCEOYB+OW6jhww0x8BghDmAfjluvLggdM/ATFQCIEBAfRaMAd/4IIQvCb0yLqOlNMfAYIQvCb0yLry4IHTPwEx2zx/4NMfAYIL35Squo6E0z/bPJEw4n/gcCHXScIf4wAgAAkACgETAAsAElAIgQEB9FowBwAUMFAIgQEB9FowBwT2ghCgshrjuo7cMNMfAYIQoLIa47ry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBIjghAF9eEAoHD7AnCDBnAEyAGCEK/5D1dYyx/LP8kQNEEwFEMwbW3bPH/gIIIQ6QzQm7rjAiCCENMhLxO64wIgAdQADAAPABEBcDDTHwGCEOkM0Ju68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwT2zx/AA0C7DIRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFNs8ggCeHFYVwgDy9IIArPZWFSS78vQCVhShAVYUoSABYwAOAqaCEAX14QCgcPsCAREVAREUcXBVIG1tbds8+EJwgwZ/VSBtbW3bPBERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNUQwEgHUAdQBajDTHwGCENMhLxO68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwTABACnjL4QW8kECNfAyOCAMlnAscF8vSCAJ4cIcIA8vSCAOnbUxa78vRRVaFRNaEgghAF9eEAoHD7AgVxcFUgbW1t2zz4QnCDBn9VIG1tbds8E38B1AHUBKaCEPK6AFK6jxkw0x8BghDyugBSuvLggdM/2zwQiWwZ2zx/4CCCEOerVqC6jp0w0x8BghDnq1aguvLggdM/0x/U1FUgEDRsFNs8f+AgghAmKpz3ugEhABIAGwAdBOoqghAF9eEAoHD7AhETERwRExESERsREhERERoREREQERkREA8RGA8OERcODREWDQwRFQwLERQLChEcCgkRGwkIERoIBxEZBwYRGAYFERcFBBEWBAMRFQMCERQCAREcAREb2zz4QW8kMDKBPruJVhXHBZFw4w0ATAATABQAFQBDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAOIoIK+vCAvgHEkX+YIoIQEeGjAL7i8vQRFREeERURFBEdERQRExEcERMREhEbERIREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoREwoJERIJCBERCAcREAcQbxBeEE0QPBAr2zwAFgL2VhVTmKgoqCaogjAEIsqLCgCkJaoYqQRSqqgoqIIoI4byb8EAAKkEUAmgIIIK+vCAoBO5joVskXLbPOARExEeERMREhEdERIREREcEREREBEbERAPERoPDhEZDg0RGA0MERcMCxEWCwoRFQoJERQJCBEeCAcRHQcGERwGADwAFwP6BREbBQQRGgQDERkDAhEYAgERFwERFlYX2zwKpI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFYSxwWzlFcYVxjjDXD4I/gjAREcoFRxESARGLMQWgkRIgkIESAIBxEeB3FWHAgHESEHAhEaAlYcAgERGwEAPgAYABkCgIIQDuaygHB/ERwgbvLQgBEbIG7y0IBWIAJWGQJWHAJWHAIBER8BEEXIVVDbPMlWE0MUAhEbAhEcARRDMG1t2zwBJAHUAfwNVaFWHAFWJQFWHwERIchVMIIJCKtLUAXLHxPLP8sfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AsnIgljAAAAAAAAAAAAAAAABActnzMlw+wARGREkERkRGBEjERgRFxEiERcRFhEhERYRFREgERURFBEfERQAGgGcERMRHhETERIRHRESERERHBERERMRGxETDxEaDw4RGQ4NERgNERYRFxEWDhEWDg4RFQ4OERQODxETDw4REg4REBERERAPERAPEN9VHNs8AVkC7CWCEAX14QCgcPsCERMRFxETERIRFhESERERFRERERARFBEQDxEXDw4RFg4NERUNDBEUDAsRFwsKERYKCREVCQgRFAgHERcHBhEWBgURFQUEERQEAxEXAwIRFgIBERUBERTbPPhBbyQwMoE+uyKCEA7msoC+8vQATAAcAZYRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqIBBqEFkQSBA32zwAHgP6ju8w0x8BghAmKpz3uvLggdM/+gDTH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1NRVMBBGEEVsFieCEAX14QCgcPsC+EFvJDAyggCuj1YaIscF8vSBPrsCghAO5rKAvhLy9EREVSLbPH/gIIIQgSdj/rrjAiAAHgAfACIBrsh6AcsHQ2bIVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AhLLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJUAPMyRLbPAAlATAw0x8BghCBJ2P+uvLggdM/0x9ZbBLbPH8AIAL2I4IQBfXhAKBw+wIRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFNs8+EFvJDCBPrszggr68IC+EvL0yIAVAcsHAEwAIQHKAcgBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHMyREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNUQw2zwAUQT6ghDpYm+6uo6bMNMfAYIQ6WJvurry4IHTP9Mf1NRVMGwU2zx/4CCCECoASgW6jrsw0x8BghAqAEoFuvLggdM/gQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBsE9s8f+AgghC2h6sXuuMCIIIQIv++t7oAIwAnACkARgL0JYIQBfXhAKBw+wIRExEXERMREhEWERIREREVEREREBEUERAPERcPDhEWDg0RFQ0MERQMCxEXCwoRFgoJERUJCBEUCAcRFwcGERYGBREVBQQRFAQDERcDAhEWAgERFQERFNs8+EFvJDCBPrszghAO5rKAvhLy9MiADAEATAAkAdrLBxEYyFlZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wyx/JAREXzMkRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RlBBQNs8ACUBVoEOFyyBAQEmWfQNb6GSMG3fbvL0G4EBAVJCIG6VMFn0WjCUQTP0FeIK2zwAJgFQAdAB0NMfMcgC0x8Dyx8Tyz8BzxYBzxbIyQHMyXCDBikDf1UwbW3bPAHUAtj4QW8kECNfA/hD+ChBBNs8AYE3SgJwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFADxwUS8vQpgQEBI1n0DW+hkjBt39ABogAoAqb6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSAtEBUDuBAQH0WjBRQqEgghAF9eEAoHD7AgJxf1UgbW1t2zwIcIEAgn9VIG1tbds8FwHUAdQBNDDTHwGCELaHqxe68uCB0z/TH9RVIGwT2zx/ACoD9PhBbyT4Q/goUnDbPAGCAL2eAnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIJMcF8vQE0Ns8VhuBAQFWFVn0DW+hkjBt3yBu8tCA0FYUAREdgQEBAW4BMgArA+z0WjARHNMHIcAUj2ghwBWOqzHUMA4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGwQWxBKEDlIFkAH2zyOtQHAFo6q1DAOERQODRETDQwREgwLERELChEQChCfEI4QfRBsEFsQShA5SBZAB9s8lF8PXwbi4uMNACwALgA4AvRsQgLQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHRUwPHBbOOlFcQPl8NI4IQBfXhAKBw+wIBeNs84FRxIy3IVTCCEMs0Uh1QBcsfE8s/yx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCyQA8AC0BNsiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AALbPAAvA/ZsQgLQ2zxWFsABlC74I7uRcOKO1l8GVHEjLchVMIIQEW/BPFAFyx8Tyz/LHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gLJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAAts84D09PT4+Pj9WEYIQBfXhAKABOAAvADACWmxENDRsVYIA4l8GwAEW8vRRY6EgghAF9eEAoHD7AlBjcX9VIG1tbds8UELbPAHUAUUEqHD7Ag/AApQk+CO7kXDis46FXw132zzgC1YUvZI2f5QGVhK94o6FXwt22zzgIoEBLKFSgLmSN3+TUXK84o6FXwpz2zzgIYEBLKFSMLmTbCF/klm84gA8ADwAPAAxBK6OhV8Iets84CNwUggaoVADqIIQBfXhAKkEILYLI76fwgCUNSCqAJY3IKoABwXimjY3UwSgUhahBwXicFMIwgCSNzjjDSDCAJJbMuMNUKSgUIigJFRCNBoAPAAyADQANwH6U5O8jiNbU3GhVhmoghA7msoAqQRTgqFWGaiCEDuaygCpBFGRoSmhCd4RFREfERURFBEeERQRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEfCwoRHgoJER0JCBEcCAcRGwcGERoGBREZBQQRGAQAMwG8AxEXAwIRFgIBERsBER1WH1Yf2zwRExEdERMREhEcERIREREbEREREBEaERAPERkPDhEYDg0RFw0MERYMCxEVCwoRFAoJERMJCBESCAcREQcGERAGEF8QThA9TLoQVwA2Af5TAbyOIzU2UzWhVheoghA7msoAqQRSR6FWFqiCEDuaygCpBFFGoSShkTHiKKQRFhEdERYRFREcERURFBEbERQRExEaERMREhEZERIREREYEREREBEXERAPER0PDhEcDg0RGw0MERoMCxEZCwoRGAoJERcJCBEdCAcRHAcGERsGADUBnAURGgUEERkEAxEYAwIRGQJWHds8ERMRGhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH5VZgA2AbaBDhcsgQEBJFn0DW+hkjBt327y9BIBgQEBAshZWfoCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskiEDwBIG6VMFn0WjCUQTP0FeJQmYIQBA2ZANs8AUMBpMhVMIIQi204ElAFyx8Tyz/LHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gLJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsABVBm2zwBRQFWMdQwDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbBBbEEoQOUgWQAfbPAA5BIBQmF8GNDQ6LYIQBfXhAKBw+wIB0Ns8MFN5xwWOh18HbKJ42zzgERLDAY6HXwZsonfbPOADVhe9kjJ/lAJWFb3iAUkAPAA8ADoE4I6HXwRsonbbPOD4I4EBLKESuY6HXwNsonPbPOBToKhQD6iCKCOG8m/BAACpBFO5qIIQBfXhAKkEUsChUvC7jhFTuaiCEAX14QCpBFLAoFLwvpFw4o6HXwNsonTbPOBRIqEgggr68IC5lFMxxwWRcOIAPAA8ADwAOwP+kX+cIMEAlVMxxwWzkXDi4o6HXwNsonXbPOBRgqEgwQCOh18DbKJ52zzgUyChERQRIxEUERMRIhETERIRIRESERERIBERERARHxEQDxEeDw4RHQ4NERwNDBEbDAsRGgsKERkKCREYCQgRFwgHERYHBhEVBgURIwUEESIEAxEhAwA8ADwAPQEqMnCDBn8EyMsHyRA0QTAUQzBtbds8AdQEnAIRIAIBER8B2zxWHsIAjo5WFAERH3F/VSBtbW3bPJJXHuJWFsIAl1YgVh/HBbORcOKOjlYgAREXcX9VIG1tbds8klcW4vgj+CMvoHJWHQA+AdQB1AA/ACCCAJJwIcIA8vRRIqACcPsCBNiPYAIRGAIBER8BViMBESOCCcnDgFYi2zwRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQFYjVhaCCcnDgFYj2zwRFeMNViRWHlYYViUAQQBBAEAARAK8AhEYAgERHwFWIwERI4IJycOAViLbPBETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVAViNWFoIJycOAViPbPABBAEECrBETERcRExESERYREhERERUREREQERQREA8RFw8OERYODREVDQwRFAwLERcLChEWClYVCgkRFQkIERgIBxEX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BfXhAKkEUsCgUvC+kXDijopbbGMzMzQydNs84FMgoSDBAAFOAU4BTgFMBIaOi18DbGMzMzQydds84CDCAI8nggrcbABwf20iyMnQKxBHUTtROgMQVshVYNs8yVYjUEQUQzBtbds8kTDiUYihIMEAAU4B0AHUAU0Ejo6KW2xjMzM0MnnbPOAyIcIAjyiCCtxsAHB/bSLIydApEEhRO1E4AxBWyFVg2zzJViEEUFUUQzBtbds8kTHi+CP4I1YdoHIuAU4B0AHUAU8CVnCDBn9tIwXIywfJ0CYQaAUQSRA3UIgQRhBFyFVg2zzJVhRERBRDMG1t2zwB0AHUBPyPehEUESMRFBETESIRExESESEREhERESAREREQER8REA8RHg8OER0ODREcDQwRGwwLERoLChEZCgkRGAkIERcIBxEWBwYRFQYFESMFBBEiBAMRIQMCESACAREfAVYjAREjggnJw4BWI9s8ERMRFBETERIRFBESERERFBER4w0BUwFQAVEBVwFwERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUBWI1YWggnJw4BWJNs8ERUBUwL0ERQRIxEUERMRIhETERIRIRESERERIBERERARHxEQDxEeDw4RHQ4NERwNDBEbDAsRGgsKERkKCREYCQgRFwgHERYHBhEVBgURIwUEESIEAxEhAwIRIAIBER8BViMBESOCCcnDgFYj2zwRExEUERMREhEUERIREREUEREBUwFSAWwREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQFYjVhaCCcnDgFYk2zwBUwKsERMRFxETERIRFhESERERFRERERARFBEQDxEXDw4RFg4NERUNDBEUDAsRFwsKERYKCREVCVYUCQgRGAgHERcHBhEWBgUEERgEAxEXAwIRFgIBERXbPFwBoQFUA/hwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiH9xcMjJ0AQRHgQDER0DAhEbAi5ZyFVQ2zzJBhEaBgURGAUEERkEAxEXA1kQRhBF2zwEpCClERARFBEQAVUB1AFWANiCEF/MPRRQB8sfFcs/UAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initFactory_init_args({ $$type: 'Factory_init_args', id })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Factory_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    3607: { message: `QueryId already exists` },
    4321: { message: `Only factory can deploy` },
    7021: { message: `only oracle can send this message` },
    14154: { message: `ReportOwner must be from nft contract` },
    16059: { message: `Invalid value` },
    18356: { message: `Service fee must be less than denominator` },
    21517: { message: `Operator fee must be less than denominator` },
    24843: { message: `Only market can call this function` },
    27499: { message: `initialized tx need from collection` },
    29863: { message: `Market already set` },
    37488: { message: `Value must be positive` },
    40368: { message: `Contract stopped` },
    40476: { message: `Amount must be greater than 0` },
    40828: { message: `Only factory can call this function` },
    44278: { message: `Insufficient service fee` },
    44687: { message: `Sender is not amm` },
    45223: { message: `Transfer jetton must be from jetton wallet` },
    48542: { message: `ReportData must be from Deal contract` },
    49280: { message: `not owner` },
    49291: { message: `Jetton wallet already set` },
    49469: { message: `not from collection` },
    51559: { message: `Only operator fee address can withdraw operator fee` },
    53296: { message: `Contract not stopped` },
    57951: { message: `Deal is not created` },
    59867: { message: `Insufficient operator fee` },
}

const Factory_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Market$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"amm","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"underlyingAssetName","type":{"kind":"simple","type":"string","optional":false}},{"name":"duration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"stopped","type":{"kind":"simple","type":"bool","optional":false}},{"name":"countDeal","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"next_item_index","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"mapQueriesToContext","type":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}},{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedIdAsset","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"feedIdToken","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"operatorFeeSum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"serviceFeeSum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"operatorFeeAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MarketTon$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"amm","type":{"kind":"simple","type":"address","optional":false}},{"name":"underlyingAssetName","type":{"kind":"simple","type":"string","optional":false}},{"name":"duration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"stopped","type":{"kind":"simple","type":"bool","optional":false}},{"name":"countDeal","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"next_item_index","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"mapQueriesToContext","type":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}},{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedIdAsset","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"feedIdToken","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"operatorFeeSum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"serviceFeeSum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tonDepositBalance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"operatorFeeAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InnerDeployAmm","header":2078977111,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"market","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawToken","header":1740151130,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Amm$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"market","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InnerDeployAmmTon","header":3704021403,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"market","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawTon","header":456029640,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AmmTon$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"market","type":{"kind":"simple","type":"address","optional":false}},{"name":"deposited","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TakeDeal","header":955300085,"fields":[{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"oracleAssetData","type":{"kind":"simple","type":"cell","optional":false}},{"name":"oracleTokenData","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TakeDealTon","header":3886765728,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"deal","type":{"kind":"simple","type":"TakeDealData","optional":false}}]},
    {"name":"TakeDealData","header":null,"fields":[{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"oracleAssetData","type":{"kind":"simple","type":"cell","optional":false}},{"name":"oracleTokenData","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TakeDealWithOriginalGasTo","header":2027434162,"fields":[{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TakeDealWithOriginalGasToTon","header":640326903,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"deal","type":{"kind":"simple","type":"TakeDealDataWithOriginalGasTo","optional":false}}]},
    {"name":"TakeDealDataWithOriginalGasTo","header":null,"fields":[{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"oracleAssetData","type":{"kind":"simple","type":"cell","optional":false}},{"name":"oracleTokenData","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"CreateDeal","header":3755427120,"fields":[{"name":"makerPosition","type":{"kind":"simple","type":"bool","optional":false}},{"name":"rateAsset","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rateToken","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"percent","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"expiration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"slippage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oracleAssetData","type":{"kind":"simple","type":"cell","optional":true}},{"name":"oracleTokenData","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"InnerDeployMarket","header":1762492384,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InnerDeployMarketTon","header":2696026851,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawOperatorFee","header":3542167315,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawServiceFee","header":3909931163,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateDealTon","header":4072276050,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"deal","type":{"kind":"simple","type":"CreateDealData","optional":false}}]},
    {"name":"CreateDealData","header":null,"fields":[{"name":"makerPosition","type":{"kind":"simple","type":"bool","optional":false}},{"name":"rateAsset","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rateToken","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"percent","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"expiration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"slippage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oracleAssetData","type":{"kind":"simple","type":"cell","optional":true}},{"name":"oracleTokenData","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"CancelDeal","header":2166842366,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ProcessDeal","header":3915542458,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"oracleAssetData","type":{"kind":"simple","type":"cell","optional":false}},{"name":"oracleTokenData","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"DealData","header":null,"fields":[{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"isSeller","type":{"kind":"simple","type":"bool","optional":false}},{"name":"rate","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rateMaker","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"percent","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"slippageMaker","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"collateralAmountMaker","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dateOrderCreation","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"dateOrderExpiration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"dateStart","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"dateStop","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"buyerTokenId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"sellerTokenId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maker","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CancelEvent","header":3409203741,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maker","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateralAmountMaker","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DealAcceptedEvent","header":73313137,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maker","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateralAmountMaker","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DealCreatedEvent","header":17345355,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maker","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateralAmountMaker","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DealCompletedEvent","header":2339190802,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maker","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateralAmountMaker","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DealExpiredEvent","header":292536636,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maker","type":{"kind":"simple","type":"address","optional":false}},{"name":"collateralAmountMaker","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ContextCancelDealForDealReceived","header":null,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ContextTakeDealForDealReceived","header":null,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"feedId2","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"price2","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"timestamp2","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ContextProcessDealForDealReceived","header":null,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"feedId2","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"price2","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"timestamp2","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ContextTakeDealForPriceReceived","header":null,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ContextProcessDealForPriceReceived","header":null,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ContextForGetOwner","header":null,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TakeDealAmm","header":1895074275,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"oracleAssetData","type":{"kind":"simple","type":"cell","optional":false}},{"name":"oracleTokenData","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"UpdateFees","header":587185847,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"FeesUpdatedEvent","header":2897393818,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"total_supply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"wallet_code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"recipient","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenTransferInternal","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TokenBurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenUpdateContent","header":2937889386,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Deal$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftItem$Data","header":null,"fields":[{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":true}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"GetData","header":3858888933,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportData","header":3062344471,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"SaveData","header":2951296309,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"DeleteData","header":3097733652,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LogEventMintRecord","header":2743565669,"fields":[{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"generate_number","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GetRoyaltyParams","header":1765620048,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportRoyaltyParams","header":2831876269,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoyaltyParams","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"denominator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":1607220500,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"OwnershipAssigned","header":85167505,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetOwner","header":3156669640,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportOwner","header":704662021,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetNftData","header":null,"fields":[{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"DeployTokenMarket","header":3133287539,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"coin","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"underlyingAssetName","type":{"kind":"simple","type":"string","optional":false}},{"name":"duration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedIdAsset","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"feedIdToken","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"operatorFeeAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MarketDeployedEvent","header":4087132332,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"marketAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"coin","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"underlyingAssetName","type":{"kind":"simple","type":"string","optional":false}},{"name":"duration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedIdAsset","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"feedIdToken","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"operatorFeeAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DeployTokenMarketWithAmm","header":1684562987,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"coin","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWalletAmm","type":{"kind":"simple","type":"address","optional":false}},{"name":"underlyingAssetName","type":{"kind":"simple","type":"string","optional":false}},{"name":"duration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedIdAsset","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"feedIdToken","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"operatorFeeAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MarketDeployedEventWithAmm","header":3042373849,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"marketAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"coin","type":{"kind":"simple","type":"address","optional":false}},{"name":"amm","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWalletAmm","type":{"kind":"simple","type":"address","optional":false}},{"name":"underlyingAssetName","type":{"kind":"simple","type":"string","optional":false}},{"name":"duration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedIdAsset","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"feedIdToken","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"operatorFeeAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DeployTonMarket","header":4267639384,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"underlyingAssetName","type":{"kind":"simple","type":"string","optional":false}},{"name":"duration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedIdAsset","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"feedIdToken","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"operatorFeeAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MarketTonDeployedEvent","header":4135699990,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"marketAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"underlyingAssetName","type":{"kind":"simple","type":"string","optional":false}},{"name":"duration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedIdAsset","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"feedIdToken","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"operatorFeeAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DeployTonMarketWithAmm","header":2976600156,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"underlyingAssetName","type":{"kind":"simple","type":"string","optional":false}},{"name":"duration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedIdAsset","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"feedIdToken","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"operatorFeeAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MarketTonDeployedEventWithAmm","header":158221594,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"marketAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"amm","type":{"kind":"simple","type":"address","optional":false}},{"name":"underlyingAssetName","type":{"kind":"simple","type":"string","optional":false}},{"name":"duration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedIdAsset","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"feedIdToken","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"operatorFeeAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Factory$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const Factory_getters: ABIGetter[] = [
    {"name":"id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const Factory_getterMapping: { [key: string]: string } = {
    'id': 'getId',
}

const Factory_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"DeployTokenMarket"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployTokenMarketWithAmm"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployTonMarket"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeployTonMarketWithAmm"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Factory implements Contract {
    
    static async init(id: bigint) {
        return await Factory_init(id);
    }
    
    static async fromInit(id: bigint) {
        const init = await Factory_init(id);
        const address = contractAddress(0, init);
        return new Factory(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Factory(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Factory_types,
        getters: Factory_getters,
        receivers: Factory_receivers,
        errors: Factory_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: DeployTokenMarket | DeployTokenMarketWithAmm | DeployTonMarket | DeployTonMarketWithAmm | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployTokenMarket') {
            body = beginCell().store(storeDeployTokenMarket(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployTokenMarketWithAmm') {
            body = beginCell().store(storeDeployTokenMarketWithAmm(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployTonMarket') {
            body = beginCell().store(storeDeployTonMarket(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeployTonMarketWithAmm') {
            body = beginCell().store(storeDeployTonMarketWithAmm(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('id', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}