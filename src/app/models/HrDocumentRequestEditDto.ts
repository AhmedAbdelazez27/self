export class HrDocumentRequestEditDto{
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
    lastmodificationDate:string;
    supervisorSubmitDate:string;
    supervisorSubmitId:string;
    documentRequestNumber:string;  
    requestDate:string;  
    subject:string;
    comments:string;  
    reason:string;  
    id:number;
    tenantId:number;

    supervisorname?:string;
}