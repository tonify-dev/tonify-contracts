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

 type Market_init_args = {
    $$type: 'Market_init_args';
    id: bigint;
    owner: Address;
    coin: Address;
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

function initMarket_init_args(src: Market_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.coin);
        let b_1 = new Builder();
        b_1.storeAddress(src.amm);
        b_1.storeAddress(src.factory);
        b_1.storeStringRefTail(src.underlyingAssetName);
        b_1.storeInt(src.duration, 257);
        b_1.storeRef(src.collection_content);
        let b_2 = new Builder();
        b_2.storeInt(src.operatorFee, 257);
        b_2.storeInt(src.serviceFee, 257);
        b_2.storeAddress(src.oracle);
        let b_3 = new Builder();
        b_3.storeInt(src.feedIdAsset, 257);
        b_3.storeInt(src.feedIdToken, 257);
        b_3.storeAddress(src.operatorFeeAddress);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function Market_init(id: bigint, owner: Address, coin: Address, amm: Address, factory: Address, underlyingAssetName: string, duration: bigint, collection_content: Cell, operatorFee: bigint, serviceFee: bigint, oracle: Address, feedIdAsset: bigint, feedIdToken: bigint, operatorFeeAddress: Address) {
    const __code = Cell.fromBase64('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GhETERIRGRESERERGBERERARFxEQDxEWDw4RFQ4NERQNDBETDAsREgsKEREKCREQCRCPEH5VZkgBtoEOFyuBAQEkWfQNb6GSMG3fbvL0EgGBAQECyFlZ+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WySIQOwEgbpUwWfRaMJRBM/QV4lCIghAEDZkA2zxJArYRFBEWERQRExEVERMREhEWERIREREVEREREBEWERAPERUPDhEWDg0RFQ0MERYMCxEVCwoRFgoJERUJCBEWCAcRFQcGERYGBREVBQQRFgQDERUDAhEWAhEVAds8n0oB+HBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIf3ARGMgBghC8JvTIWMsfyz/JECQDERcDEgERGAEQJBAjbW3bPBERERMREREQERIREA8REQ8OERAOVR1uAXjIWYIQuKOqFFADyx/LPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJQBZQRAUDEDYQNRA02zxuAlZwgwZ/bSMFyMsHydAmEGgFEEkQN1CIEEYQRchVYNs8yVYUREQUQzBtbds8T24CUIIK3GwAcH9tIsjJ0CkQSFE7UToDEFbIVWDbPMlWIQRQVRRDMG1t2zxPbgT8j3oRFBEjERQRExEiERMREhEhERIREREgEREREBEfERAPER4PDhEdDg0RHA0MERsMCxEaCwoRGQoJERgJCBEXCAcRFgcGERUGBREjBQQRIgQDESEDAhEgAgERHwFWIwERI4IJycOAViPbPBETERQRExESERQREhERERQREeMNVFBRUgDeghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiAfoCAc8WAXAREBEUERAPERQPDhEUDg0RFA0MERQMCxEUCwoRFAoJERQJERQIBwZVQFYjVhaCCcnDgFYk2zwRFVQC9BEUESMRFBETESIRExESESEREhERESAREREQER8REA8RHg8OER0ODREcDQwRGwwLERoLChEZCgkRGAkIERcIBxEWBwYR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');
    const __system = Cell.fromBase64('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y2fMyXD7AARQVds8W2AB/lMBvI4jNTZTNaFWFqiCEDuaygCpBFJHoVYVqIIQO5rKAKkEUUahJKGRMeIopBEWER0RFhEVERwRFREUERsRFBETERoRExESERkREhERERgREREQERcREA8RHQ8OERwODREbDQwRGgwLERkLChEYCgkRFwkIER0IBxEcBwYRGwZcAZwFERoFBBEZBAMRGAMCERkCVh3bPBETERoRExESERkREhERERgREREQERcREA8RFg8OERUODREUDQwREwwLERILChERCgkREAkQjxB+VWZdAbaBDhcrgQEBJFn0DW+hkjBt327y9BIBgQEBAshZWfoCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskiEDsBIG6VMFn0WjCUQTP0FeJQiIIQBA2ZANs8XgK2ERQRFhEUERMRFRETERIRFhESERERFRERERARFhEQDxEVDw4RFg4NERUNDBEWDAsRFQsKERYKCREVCQgRFggHERUHBhEWBgURFQUEERYEAxEVAwIRFgIRFQHbPMFfAfhwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiH9wERjIAYIQvCb0yFjLH8s/yRAkAxEXAxIBERgBECQQI21t2zwRERETEREREBESERAPEREPDhEQDlUdiwKg+EP4KEEw2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhwgwYGcAaJYQF4yFmCELijqhRQA8sfyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyUAWUEQFAxA2EDUQNNs8iwFWMdQwDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbBBbEEoQOUgWQAfbPGMEelCYXwY0NDoB0Ns8MFN5xwWOi18GbGMzMzQyeNs84BESwwGOi18FbGMzMzQyd9s84ANWFr2SMn+UAlYUveJkaGhmAQzbPAnRVQdlALT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH9N/0x/TH9N/1AHQ0x8wGRgXFhUUQzAE1o6LXwNsYzMzNDJ22zzg+COBASyhErmOiltsYzMzNDJz2zzgU6CoUA+ogigjhvJvwQAAqQRTILmOiltsYzMzNDJ12zzgU7moghAF9eEAqQRSwKFS8LuOEVO5qIIQBfXhAKkEUsCgUvC+kXDiaGhoZwRijopbbGMzMzQydNs84FGIoSDBAI6KW2xjMzM0MnnbPOAyIcIAkTHjDfgj+CNWHaByLmhoaWsCVnCDBn9tIwXIywfJ0CYQaAUQSRA3UIgQRhBFyFVg2zzJVhRERBRDMG1t2zxqiwJQggrcbABwf20iyMnQKRBIUTtROgMQVshVYNs8yVYhBFBVFEMwbW3bPGqLAN6CEA+KfqVQCMsfFss/UAT6Algg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIhbrOVfwHKAMyUcDLKAOIB+gIBzxYE/I96ERQRIxEUERMRIhETERIRIRESERERIBERERARHxEQDxEeDw4RHQ4NERwNDBEbDAsRGgsKERkKCREYCQgRFwgHERYHBhEVBgURIwUEESIEAxEhAwIRIAIBER8BViMBESOCCcnDgFYj2zwRExEUERMREhEUERIREREUERHjDW9sbXMBcBEQERQREA8RFA8OERQODREUDQwRFAwLERQLChEUCgkRFAkRFAgHBlVAViNWFoIJycOAViTbPBEVbwL0ERQRIxEUERMRIhETERIRIRESERERIBERERARHxEQDxEeDw4RHQ4NERwNDBEbDAsRGgsKERkKCREYCQgRFwgHERYHBhEVBgURIwUEESIEAxEhAwIRIAIBER8BViMBESOCCcnDgFYj2zwRExEUERMREhEUERIREREUERFvbgFsERARFBEQDxEUDw4RFA4NERQNDBEUDAsRFAsKERQKCREUCREUCAcGVUBWI1YWggnJw4BWJNs8bwKsERMRFxETERIRFhESERERFRERERARFBEQDxEXDw4RFg4NERUNDBEUDAsRFwsKERYKCREVCVYUCQgRGAgHERcHBhEWBgUEERgEAxEXAwIRFgIBERXbPFzBcAP4cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImD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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initMarket_init_args({ $$type: 'Market_init_args', id, owner, coin, amm, factory, underlyingAssetName, duration, collection_content, operatorFee, serviceFee, oracle, feedIdAsset, feedIdToken, operatorFeeAddress })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Market_errors: { [key: number]: { message: string } } = {
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
    27499: { message: `initialized tx need from collection` },
    40368: { message: `Contract stopped` },
    40476: { message: `Amount must be greater than 0` },
    44278: { message: `Insufficient service fee` },
    45223: { message: `Transfer jetton must be from jetton wallet` },
    48542: { message: `ReportData must be from Deal contract` },
    49280: { message: `not owner` },
    49469: { message: `not from collection` },
    51559: { message: `Only operator fee address can withdraw operator fee` },
    53296: { message: `Contract not stopped` },
    57951: { message: `Deal is not created` },
    59867: { message: `Insufficient operator fee` },
}

const Market_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TakeDeal","header":955300085,"fields":[{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"oracleAssetData","type":{"kind":"simple","type":"cell","optional":false}},{"name":"oracleTokenData","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TakeDealData","header":null,"fields":[{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"oracleAssetData","type":{"kind":"simple","type":"cell","optional":false}},{"name":"oracleTokenData","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TakeDealWithOriginalGasTo","header":2027434162,"fields":[{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TakeDealDataWithOriginalGasTo","header":null,"fields":[{"name":"dealId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"oracleAssetData","type":{"kind":"simple","type":"cell","optional":false}},{"name":"oracleTokenData","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"CreateDeal","header":3755427120,"fields":[{"name":"makerPosition","type":{"kind":"simple","type":"bool","optional":false}},{"name":"rateAsset","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rateToken","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"percent","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"expiration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"slippage","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"oracleAssetData","type":{"kind":"simple","type":"cell","optional":true}},{"name":"oracleTokenData","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"InnerDeployMarket","header":1762492384,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawOperatorFee","header":3542167315,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawServiceFee","header":3909931163,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
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
    {"name":"Market$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"amm","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"underlyingAssetName","type":{"kind":"simple","type":"string","optional":false}},{"name":"duration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"operatorFee","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"serviceFee","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"factory","type":{"kind":"simple","type":"address","optional":false}},{"name":"stopped","type":{"kind":"simple","type":"bool","optional":false}},{"name":"countDeal","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"next_item_index","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"mapQueriesToContext","type":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}},{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}},{"name":"feedIdAsset","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"feedIdToken","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"operatorFeeSum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"serviceFeeSum","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"operatorFeeAddress","type":{"kind":"simple","type":"address","optional":false}}]},
]

const Market_getters: ABIGetter[] = [
    {"name":"id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"amm","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"jettonWallet","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
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
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_collection_data","arguments":[],"returnType":{"kind":"simple","type":"CollectionData","optional":false}},
    {"name":"get_nft_address_by_index","arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"getNftItemInit","arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"get_nft_content","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
]

export const Market_getterMapping: { [key: string]: string } = {
    'id': 'getId',
    'amm': 'getAmm',
    'jettonWallet': 'getJettonWallet',
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
    'stopped': 'getStopped',
    'owner': 'getOwner',
    'get_collection_data': 'getGetCollectionData',
    'get_nft_address_by_index': 'getGetNftAddressByIndex',
    'getNftItemInit': 'getGetNftItemInit',
    'get_nft_content': 'getGetNftContent',
}

const Market_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"InnerDeployMarket"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawServiceFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawOperatorFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelDeal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ProcessDeal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReportOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReportData"}},
    {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
    {"receiver":"internal","message":{"kind":"any"}},
]

export class Market implements Contract {
    
    static async init(id: bigint, owner: Address, coin: Address, amm: Address, factory: Address, underlyingAssetName: string, duration: bigint, collection_content: Cell, operatorFee: bigint, serviceFee: bigint, oracle: Address, feedIdAsset: bigint, feedIdToken: bigint, operatorFeeAddress: Address) {
        return await Market_init(id, owner, coin, amm, factory, underlyingAssetName, duration, collection_content, operatorFee, serviceFee, oracle, feedIdAsset, feedIdToken, operatorFeeAddress);
    }
    
    static async fromInit(id: bigint, owner: Address, coin: Address, amm: Address, factory: Address, underlyingAssetName: string, duration: bigint, collection_content: Cell, operatorFee: bigint, serviceFee: bigint, oracle: Address, feedIdAsset: bigint, feedIdToken: bigint, operatorFeeAddress: Address) {
        const init = await Market_init(id, owner, coin, amm, factory, underlyingAssetName, duration, collection_content, operatorFee, serviceFee, oracle, feedIdAsset, feedIdToken, operatorFeeAddress);
        const address = contractAddress(0, init);
        return new Market(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Market(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Market_types,
        getters: Market_getters,
        receivers: Market_receivers,
        errors: Market_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: InnerDeployMarket | WithdrawServiceFee | WithdrawOperatorFee | TokenNotification | CancelDeal | ProcessDeal | ReportOwner | ReportData | 'Resume' | 'Stop' | Slice) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InnerDeployMarket') {
            body = beginCell().store(storeInnerDeployMarket(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawServiceFee') {
            body = beginCell().store(storeWithdrawServiceFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawOperatorFee') {
            body = beginCell().store(storeWithdrawOperatorFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
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
    
    async getJettonWallet(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('jettonWallet', builder.build())).stack;
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