export class HrPersonVisaDetailsEditDto{
    visaNumber:string;  
    notes  :string;
    visaCost?:number;  
    dateOfIssue  :string;
    dateOfExpiry  :string;
    hrPersonId  :number;
    visaTypeLkpId  :number;
    visaTypeLkp  :string;
    placeOfIssueLkpId?:number;  
    placeOfIssueLkp  :string;
    issuedByLkpId?  :number;
    issuedByLkp  :string;
    rowStatus  :string;
    id:number;
    tenantId:number
}