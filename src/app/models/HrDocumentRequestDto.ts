export interface HrDocumentRequestResponsDto {
    result: HrDocumentRequestDto[];
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
export class HrDocumentRequestDto{
    filePath:string;
    statusLkpId:number;
    fndStatusLkp:string;
    portalStatusLkpId:number;
    PortalStatusLkp:string;
    documentLkpId:number;
    documentLkp:string;
    hrPersonId:number;
    hrPersons:string;
    submittedTo:string;
    desc:string;
    documentRequestNumber:string;  
    requestDate:string;  
    subject:string;
    comments:string;  
    reason:string;
    postUserName:string;
    lastmodificationDate:string; 
    id:number;
    supervisorname :string;
    supervisorSubmitDate : string;
    documentRequest:HrDocumentRequestDto[]=[];
}

export class HrTeamAvailableResponseDto {
    result: HrTeamAvailableDto;
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
export class HrTeamAvailableDto{
    photo:string;
    name:string;
    status:string; 
    id:number;
}
