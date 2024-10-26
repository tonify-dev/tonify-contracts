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

export type SetPrice = {
    $$type: 'SetPrice';
    queryId: bigint;
    data: Cell;
    data_2: Cell;
}

export function storeSetPrice(src: SetPrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(623813157, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeRef(src.data);
        b_0.storeRef(src.data_2);
    };
}

export function loadSetPrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 623813157) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _data = sc_0.loadRef();
    let _data_2 = sc_0.loadRef();
    return { $$type: 'SetPrice' as const, queryId: _queryId, data: _data, data_2: _data_2 };
}

function loadTupleSetPrice(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _data = source.readCell();
    let _data_2 = source.readCell();
    return { $$type: 'SetPrice' as const, queryId: _queryId, data: _data, data_2: _data_2 };
}

function loadGetterTupleSetPrice(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _data = source.readCell();
    let _data_2 = source.readCell();
    return { $$type: 'SetPrice' as const, queryId: _queryId, data: _data, data_2: _data_2 };
}

function storeTupleSetPrice(source: SetPrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.data);
    builder.writeCell(source.data_2);
    return builder.build();
}

function dictValueParserSetPrice(): DictionaryValue<SetPrice> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetPrice(src)).endCell());
        },
        parse: (src) => {
            return loadSetPrice(src.loadRef().beginParse());
        }
    }
}

export type CheckTactOracle$Data = {
    $$type: 'CheckTactOracle$Data';
    id: bigint;
    oracle: Address;
    queryId: bigint | null;
    feedId: bigint | null;
    price: bigint | null;
    timestamp: bigint | null;
}

export function storeCheckTactOracle$Data(src: CheckTactOracle$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.id, 32);
        b_0.storeAddress(src.oracle);
        if (src.queryId !== null && src.queryId !== undefined) { b_0.storeBit(true).storeUint(src.queryId, 64); } else { b_0.storeBit(false); }
        if (src.feedId !== null && src.feedId !== undefined) { b_0.storeBit(true).storeUint(src.feedId, 256); } else { b_0.storeBit(false); }
        if (src.price !== null && src.price !== undefined) { b_0.storeBit(true).storeUint(src.price, 256); } else { b_0.storeBit(false); }
        if (src.timestamp !== null && src.timestamp !== undefined) { b_0.storeBit(true).storeUint(src.timestamp, 64); } else { b_0.storeBit(false); }
    };
}

export function loadCheckTactOracle$Data(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadUintBig(32);
    let _oracle = sc_0.loadAddress();
    let _queryId = sc_0.loadBit() ? sc_0.loadUintBig(64) : null;
    let _feedId = sc_0.loadBit() ? sc_0.loadUintBig(256) : null;
    let _price = sc_0.loadBit() ? sc_0.loadUintBig(256) : null;
    let _timestamp = sc_0.loadBit() ? sc_0.loadUintBig(64) : null;
    return { $$type: 'CheckTactOracle$Data' as const, id: _id, oracle: _oracle, queryId: _queryId, feedId: _feedId, price: _price, timestamp: _timestamp };
}

function loadTupleCheckTactOracle$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _oracle = source.readAddress();
    let _queryId = source.readBigNumberOpt();
    let _feedId = source.readBigNumberOpt();
    let _price = source.readBigNumberOpt();
    let _timestamp = source.readBigNumberOpt();
    return { $$type: 'CheckTactOracle$Data' as const, id: _id, oracle: _oracle, queryId: _queryId, feedId: _feedId, price: _price, timestamp: _timestamp };
}

function loadGetterTupleCheckTactOracle$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _oracle = source.readAddress();
    let _queryId = source.readBigNumberOpt();
    let _feedId = source.readBigNumberOpt();
    let _price = source.readBigNumberOpt();
    let _timestamp = source.readBigNumberOpt();
    return { $$type: 'CheckTactOracle$Data' as const, id: _id, oracle: _oracle, queryId: _queryId, feedId: _feedId, price: _price, timestamp: _timestamp };
}

function storeTupleCheckTactOracle$Data(source: CheckTactOracle$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.oracle);
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.feedId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.timestamp);
    return builder.build();
}

function dictValueParserCheckTactOracle$Data(): DictionaryValue<CheckTactOracle$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCheckTactOracle$Data(src)).endCell());
        },
        parse: (src) => {
            return loadCheckTactOracle$Data(src.loadRef().beginParse());
        }
    }
}

 type CheckTactOracle_init_args = {
    $$type: 'CheckTactOracle_init_args';
    id: bigint;
    oracle: Address;
}

function initCheckTactOracle_init_args(src: CheckTactOracle_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.oracle);
    };
}

