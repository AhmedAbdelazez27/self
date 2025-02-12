export interface tokenrequest {
    result: tokenrequestResult;
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
export interface tokenrequestResult {
    accessToken:string;
    encryptedAccessToken:string;
    expireInSeconds:number;
    userId:number;
    status:number;
    userName:string;
    message:string;
    tenantId:number;
}
