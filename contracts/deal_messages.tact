message GetData {
    queryId: Int as uint64;
}
message ReportData {
    queryId: Int as uint64;
    id: Int as uint32;
    data: Cell;
}
message SaveData {
    queryId: Int as uint64;
    originalGasTo: Address;
    data: Cell;
}
message DeleteData {
    queryId: Int as uint64;
    originalGasTo: Address;
}