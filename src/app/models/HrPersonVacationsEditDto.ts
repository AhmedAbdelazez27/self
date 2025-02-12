export class HrPersonVacationsEditDto{
    operationNumber :string;
    vacationBalance : number;
    operationDate : string;
    startDate : string;
    endDate :string;
    statusLkpId:number;
    hrVacationsTypeId:string;
    hrPersonId:number;
    noOfDays:number;
    notes:string;
    fndStatusLkp:string;
    tenantId:number;
    isFromPortal:boolean;
    portalStatusLkpId :number;
    fndPortalStatusLkp :string;
    id:number;
    hrVacationsTypeName:string;
    hrPersonName:string; 
    isOutCountryLeave:string;
    attachmentPath:string;
    attachmentRequired:string;
    reason:string;
   // hrAlternativePersonId:number;
   postDate:string;
   supervisorSubmitDate:string;
   postUserId:string;
   supervisorSubmitId:string;
}