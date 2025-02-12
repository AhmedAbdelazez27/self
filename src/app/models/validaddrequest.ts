export class portaladdrequest {
    result: portaladdrequestresult;
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

export class portaladdrequestresult {
    finalStatues:string;
    reason:string
}