export interface portalgetall {
    params?:params;
    orderByValue:orderByValue;
    skipCount: number;
    maxResultCount: number;
}
export interface params {
    tenantId: number;
}
export interface orderByValue{
    colId: string;
    sort: string;
}