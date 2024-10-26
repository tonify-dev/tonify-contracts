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

export type CheckAndReturnPriceForTest = {
    $$type: 'CheckAndReturnPriceForTest';
    feedId: bigint;
    price: bigint;
    timestamp: bigint;
    needBounce: boolean;
}

export function storeCheckAndReturnPriceForTest(src: CheckAndReturnPriceForTest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(64984234, 32);
        b_0.storeUint(src.feedId, 8);
        b_0.storeCoins(src.price);
        b_0.storeUint(src.timestamp, 64);
        b_0.storeBit(src.needBounce);
    };
}

export function loadCheckAndReturnPriceForTest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 64984234) { throw Error('Invalid prefix'); }
    let _feedId = sc_0.loadUintBig(8);
    let _price = sc_0.loadCoins();
    let _timestamp = sc_0.loadUintBig(64);
    let _needBounce = sc_0.loadBit();
    return { $$type: 'CheckAndReturnPriceForTest' as const, feedId: _feedId, price: _price, timestamp: _timestamp, needBounce: _needBounce };
}

function loadTupleCheckAndReturnPriceForTest(source: TupleReader) {
    let _feedId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _timestamp = source.readBigNumber();
    let _needBounce = source.readBoolean();
    return { $$type: 'CheckAndReturnPriceForTest' as const, feedId: _feedId, price: _price, timestamp: _timestamp, needBounce: _needBounce };
}

function loadGetterTupleCheckAndReturnPriceForTest(source: TupleReader) {
    let _feedId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _timestamp = source.readBigNumber();
    let _needBounce = source.readBoolean();
    return { $$type: 'CheckAndReturnPriceForTest' as const, feedId: _feedId, price: _price, timestamp: _timestamp, needBounce: _needBounce };
}

function storeTupleCheckAndReturnPriceForTest(source: CheckAndReturnPriceForTest) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.feedId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.timestamp);
    builder.writeBoolean(source.needBounce);
    return builder.build();
}

function dictValueParserCheckAndReturnPriceForTest(): DictionaryValue<CheckAndReturnPriceForTest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCheckAndReturnPriceForTest(src)).endCell());
        },
        parse: (src) => {
            return loadCheckAndReturnPriceForTest(src.loadRef().beginParse());
        }
    }
}

export type CheckAndReturnPrice = {
    $$type: 'CheckAndReturnPrice';
    queryId: bigint;
    feedId: bigint;
    price: bigint;
    timestamp: bigint;
    needBounce: boolean;
    feedId2: bigint;
    price2: bigint;
    timestamp2: bigint;
    needBounce2: boolean;
}

export function storeCheckAndReturnPrice(src: CheckAndReturnPrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(64984234, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.feedId, 8);
        b_0.storeCoins(src.price);
        b_0.storeUint(src.timestamp, 64);
        b_0.storeBit(src.needBounce);
        b_0.storeUint(src.feedId2, 8);
        b_0.storeCoins(src.price2);
        b_0.storeUint(src.timestamp2, 64);
        b_0.storeBit(src.needBounce2);
    };
}

export function loadCheckAndReturnPrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 64984234) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _feedId = sc_0.loadUintBig(8);
    let _price = sc_0.loadCoins();
    let _timestamp = sc_0.loadUintBig(64);
    let _needBounce = sc_0.loadBit();
    let _feedId2 = sc_0.loadUintBig(8);
    let _price2 = sc_0.loadCoins();
    let _timestamp2 = sc_0.loadUintBig(64);
    let _needBounce2 = sc_0.loadBit();
    return { $$type: 'CheckAndReturnPrice' as const, queryId: _queryId, feedId: _feedId, price: _price, timestamp: _timestamp, needBounce: _needBounce, feedId2: _feedId2, price2: _price2, timestamp2: _timestamp2, needBounce2: _needBounce2 };
}

function loadTupleCheckAndReturnPrice(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _feedId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _timestamp = source.readBigNumber();
    let _needBounce = source.readBoolean();
    let _feedId2 = source.readBigNumber();
    let _price2 = source.readBigNumber();
    let _timestamp2 = source.readBigNumber();
    let _needBounce2 = source.readBoolean();
    return { $$type: 'CheckAndReturnPrice' as const, queryId: _queryId, feedId: _feedId, price: _price, timestamp: _timestamp, needBounce: _needBounce, feedId2: _feedId2, price2: _price2, timestamp2: _timestamp2, needBounce2: _needBounce2 };
}

function loadGetterTupleCheckAndReturnPrice(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _feedId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _timestamp = source.readBigNumber();
    let _needBounce = source.readBoolean();
    let _feedId2 = source.readBigNumber();
    let _price2 = source.readBigNumber();
    let _timestamp2 = source.readBigNumber();
    let _needBounce2 = source.readBoolean();
    return { $$type: 'CheckAndReturnPrice' as const, queryId: _queryId, feedId: _feedId, price: _price, timestamp: _timestamp, needBounce: _needBounce, feedId2: _feedId2, price2: _price2, timestamp2: _timestamp2, needBounce2: _needBounce2 };
}

