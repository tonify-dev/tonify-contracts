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

 type MarketTon_init_args = {
    $$type: 'MarketTon_init_args';
    id: bigint;
    owner: Address;
    amm: Address;
    factory: Address;
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

function initMarketTon_init_args(src: MarketTon_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.amm);
        let b_1 = new Builder();
        b_1.storeAddress(src.factory);
        b_1.storeStringRefTail(src.underlyingAssetName);
        b_1.storeInt(src.duration, 257);
        b_1.storeRef(src.collection_content);
        b_1.storeInt(src.operatorFee, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.serviceFee, 257);
        b_2.storeAddress(src.oracle);
        b_2.storeInt(src.feedIdAsset, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.feedIdToken, 257);
        b_3.storeAddress(src.operatorFeeAddress);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function MarketTon_init(id: bigint, owner: Address, amm: Address, factory: Address, underlyingAssetName: string, duration: bigint, collection_content: Cell, operatorFee: bigint, serviceFee: bigint, oracle: Address, feedIdAsset: bigint, feedIdToken: bigint, operatorFeeAddress: Address) {
    const __code = Cell.fromBase64('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JqiCMAQiyosKAKQlqhipBFKqqCiogigjhvJvwQAAqQRQCaAgggr68ICgE7mOhWyRcts84BETER4RExESER0REhERERwREREQERsREA8RGg8OERkODREYDQwRFwwLERYLChEVCgkRFAkIER4IBxEdBwYRHAZXJwP6BREbBQQRGgQDERkDAhEYAgERFwERFlYX2zwKpI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFYSxwWzlFcYVxjjDXD4I/gjAREcoFRxESARGLMQWgkRIgkIESAIBxEeB3FWHAgHESEHAhEaAlYcAgERGwFZKCkCgIIQDuaygHB/ERwgbvLQgBEbIG7y0IBWIAJWGQJWHAJWHAIBER8BEEXIVVDbPMlWE0MUAhEbAhEcARRDMG1t2zwqeQH8DVWhVhwBViUBVh8BESHIVTCCCQirS1AFyx8Tyz/LHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gLJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERkRJBEZERgRIxEYERcRIhEXERYRIREWERURIBEVERQRHxEUKwBoghBw9InjUAfLHxXLPxPLHwH6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbMzAGcERMRHhETERIRHRESERERHBERERMRGxETDxEaDw4RGQ4NERgNERYRFxEWDhEWDg4RFQ4OERQODxETDw4REg4REBERERAPERAPEN9VHNs8YgGWERURGREVERQRGBEUERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQaiAQahBZEEgQN9s8LgDIE8oAyx/LHwHIzBL0AFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSy/8Sy/9Y+gLIUAP6AlAD+gJQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFslYzMkBzAGuyHoBywdDZshVMFBDINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCEssfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFslQA8zJEts8OAEwMNMfAYIQgSdj/rry4IHTP9MfWWwS2zx/MQT6ghDpYm+6uo6bMNMfAYIQ6WJvurry4IHTP9Mf1NRVMGwU2zx/4CCCECoASgW6jrsw0x8BghAqAEoFuvLggdM/gQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBsE9s8f+AgghC2h6sXuuMCIIIQIv++t7ozNDU2AvYjghAF9eEAoHD7AhETERURExESERQREhERERUREREQERQREA8RFQ8OERQODREVDQwRFAwLERULChEUCgkRFQkIERQIBxEVBwYRFAYFERUFBBEUBAMRFQMCERQCAREVAREU2zz4QW8kMIE+uzOCCvrwgL4S8vTIgBUBywdtMgHKAcgBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHMyREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQaBBXEEYQNUQw2zx2AvQlghAF9eEAoHD7AhETERcRExESERYREhERERUREREQERQREA8RFw8OERYODREVDQwRFAwLERcLChEWCgkRFQkIERQIBxEXBwYRFgYFERUFBBEUBAMRFwMCERYCAREVAREU2zz4QW8kMIE+uzOCEA7msoC+EvL0yIAMAW03Atj4QW8kECNfA/hD+ChBBNs8AYE3SgJwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFADxwUS8vQpgQEBI1n0DW+hkjBt39CdOgE0MNMfAYIQtoerF7ry4IHTP9Mf1FUgbBPbPH87BP6OmzDTHwGCECL/vre68uCB0z/TH9MfVSBsE9s8f+DAAI9cIPkBIILwbI9E9F/ttM3+1N6NsUqlsTrVXUMPdZ0GaSELdMSP49+6joZb2zx/2zHggvC8+vd2kHxxnMjTedjxlKqqJ+jKKHHNWReBch8hWkVFAbqOhjDbPH/bMeDeZWZnaAHaywcRGMhZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssfyQERF8zJERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQahBZEEgQN0ZQQUDbPDgBVoEOFyyBAQEmWfQNb6GSMG3fbvL0G4EBAVJCIG6VMFn0WjCUQTP0FeIK2zw5AVAB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8tCJgwm68uCIzxYB+gLJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsABVBm2zxVAbwDERcDAhEWAgERGwERHVYfVh/bPBETER0RExESERwREhERERsREREQERoREA8RGQ8OERgODREXDQwRFgwLERULChEUCgkREwkIERIIBxERBwYREAYQXxBOED1MuhBXUgGcBREaBQQRGQQDERgDAhEZAlYd2zwRExEaERMREhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMCxESCwoREQoJERAJEI8QflVmUgG2gQ4XLIEBASRZ9A1voZIwbd9u8vQSAYEBAQLIWVn6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJIhA8ASBulTBZ9FowlEEz9BXiUJmCEAQNmQDbPFMCthEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCERUB2zycVAH4cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ih/cBEYyAGCELwm9MhYyx/LP8kQJAMRFwMSAREYARAkECNtbds8ERERExERERAREhEQDxERDw4REA5VHXkCoPhD+ChBMNs8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcIMGBnAGd1YBeMhZghC4o6oUUAPLH8s/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFslAFlBEBQMQNhA1EDTbPHkBKjJwgwZ/BMjLB8kQNEEwFEMwbW3bPHkEnAIRIAIBER8B2zxWHsIAjo5WFAERH3F/VSBtbW3bPJJXHuJWFsIAl1YgVh/HBbORcOKOjlYgAREXcX9VIG1tbds8klcW4vgj+CMvoHJWHVl5eVoAIIIAknAhwgDy9FEioAJw+wIE2I9gAhEYAgERHwFWIwERI4IJycOAViLbPBETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVAViNW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');
    const __system = Cell.fromBase64('te6cckEC6wEALpEAAQHAAQIBSAK8AQW5XEgDART/APSkE/S88sgLBAIBYgVsA+7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zzy4ILI+EMBzH8BygARFBETERIREREQVeDbPMntVLYGagT07aLt+wGPaYAg1yFwIddJwh+VMCDXCx/eIIIQ5gH45bqOHDDTHwGCEOYB+OW68uCB0z8BMVAIgQEB9FowB3/gghC8JvTIuo6U0x8BghC8JvTIuvLggdM/ATHbPH/g0x8BggvflKq6joTTP9s8kTDif+BwIddJwh/jACAHCAkKABJQCIEBAfRaMAcAFDBQCIEBAfRaMAcACjAg1wsfBPaCEKCyGuO6jtww0x8BghCgshrjuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEiOCEAX14QCgcPsCcIMGcATIAYIQr/kPV1jLH8s/yRA0QTAUQzBtbds8f+AgghDpDNCbuuMCIIIQ0yEvE7rjAiDeCw4QAXAw0x8BghDpDNCbuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBsE9s8fwwC7DIRExEVERMREhEUERIREREVEREREBEUERAPERUPDhEUDg0RFQ0MERQMCxEVCwoRFAoJERUJCBEUCAcRFQcGERQGBREVBQQRFAQDERUDAhEUAgERFQERFNs8ggCeHFYVwgDy9IIArPZWFSS78vQCVhShAVYUoSBcDQKmghAF9eEAoHD7AgERFQERFHFwVSBtbW3bPPhCcIMGf1UgbW1t2zwRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDVEMBLe3gFqMNMfAYIQ0yEvE7ry4IHTP/oA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBMPAp4y+EFvJBAjXwMjggDJZwLHBfL0ggCeHCHCAPL0ggDp21MWu/L0UVWhUTWhIIIQBfXhAKBw+wIFcXBVIG1tbds8+EJwgwZ/VSBtbW3bPBN/3t4EpoIQ8roAUrqPGTDTHwGCEPK6AFK68uCB0z/bPBCJbBnbPH/gIIIQ56tWoLqOnTDTHwGCEOerVqC68uCB0z/TH9TUVSAQNGwU2zx/4CCCECYqnPe6ERIcHgBA0gD6APoA+gDTH/oA0gABkdSSbQHi0gABkdSSbQHiVXAE6iqCEAX14QCgcPsCERMRHBETERIRGxESERERGhERERARGREQDxEYDw4RFw4NERYNDBEVDAsRFAsKERwKCREbCQgRGggHERkHBhEYBgURFwUEERYEAxEVAwIRFAIBERwBERvbPPhBbyQwMoE+u4lWFccFkXDjDV0TFBUAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAADiKCCvrwgL4BxJF/mCKCEBHhowC+4vL0ERURHhEVERQRHREUERMRHBETERIRGxESERERGhERERARGREQDxEYDw4RFw4NERYNDBEVDAsRFAsKERMKCRESCQgREQgHERAHEG8QXhBNEDwQK9s8FgL2VhVTmKgoqCaogjAEIsqLCgCkJaoYqQRSqqgoqIIoI4byb8EAAKkEUAmgIIIK+vCAoBO5joVskXLbPOARExEeERMREhEdERIREREcEREREBEbERAPERoPDhEZDg0RGA0MERcMCxEWCwoRFQoJERQJCBEeCAcRHQcGERwGRxcD+gURGwUEERoEAxEZAwIRGAIBERcBERZWF9s8CqSNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARWEscFs5RXGFcY4w1w+CP4IwERHKBUcREgERizEFoJESIJCBEgCAcRHgdxVhwIBxEhBwIRGgJWHAIBERsBSRgaAoCCEA7msoBwfxEcIG7y0IARGyBu8tCAViACVhkCVhwCVhwCAREfARBFyFVQ2zzJVhNDFAIRGwIRHAEUQzBtbds8Gd4AaIIQcPSJ41AHyx8Vyz8Tyx8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WzMwB/A1VoVYcAVYlAVYfAREhyFUwggkIq0tQBcsfE8s/yx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCyciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEZESQRGREYESMRGBEXESIRFxEWESERFhEVESARFREUER8RFBsBnBETER4RExESER0REhERERwRERETERsREw8RGg8OERkODREYDREWERcRFg4RFg4OERUODhEUDg8REw8OERIOERAREREQDxEQDxDfVRzbPFIC7CWCEAX14QCgcPsCERMRFxETERIRFhESERERFRERERARFBEQDxEXDw4RFg4NERUNDBEUDAsRFwsKERYKCREVCQgRFAgHERcHBhEWBgURFQUEERQEAxEXAwIRFgIBERUBERTbPPhBbyQwMoE+uyKCEA7msoC+8vRdHQGWERURGREVERQRGBEUERMRFxETERIRFhESERERFRERERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQaiAQahBZEEgQN9s8HwP6ju8w0x8BghAmKpz3uvLggdM/+gDTH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1NRVMBBGEEVsFieCEAX14QCgcPsC+EFvJDAyggCuj1YaIscF8vSBPrsCghAO5rKAvhLy9EREVSLbPH/gIIIQgSdj/rrjAiAfICMBrsh6AcsHQ2bIVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AhLLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJUAPMyRLbPCYBMDDTHwGCEIEnY/668uCB0z/TH1lsEts8fyEC9iOCEAX14QCgcPsCERMRFRETERIRFBESERERFRERERARFBEQDxEVDw4RFA4NERUNDBEUDAsRFQsKERQKCREVCQgRFAgHERUHBhEUBgURFQUEERQEAxEVAwIRFAIBERUBERTbPPhBbyQwgT67M4IK+vCAvhLy9MiAFQHLB10iAcoByAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJAczJERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1RDDbPGcE+oIQ6WJvurqOmzDTHwGCEOlib7q68uCB0z/TH9TUVTBsFNs8f+AgghAqAEoFuo67MNMfAYIQKgBKBbry4IHTP4EBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBPbPH/gIIIQtoerF7rjAiCCECL/vre6JCgqVQL0JYIQBfXhAKBw+wIRExEXERMREhEWERIREREVEREREBEUERAPERcPDhEWDg0R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EhEZERIREREYEREREBEXERAPERYPDhEVDg0RFA0MERMMCxESCwoREQoJERAJEI8QflVmOwG2gQ4XLIEBASRZ9A1voZIwbd9u8vQSAYEBAQLIWVn6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJIhA8ASBulTBZ9FowlEEz9BXiUJmCEAQNmQDbPDwCthEUERYRFBETERURExESERYREhERERUREREQERYREA8RFQ8OERYODREVDQwRFgwLERULChEWCgkRFQkIERYIBxEVBwYRFgYFERUFBBEWBAMRFQMCERYCERUB2zyYPQH4cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ih/cBEYyAGCELwm9MhYyx/LP8kQJAMRFwMSAREYARAkECNtbds8ERERExERERAREhEQDxERDw4REA5VHd4BpMhVMIIQi204ElAFyx8Tyz/LHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYB+gLJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsABVBm2zw/AqD4Q/goQTDbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHCDBgZwBmhAAXjIWYIQuKOqFFADyx/LPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJQBZQRAUDEDYQNRA02zzeAVYx1DAOERQODRETDQwREgwLERELChEQChCfEI4QfRBsEFsQShA5SBZAB9s8QgSAUJhfBjQ0Oi2CEAX14QCgcPsCAdDbPDBTeccFjodfB2yieNs84BESwwGOh18GbKJ32zzgA1YXvZIyf5QCVhW94kNHR0UBDNs8CdFVB0QAtPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMf03/TH9Mf03/UAdDTHzAZGBcWFRRDMATgjodfBGyidts84PgjgQEsoRK5jodfA2yic9s84FOgqFAPqIIoI4byb8EAAKkEU7moghAF9eEAqQRSwKFS8LuOEVO5qIIQBfXhAKkEUsCgUvC+kXDijodfA2yidNs84FEioSCCCvrwgLmUUzHHBZFw4kdHR0YD/pF/nCDBAJVTMccFs5Fw4uKOh18DbKJ12zzgUYKhIMEAjodfA2yieds84FMgoREUESMRFBETESIRExESESEREhERESAREREQER8REA8RHg8OER0ODREcDQwRGwwLERoLChEZCgkRGAkIERcIBxEWBwYRFQYFESMFBBEiBAMRIQNHR0gBKjJwgwZ/BMjLB8kQNEEwFEMwbW3bPN4EnAIRIAIBER8B2zxWHsIAjo5WFAERH3F/VSBtbW3bPJJXHuJWFsIAl1YgVh/HBbORcOKOjlYgAREXcX9VIG1tbds8klcW4vgj+CMvoHJWHUne3koAIIIAknAhwgDy9FEioAJw+wIE2I9gAhEYAgERHwFWIwERI4IJycOAViLbPBETERQRExESERQREhERERQREREQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVAViNWFoIJycOAViPbPBEV4w1WJFYeVhhWJUxMS1ACvAIRGAIBER8BViMBESOCCcnDgFYi2zwRExEUERMREhEUERIREREUEREREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQFYjVhaCCcnDgFYj2zxMTAKsERMRFxETERIRFhESERERFRERERARFBEQDxEXDw4RFg4NERUNDBEUDAsRFwsKERYKVhUKCREVCQgRGAgHERcHBgURFQUEERgEAxEXAwIBERUBERbbPFyYTQP4cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ih/cXDIydAEER4EAxEdAwIRGwIvWchVUNs8yQYRGgYFERgFBBEZBAMRFwNZEEYQRds8BaQgpREQERQREE7eTwDYghBfzD0UUAfLHxXLP1ADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiAfoCAc8WAEwPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexoQWRBIEDcQJkUwEgH+yFUwghAEXqtxUAXLHxPLP8sfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AsnIgljAAAAAAAAAAAAAAAABActnzMlw+wARFBEkERQRExEjERMREhEiERIREREhEREREBEgERAPER8PDhEeDg0RHQ0MERwMCxEbC1EBhgoRGgoJERkJCBEYCAcRFwcGERYGBREVBQQRFAQDERMDAhESAgEREQEEERAEEN8QPhA9EDwQOxA6EDkQKBAnXjJZ2zxSA+j4Q/goEgEREQHbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAoREAoQnxCOEH0QbBBbBBEQBBA/TtxwgwYREh1wERLIVdDbPMlIcGhTVACSUN7LBxvKAFAJ+gJQB/oCUAX6AlAD+gIB+gLLH8sfyx/LH8sfyx/IWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskBzAF0yFUgghCv6TU1UATLHxLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbMyVkQNhA1EDTbPN4E/o6bMNMfAYIQIv++t7ry4IHTP9Mf0x9VIGwT2zx/4MAAj1wg+QEggvBsj0T0X+20zf7U3o2xSqWxOtVdQw91nQZpIQt0xI/j37qOhlvbPH/bMeCC8Lz693aQfHGcyNN52PGUqqon6Moocc1ZF4FyHyFaRUUBuo6GMNs8f9sx4N5WWFthAvAkghAF9eEAoHD7AhETERYRExESERUREhERERQREREQERYREA8RFQ8OERQODREWDQwRFQwLERQLChEWCgkRFQkIERQIBxEWBwYRFQYFERQFBBEWBAMRFQMCERQCAREWAREV2zw9PYFUDVYVghA7msoAu/L0gUe0VhRcVwCoghA7msoAu/L0ERJWFFYUyFUgghCssriaUATLHxLLP8sfyx/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERARExEQDxESDw4REQ4NERANXiwQzVUpBBDbPNs8O3CIHFxZWl8ADoIA0DAs8vQAFgAAAABSZXN1bWVkBBDbPNs8O3+IHFxdXl8AFPhCVhMBxwXy4IQAEIIAnbAss/L0ABYAAAAAU3RvcHBlZAEO+EIBf23bPGABOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s83gF00x8BghCTX6nRuo6qgRtt+EJSkMcF8vTTP9QB0AHUMNAB0//T/9MvMAPT/9P/0y8wEEUQNNs8kTDif2ICpCiCEAX14QCgcPsC+EFvJFYSgQEBLFn0DW+hkjBt3yBu8tCA0FKwERSBAQH0WjARE9MHIcAKjogx1DALVVTbPI6QAcAMjofUMAtVVNs8kl8M4uJjZQLsNzc3NwfQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6ANMf+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBRDMATRVQLIgBQBywcKgQPoqQQHgQPoqQQQSBA3FhBLSbDIVYDbPMlYzMnbPGRnAK5QmCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAG+gJQBCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhLLH8t/yx/LHxLLfwHIyx/JAcwCnjc3NzcH0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0x9ZAtEByIAWAcsHCIED6KkEBYED6KkEXjIQSUdwyFVg2zzJWMzJ2zxmZwBeUHYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUyx8Sy3/LH8sfEst/yx8C7IEOFyuBAQElWfQNb6GSMG3fbvL0GoEBAVIyIG6VMFn0WjCUQTP0FeL4Q/goQbDbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIcIMGfwRoaQCkAtD0BDBtAYFBxwGAEPQPb6Hy4IcBgUHHIgKAEPQXyAHI9ADJAcxwAcoAQAMCgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQEyyAGCEOYB+OVYyx/LP8kQNEEwFEMwbW3bPN4B9gEREwERFMsfARERINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUA8g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIUA7PFslQDcwbyx8Zyx8Xyx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFmsAyBPKAMsfyx8ByMwS9ABYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEsv/Esv/WPoCyFAD+gJQA/oCUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJWMzJAcwCASBtpAIBIG6GAgEgb3cCASBwcgJdstd2zwRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDlUd2zxXEF8PbEGC2cQE+MchvAAFvjG1vjAHQ2zxvIgHJkyFus5YBbyJZzMnoMekCAVhzdQIYqUDbPNs8VxBfD2xBtnQAAi8CGKmd2zzbPFcQXw9sQbZ2AAIlAgEgeHoCGbBe9s82zxXEF8PbEGC2eQACKwIBIHuAAgHnfH4CF7ots82zxXEF8PbEGLZ9AAIoAhe7zbPNs8VxBfD2xBi2fwACJAIBIIGCAhiqN9s82zxXEF8PbEG2zAIBYoOFAhe7vbPNs8VxBfD2xBi2hAACIwJZu22zwRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcSVxBfD2wiMotpgCASCHkgIBIIiNAgFIiYsCGKnS2zzbPFcQXw9sQbaKAAIsAhipHds82zxXEF8PbEG2jAAEVhICAW6OkAIXpA+2ebZ4riC+HtiDto8AAiYCF6Wbtnm2eK4gvh7Yg7aRAARWEAIBIJOcAgEglJoCAViVlgIXpVW2ebZ4riC+HtiDttACU6dHtngiJiIoIiYiJCImIiQiIiIkIiIiICIiIiAeIiAeqh22eK4gvh7Yg7aXAYbbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCImAEO+EP4KFjbPJkAogLQ9AQwbQGBeeoBgBD0D2+h8uCHAYF56iICgBD0F8gByPQAyQHMcAHKAEADWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AyQIZrhNtnm2eK4gvh7YgwLabAARWEQIBIJ2fAhmvEO2ebZ4riC+HtiDAtp4AAioCAUigogIXpgO2ebZ4riC+HtiDtqEAAikCF6d1tnm2eK4gvh7Yg7ajAAInAgEgpbACAWamqwIBIKepAhSoW9s82zxs82xTtqgCoshvAAFvjG1vjCnQ2zyLltZXRhLmpzb26Ns8byIByZMhbrOWAW8iWczJ6DGNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQrWenpAhiqwNs82zxXEF8PbEG2qgAI+CdvEAIBIKyuAhip+9s82zxXEF8PbEG2rQACLQIYqZDbPNs8VxBfD2xBtq8ABFYTAgEgsbIAEbRX3aiaGkAAMAIBWLO1AhmveO2ebZ4riC+HtiDAtrQAAi4CGa+dbZ5tniuIL4e2IMC2yAN47UTQ1AH4Y9IAAY6c2zxXFBESERMREhERERIREREQEREREA8REA9VDuD4KNcLCoMJuvLgids8DdFVC9s8t7m7AfDTH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB0x/TH9Mf+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSANMf0x/UAdDU9AS4ANr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/0//6ANQw0PoA+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMQkRFAkJERMJCRESCQkREQkJERAJEJ8QnhCdEJwQmxCaAfSBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0AGBAQHXANSBAQHXANQw0LoAsIEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANQw0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEQrRCsEKsAWnBwIG1UcRGBEOH4QlYSAccF8vQPERAPEO8QzhC9EGsQWhBJEGgQNxBWEEVVAgIBIL3RAQW0OPC+ART/APSkE/S88sgLvwIBYsDGA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCzsHFBPABkjB/4HAh10nCH5UwINcLH94gghCv6TU1uo9RMNMfAYIQr+k1Nbry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1FUgbBMyggiYloBw+wJENNs8MANwgwZwVSBtbW3bPFl/4CCCELijqhS64wLD3sLEApQw0x8BghC4o6oUuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEjFwIPsCVSDbPANwgQCgcFUgbW1t2zxYf8PeABL4QlIgxwXy4IQBtIIQ5gH45bqOztMfAYIQ5gH45bry4IHTPwExggiYloBw+wL4QW8kECNfA3CDBn8lIG7y0IBUJYDIVSCCELaHqxdQBMsfEss/yx/MyRA0QTAUQzBtbds8f+AwcN4AgMj4QwHMfwHKAFUgUCPLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOLJ7VQCASDHyQIRviju2ebZ42GMzsgAAiECASDK6gIBSMvNAhGx2LbPNs8bDGDOzAACIAIRs2Q2zzbPGwxgztAB4u1E0NQB+GPSAAGOL9Mf+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAAGR1JJtAeJVIGwT4Pgo1wsKgwm68uCJgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEgLRAds8zwACbQACIgEFtz1Q0gEU/wD0pBP0vPLIC9MCAWLU4QN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRTbPPLgguPV4ARmAZIwf+BwIddJwh+VMCDXCx/eIIIQX8w9FLqPBTDbPGwW4CCCEC/LJqK64wKCELwm9Mi61tfc3QDc0x8BghBfzD0UuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0gABkdSSbQHi+gBRVRUUQzADpPhBbyQQThA9TLor2zwjwACOujZfAzc3ODgkgWtrB8cFFvL0ggiYloBw+wJ/BSBu8tCAgwYDyAGCENUydttYyx/LP8lHMH9VMG1t2zzjDlAzBH/Y3tkALPgnbxAhoYIImJaAZrYIoYIJMS0AoKED6jeCAMCAAiBu8tCALccFEvL0U3TCAI7JcVOtfxESyFUgghAFE42RUATLHxLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBzxbJJxBLAxERARRDMG1t2zwQbJI4PeIQO0qY2zyhIW6zk1s1MOMNWd7a2wBkbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwABSgEgbvLQgAehcX8EyAGCENUydttYyx/LP8kQSEEwGBRDMG1t2zzeAcQw0x8BghAvyyaiuvLggdM/ATH4QW8kECNfA3CAQH9UNInIVSCCEIt3FzVQBMsfEss/gQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRA0QTAUQzBtbds8f94B2I7n0x8BghC8JvTIuvLggdM/ATH4QW8kECNfA3CDBn8mIG7y0IBUJZDIVSCCECoASgVQBMsfEss/gQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRA0QTAUQzBtbds8f+AwcN4ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsA3wCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzADeyPhDAcx/AcoAVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAMoAWCBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiye1UAgFY4uoCEbj8/bPNs8bFWOPmAfTtRNDUAfhj0gABjmL6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA0gAg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0gABkdSSbQHiVUBsFeD4KNcLCoMJuvLgieQBVvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZAtEB2zzlACBtbYIAwT34QlJQxwXy9HBZBDzIbwABb4xtb4whIG7y0IDQ2zwk2zzbPItS5qc29ujp5+noAN7IIcEAmIAtAcsHAaMB3iGCODJ8snNBGdO3qaoduY4gcCBxjhQEeqkMpjAlqBKgBKoHAqQhwABFMOYwM6oCzwGOK28AcI4RI3qpCBJvjAGkA3qpBCDAABTmMyKlA5xTAm+BpjBYywcCpVnkMDHiydABQNs8IiBu8tCAAW8iAcmTIW6zlgFvIlnMyegxJFRGMChZ6QC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DABG4K+7UTQ0gABjuHpTp');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMarketTon_init_args({ $$type: 'MarketTon_init_args', id, owner, amm, factory, underlyingAssetName, duration, collection_content, operatorFee, serviceFee, oracle, feedIdAsset, feedIdToken, operatorFeeAddress })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const MarketTon_errors: { [key: number]: { message: string } } = {
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

const MarketTon_types: ABIType[] = [
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

const MarketTon_getters: ABIGetter[] = [
    {"name":"id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"amm","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"underlyingAssetName","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"duration","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"operatorFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"serviceFee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"countDeal","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"next_item_index","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"collection_content","arguments":[],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"oracle","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"factory","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"feedIdAsset","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"feedIdToken","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"operatorFeeSum","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"serviceFeeSum","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"operatorFeeAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"mapQueriesToContext","arguments":[],"returnType":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}},
    {"name":"tonDepositBalance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_collection_data","arguments":[],"returnType":{"kind":"simple","type":"CollectionData","optional":false}},
    {"name":"get_nft_address_by_index","arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"getNftItemInit","arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"get_nft_content","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
]

export const MarketTon_getterMapping: { [key: string]: string } = {
    'id': 'getId',
    'amm': 'getAmm',
    'underlyingAssetName': 'getUnderlyingAssetName',
    'duration': 'getDuration',
    'operatorFee': 'getOperatorFee',
    'balance': 'getBalance',
    'serviceFee': 'getServiceFee',
    'countDeal': 'getCountDeal',
    'next_item_index': 'getNextItemIndex',
    'collection_content': 'getCollectionContent',
    'oracle': 'getOracle',
    'factory': 'getFactory',
    'feedIdAsset': 'getFeedIdAsset',
    'feedIdToken': 'getFeedIdToken',
    'operatorFeeSum': 'getOperatorFeeSum',
    'serviceFeeSum': 'getServiceFeeSum',
    'operatorFeeAddress': 'getOperatorFeeAddress',
    'mapQueriesToContext': 'getMapQueriesToContext',
    'tonDepositBalance': 'getTonDepositBalance',
    'stopped': 'getStopped',
    'owner': 'getOwner',
    'get_collection_data': 'getGetCollectionData',
    'get_nft_address_by_index': 'getGetNftAddressByIndex',
    'getNftItemInit': 'getGetNftItemInit',
    'get_nft_content': 'getGetNftContent',
}

const MarketTon_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"InnerDeployMarketTon"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawServiceFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawOperatorFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateDealTon"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TakeDealTon"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TakeDealWithOriginalGasToTon"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelDeal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProcessDeal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReportOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReportData"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateFees"}},
    {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
    {"receiver":"internal","message":{"kind":"any"}},
]

export class MarketTon implements Contract {
    
    static async init(id: bigint, owner: Address, amm: Address, factory: Address, underlyingAssetName: string, duration: bigint, collection_content: Cell, operatorFee: bigint, serviceFee: bigint, oracle: Address, feedIdAsset: bigint, feedIdToken: bigint, operatorFeeAddress: Address) {
        return await MarketTon_init(id, owner, amm, factory, underlyingAssetName, duration, collection_content, operatorFee, serviceFee, oracle, feedIdAsset, feedIdToken, operatorFeeAddress);
    }
    
    static async fromInit(id: bigint, owner: Address, amm: Address, factory: Address, underlyingAssetName: string, duration: bigint, collection_content: Cell, operatorFee: bigint, serviceFee: bigint, oracle: Address, feedIdAsset: bigint, feedIdToken: bigint, operatorFeeAddress: Address) {
        const init = await MarketTon_init(id, owner, amm, factory, underlyingAssetName, duration, collection_content, operatorFee, serviceFee, oracle, feedIdAsset, feedIdToken, operatorFeeAddress);
        const address = contractAddress(0, init);
        return new MarketTon(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MarketTon(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  MarketTon_types,
        getters: MarketTon_getters,
        receivers: MarketTon_receivers,
        errors: MarketTon_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: InnerDeployMarketTon | WithdrawServiceFee | WithdrawOperatorFee | CreateDealTon | TakeDealTon | TakeDealWithOriginalGasToTon | CancelDeal | ProcessDeal | ReportOwner | ReportData | UpdateFees | 'Resume' | 'Stop' | Slice) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InnerDeployMarketTon') {
            body = beginCell().store(storeInnerDeployMarketTon(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawServiceFee') {
            body = beginCell().store(storeWithdrawServiceFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawOperatorFee') {
            body = beginCell().store(storeWithdrawOperatorFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDealTon') {
            body = beginCell().store(storeCreateDealTon(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TakeDealTon') {
            body = beginCell().store(storeTakeDealTon(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TakeDealWithOriginalGasToTon') {
            body = beginCell().store(storeTakeDealWithOriginalGasToTon(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelDeal') {
            body = beginCell().store(storeCancelDeal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProcessDeal') {
            body = beginCell().store(storeProcessDeal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReportOwner') {
            body = beginCell().store(storeReportOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReportData') {
            body = beginCell().store(storeReportData(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateFees') {
            body = beginCell().store(storeUpdateFees(message)).endCell();
        }
        if (message === 'Resume') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Stop') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && message instanceof Slice) {
            body = message.asCell();
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
    
    async getAmm(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('amm', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getUnderlyingAssetName(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('underlyingAssetName', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getDuration(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('duration', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOperatorFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('operatorFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getServiceFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('serviceFee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCountDeal(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('countDeal', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getNextItemIndex(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('next_item_index', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCollectionContent(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('collection_content', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getOracle(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('oracle', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getFactory(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('factory', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getFeedIdAsset(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('feedIdAsset', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getFeedIdToken(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('feedIdToken', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOperatorFeeSum(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('operatorFeeSum', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getServiceFeeSum(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('serviceFeeSum', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOperatorFeeAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('operatorFeeAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getMapQueriesToContext(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('mapQueriesToContext', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
        return result;
    }
    
    async getTonDepositBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tonDepositBalance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getStopped(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('stopped', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadGetterTupleCollectionData(source);
        return result;
    }
    
    async getGetNftAddressByIndex(provider: ContractProvider, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(item_index);
        let source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }
    
    async getGetNftItemInit(provider: ContractProvider, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(item_index);
        let source = (await provider.get('getNftItemInit', builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetNftContent(provider: ContractProvider, index: bigint, individual_content: Cell) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individual_content);
        let source = (await provider.get('get_nft_content', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
}