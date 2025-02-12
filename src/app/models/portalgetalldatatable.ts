export class portalgetalldatatable {
    get(arg0: string) {
      throw new Error('Method not implemented.');
    }
    result: portalgetalldatatableResult;
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
export class portalgetalldatatableResult {
    totalCount:number;
    items:ScPortalRequest[]
}
export class ScPortalRequest {
    tenantId: number;
    portalUsersId: number;
    portalRequestDate:string;
    portalRequestNumber:string;
    name:string;
    id:number;
    statusLkpId:number;
}
