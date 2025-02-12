export class HrPersonHealthCardDetailsEditDto{
    healthCardTypeLkpId : number;
    healthCardType: string;
    healthCardNumber : string;
    issuedBy : String;
    issueDate : string;
    expiryDate : string;
    healthCardCost : number;
    comments : string;
    rowStatus:string;
    id:number;
    hrPersonId:number;
    tenantId:number
}