async function CheckTactOracle_init(id: bigint, oracle: Address) {
    const __code = Cell.fromBase64('te6ccgECIAEAA/MAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFds88uCCHAQFAgEgDg8EqgGOl4Ag1yHTHwGCC9+UqrqOhNM/2zyRMOJ/4HAh10nCH5UwINcLH94gghAlLqIluo6ZMNMfAYIQJS6iJbry4IHTP9TUVSBsE9s8f+CCEJRqmLa64wIGBwgJAOTI+EMBzH8BygBVUFBWyx9QAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFiFus5Z/AcoAyz+UcDLKAOIhbrOWfwHKAMv/lHAyygDiIW6zln8BygDL/5RwMsoA4iFus5Z/AcoAyz+UcDLKAOLJ7VQAojWLlkdW1wKG1zZymBWNDhGaWxlIGNvbnRyYWN0cy9vcmFjbGUvdGVzdHMvY2hlY2tfdGFjdF9vcmFjbGUudGFjdDozNzo5OoP4UMP4UMP4gMAFQAdAB0NMfMcgC0x8Dyx8Tyz8BzxYBzxbIyQHMyXCDBicDf1UwbW3bPAsBTtMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fwoBdNMfAYIQk1+p0bqOqoEbbfhCUnDHBfL00z/UAdAB1DDQAdP/0//TLzAD0//T/9MvMBBFEDTbPJEw4n8NATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAsByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAAIXwNsRAIFt5cwEBECASAUFQINTbPNs8bGGBwSAg1Ns82zxsYYHBMAAiMAAiACEblsDbPNs8bGGBwWAgFIFxgACPgnbxAAEbCvu1E0NIAAYAIBSBkaAhCpONs82zxsYRwbAhCpG9s82zxsYRwdAAIiAcztRNDUAfhj0gABjk7TH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gABktM/km0B4tIAAZLT/5JtAeLSAAGS0/+SbQHi0gABktM/km0B4lVQbBbg+CjXCwqDCbry4IkeAAIhAVSBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSAtEB2zwfAAhtbW1t');
    const __system = Cell.fromBase64('te6cckECIgEAA/0AAQHAAQEFoCB/AgEU/wD0pBP0vPLICwMCAWIEDwN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRXbPPLggh4FDgSqAY6XgCDXIdMfAYIL35Squo6E0z/bPJEw4n/gcCHXScIflTAg1wsf3iCCECUuoiW6jpkw0x8BghAlLqIluvLggdM/1NRVIGwT2zx/4IIQlGqYtrrjAgYHCAwAojWLlkdW1wKG1zZymBWNDhGaWxlIGNvbnRyYWN0cy9vcmFjbGUvdGVzdHMvY2hlY2tfdGFjdF9vcmFjbGUudGFjdDozNzo5OoP4UMP4UMP4gMAFQAdAB0NMfMcgC0x8Dyx8Tyz8BzxYBzxbIyQHMyXCDBicDf1UwbW3bPAoBTtMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fwkBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8CgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wALAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAXTTHwGCEJNfqdG6jqqBG234QlJwxwXy9NM/1AHQAdQw0AHT/9P/0y8wA9P/0//TLzAQRRA02zyRMOJ/DQAIXwNsRADkyPhDAcx/AcoAVVBQVssfUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOWfwHKAMs/lHAyygDiIW6zln8BygDL/5RwMsoA4iFus5Z/AcoAy/+UcDLKAOIhbrOWfwHKAMs/lHAyygDiye1UAgEgEBUCBbeXMBETAg1Ns82zxsYYHhIAAiMCDU2zzbPGxhgeFAACIAIBIBYYAhG5bA2zzbPGxhgeFwAI+CdvEAIBSBkaABGwr7tRNDSAAGACAUgbHQIQqTjbPNs8bGEeHAACIgIQqRvbPNs8bGEeIQHM7UTQ1AH4Y9IAAY5O0x/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAAZLTP5JtAeLSAAGS0/+SbQHi0gABktP/km0B4tIAAZLTP5JtAeJVUGwW4Pgo1wsKgwm68uCJHwFUgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEgLRAds8IAAIbW1tbQACIZie+Eo=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initCheckTactOracle_init_args({ $$type: 'CheckTactOracle_init_args', id, oracle })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const CheckTactOracle_errors: { [key: number]: { message: string } } = {
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
    7021: { message: `only oracle can send this message` },
}

const CheckTactOracle_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetPrice","header":623813157,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data_2","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"CheckTactOracle$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"oracle","type":{"kind":"simple","type":"address","optional":false}},{"name":"queryId","type":{"kind":"simple","type":"uint","optional":true,"format":64}},{"name":"feedId","type":{"kind":"simple","type":"uint","optional":true,"format":256}},{"name":"price","type":{"kind":"simple","type":"uint","optional":true,"format":256}},{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":true,"format":64}}]},
]

const CheckTactOracle_getters: ABIGetter[] = [
    {"name":"feedId","arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"price","arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"queryId","arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"timestamp","arguments":[],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
]

export const CheckTactOracle_getterMapping: { [key: string]: string } = {
    'feedId': 'getFeedId',
    'price': 'getPrice',
    'queryId': 'getQueryId',
    'balance': 'getBalance',
    'timestamp': 'getTimestamp',
}

const CheckTactOracle_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SetPrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"any"}},
]

export class CheckTactOracle implements Contract {
    
    static async init(id: bigint, oracle: Address) {
        return await CheckTactOracle_init(id, oracle);
    }
    
    static async fromInit(id: bigint, oracle: Address) {
        const init = await CheckTactOracle_init(id, oracle);
        const address = contractAddress(0, init);
        return new CheckTactOracle(address, init);
    }
    
    static fromAddress(address: Address) {
        return new CheckTactOracle(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  CheckTactOracle_types,
        getters: CheckTactOracle_getters,
        receivers: CheckTactOracle_receivers,
        errors: CheckTactOracle_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetPrice | Deploy | Slice) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetPrice') {
            body = beginCell().store(storeSetPrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && message instanceof Slice) {
            body = message.asCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getFeedId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('feedId', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getPrice(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('price', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getQueryId(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('queryId', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getTimestamp(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('timestamp', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
}