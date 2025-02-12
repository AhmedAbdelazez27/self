import { HrPersonsDto } from "./HrPersonsDto";

export interface HrEmployeeResignationResponsDto {
    result: HrEmployeeResignationDto;
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
export class HrEmployeeResignationDto{
    resignationNumber :string;
    resignationDate : string;
    requestDate : string;
    noticeDate :string;
    hrPersonId:number;
    hrPersons:HrPersonsDto;
    statusLkpId:number;
    statusLkp:string;
    reason:string;
    resignationTypeLkpId:number;
    resignationTypeLkp:string;
    tenantId:number;
    // isFromPortal:boolean;
    requestStatusLkpId :number;
    requestStatus :string;
    id:number;

}