export interface Selectdropdown {
    result: SelectdropdownResult;
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
export interface SelectdropdownResult {
    total: number;
    results: SelectdropdownResultResults[];
}
export interface SelectdropdownResultResults{
    id: number;
    text: string;
    altText: string;
}