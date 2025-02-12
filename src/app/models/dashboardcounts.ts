export interface dashboardcounts {
    result: dashboardcountsResult;
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
export interface dashboardcountsResult {
    totalRequests:number;
    acceptedRequests:number;
    delayedRequests:number;
    refusedRequests:number;
}