function storeTupleCheckAndReturnPrice(source: CheckAndReturnPrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.feedId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.timestamp);
    builder.writeBoolean(source.needBounce);
    builder.writeNumber(source.feedId2);
    builder.writeNumber(source.price2);
    builder.writeNumber(source.timestamp2);
    builder.writeBoolean(source.needBounce2);
    return builder.build();
}

function dictValueParserCheckAndReturnPrice(): DictionaryValue<CheckAndReturnPrice> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCheckAndReturnPrice(src)).endCell());
        },
        parse: (src) => {
            return loadCheckAndReturnPrice(src.loadRef().beginParse());
        }
    }
}

export type OracleMock$Data = {
    $$type: 'OracleMock$Data';
    id: bigint;
}

export function storeOracleMock$Data(src: OracleMock$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 32);
    };
}

export function loadOracleMock$Data(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(32);
    return { $$type: 'OracleMock$Data' as const, id: _id };
}

function loadTupleOracleMock$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    return { $$type: 'OracleMock$Data' as const, id: _id };
}

function loadGetterTupleOracleMock$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    return { $$type: 'OracleMock$Data' as const, id: _id };
}

function storeTupleOracleMock$Data(source: OracleMock$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    return builder.build();
}

function dictValueParserOracleMock$Data(): DictionaryValue<OracleMock$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOracleMock$Data(src)).endCell());
        },
        parse: (src) => {
            return loadOracleMock$Data(src.loadRef().beginParse());
        }
    }
}

 type OracleMock_init_args = {
    $$type: 'OracleMock_init_args';
    id: bigint;
}

function initOracleMock_init_args(src: OracleMock_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
    };
}

async function OracleMock_init(id: bigint) {
    const __code = Cell.fromBase64('te6ccgECCwEAAigAART/APSkE/S88sgLAQIBYgIDApjQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4ILI+EMBzH8BygABAcsfye1UBAUAEaGFfdqJoaQAAwBG7UTQ1AH4Y9IAAZTTHwEx4Pgo1wsKgwm68uCJgQEB1wABAdED3gGSMH/gcCHXScIflTAg1wsf3iCCC9+UqrqPSDDbPGwZMIIAoh4EsxTy9MiCEJNfqdEByx8Xyz8FyMv/FMv/EssvyVADzAHIy/8Ty//LL8kBzMn4QnCAQFgDfwEUQzBtbds8f+CCEJRqmLa64wIwcAYJBwBA0x8BggvflKq68uCB0z/TB/oA0z/SANMH+gDTP9IAVYABTtMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fwgBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8CQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAKAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjM');
    const __system = Cell.fromBase64('te6cckECDQEAAjIAAQHAAQEFocrBAgEU/wD0pBP0vPLICwMCAWIEDAKY0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wds88uCCyPhDAcx/AcoAAQHLH8ntVAUGAEbtRNDUAfhj0gABlNMfATHg+CjXCwqDCbry4ImBAQHXAAEB0QPeAZIwf+BwIddJwh+VMCDXCx/eIIIL35Squo9IMNs8bBkwggCiHgSzFPL0yIIQk1+p0QHLHxfLPwXIy/8Uy/8Syy/JUAPMAcjL/xPL/8svyQHMyfhCcIBAWAN/ARRDMG1t2zx/4IIQlGqYtrrjAjBwBwoIAEDTHwGCC9+Uqrry4IHTP9MH+gDTP9IA0wf6ANM/0gBVgAFO0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/CQE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwKAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAsAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAEaGFfdqJoaQAAyIaywo=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initOracleMock_init_args({ $$type: 'OracleMock_init_args', id })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const OracleMock_errors: { [key: number]: { message: string } } = {
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
    41502: { message: `Need bounce` },
}

const OracleMock_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CheckAndReturnPriceForTest","header":64984234,"fields":[{"name":"feedId","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"needBounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"CheckAndReturnPrice","header":64984234,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"feedId","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"needBounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"feedId2","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"price2","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"timestamp2","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"needBounce2","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"OracleMock$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const OracleMock_getters: ABIGetter[] = [
]

export const OracleMock_getterMapping: { [key: string]: string } = {
}

const OracleMock_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CheckAndReturnPrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class OracleMock implements Contract {
    
    static async init(id: bigint) {
        return await OracleMock_init(id);
    }
    
    static async fromInit(id: bigint) {
        const init = await OracleMock_init(id);
        const address = contractAddress(0, init);
        return new OracleMock(address, init);
    }
    
    static fromAddress(address: Address) {
        return new OracleMock(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  OracleMock_types,
        getters: OracleMock_getters,
        receivers: OracleMock_receivers,
        errors: OracleMock_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CheckAndReturnPrice | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CheckAndReturnPrice') {
            body = beginCell().store(storeCheckAndReturnPrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}