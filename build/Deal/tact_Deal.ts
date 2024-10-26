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

 type Deal_init_args = {
    $$type: 'Deal_init_args';
    id: bigint;
    owner: Address;
}

function initDeal_init_args(src: Deal_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.owner);
    };
}

async function Deal_init(id: bigint, owner: Address) {
    const __code = Cell.fromBase64('te6ccgECFgEAA0EAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCEwQFAgEgCwwE8AGSMH/gcCHXScIflTAg1wsf3iCCEK/pNTW6j1Ew0x8BghCv6TU1uvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUVSBsEzKCCJiWgHD7AkQ02zwwA3CDBnBVIG1tbds8WX/gIIIQuKOqFLrjAggJBgcAgMj4QwHMfwHKAFUgUCPLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOLJ7VQClDDTHwGCELijqhS68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSMXAg+wJVINs8A3CBAKBwVSBtbW3bPFh/CAkBtIIQ5gH45bqOztMfAYIQ5gH45bry4IHTPwExggiYloBw+wL4QW8kECNfA3CDBn8lIG7y0IBUJYDIVSCCELaHqxdQBMsfEss/yx/MyRA0QTAUQzBtbds8f+AwcAkAEvhCUiDHBfLghAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAKAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAhG+KO7Z5tnjYYwTDQIBIA4PAAIhAgFIEBEAEbgr7tRNDSAAGAIRsdi2zzbPGwxgExICEbNkNs82zxsMYBMUAAIgAeLtRNDUAfhj0gABji/TH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gABkdSSbQHiVSBsE+D4KNcLCoMJuvLgiYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBIC0QHbPBUAAiIAAm0=');
    const __system = Cell.fromBase64('te6cckECGAEAA0sAAQHAAQEFoIOPAgEU/wD0pBP0vPLICwMCAWIEDAN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRLbPPLgghQFCwTwAZIwf+BwIddJwh+VMCDXCx/eIIIQr+k1NbqPUTDTHwGCEK/pNTW68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdRVIGwTMoIImJaAcPsCRDTbPDADcIMGcFUgbW1t2zxZf+AgghC4o6oUuuMCBwkGCAKUMNMfAYIQuKOqFLry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBIxcCD7AlUg2zwDcIEAoHBVIG1tbds8WH8HCQAS+EJSIMcF8uCEAbSCEOYB+OW6js7THwGCEOYB+OW68uCB0z8BMYIImJaAcPsC+EFvJBAjXwNwgwZ/JSBu8tCAVCWAyFUgghC2h6sXUATLHxLLP8sfzMkQNEEwFEMwbW3bPH/gMHAJAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAoAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAgMj4QwHMfwHKAFUgUCPLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOLJ7VQCASANDwIRviju2ebZ42GMFA4AAiECASAQFwIBSBETAhGx2LbPNs8bDGAUEgACIAIRs2Q2zzbPGwxgFBYB4u1E0NQB+GPSAAGOL9Mf+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAAGR1JJtAeJVIGwT4Pgo1wsKgwm68uCJgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEgLRAds8FQACbQACIgARuCvu1E0NIAAYfRNzRw==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initDeal_init_args({ $$type: 'Deal_init_args', id, owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Deal_errors: { [key: number]: { message: string } } = {
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
}

const Deal_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetData","header":3858888933,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportData","header":3062344471,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"SaveData","header":2951296309,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"DeleteData","header":3097733652,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"originalGasTo","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deal$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
]

const Deal_getters: ABIGetter[] = [
    {"name":"id","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"data","arguments":[],"returnType":{"kind":"simple","type":"cell","optional":true}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const Deal_getterMapping: { [key: string]: string } = {
    'id': 'getId',
    'data': 'getData',
    'owner': 'getOwner',
}

const Deal_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"SaveData"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DeleteData"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetData"}},
]

export class Deal implements Contract {
    
    static async init(id: bigint, owner: Address) {
        return await Deal_init(id, owner);
    }
    
    static async fromInit(id: bigint, owner: Address) {
        const init = await Deal_init(id, owner);
        const address = contractAddress(0, init);
        return new Deal(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Deal(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Deal_types,
        getters: Deal_getters,
        receivers: Deal_receivers,
        errors: Deal_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SaveData | DeleteData | GetData) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SaveData') {
            body = beginCell().store(storeSaveData(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DeleteData') {
            body = beginCell().store(storeDeleteData(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetData') {
            body = beginCell().store(storeGetData(message)).endCell();
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
    
    async getData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('data', builder.build())).stack;
        let result = source.readCellOpt();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}