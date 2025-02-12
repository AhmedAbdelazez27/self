export class HrPersonsEditDto{
    fullName:string;
    phoneNumber:string;
    region:string;
    residencePlace:string;
    employeeNumber:string;
    firstName:string;
    fatherName:string;
    lastName:string;
    placeOfBirth:string;
    emailAddress:string;
    personPhoto:string;
    accountNumber:string;
    iBAN :string;
    allowSelfService:boolean;  
    hireDate:string;
    birthDate:string;
    probationEndDate:string;
    probationLength:number;
    noOfTickets:number;
    ticketAfterYears:number;
    ticketAmount:number;
    noticeLength:number;
    hrOrganizationsDeptId:number;
    hrOrganizationsBranchId:number;
    hrPersonSupervisorId:number;
    pyPayrollTypeId:number;
    genderLkpId  :number; 
    personTypeLkpId:number;   
    nationalityLkpId:number;   
    maritalStatusLkpId:number;   
    statusLkpId:number;   
    jobGradeLkpId:number;   
    jobLkpId?:number;   
    personCategoryLkpId?:number;   
    firstTitleLkpId?:number;   
    sponserLkpId?:number;   
    countryOfBrithLkpId?:number;   
    probationUnitLkpId?:number;   
    destinationCountryLkpId?:number;   
    ticketClassLkpId?:number;   
    noticeUnitLkpId?:number;   
    paymentTypeLkpId?:number;   
    bankLkpId?:number;   
    visaDetails:HrPersonVisaDetailsDto[]=[];
    employeeAddress:HrPersonAddressDetailsDto[]=[];
    passportDetails:HrPersonPassportDetailsDto[];
    identityCards:HrPersonIdentityCardDto[];
    aalaryElements:HrPersonSalaryElementsDto[];
    attachments:HrPersonAttachmentsDto[]=[];
    id:number;
    healthCardDetails : HrPersonHealthCardDetailsDto[]=[];
    annualLeaveBalance :number; 
    employeeHealthCards : HrPersonHealthCardDetailsDto[]=[];
    jobAttachments:HrPersonJobAttachmentsDto[]=[];

}
 
 
export class HrPersonVisaDetailsDto{
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
}

//Ajith
export class HrPersonAddressDetailsDto{
    hrPersonId:Number;  
    hrPersons  :string;
    addressTypeLkpId?:number;  
    fndAddressTypeLkp  :string;
    addressDetails  :string;
    cityLkpId?  :number;
    fndCityLkp  :string;
    countryLkpId :number;  
    fndCountryLkp  :string;
    telephone :number;
    mobile  :number;
    id:Number;
    tenantId:Number;
    rowStatus:String;
}
//Ajith
export class  HrPersonPassportDetailsDto{
    passportNumber:string;  
    placeOfIssue:string;  
    notes:string;  
    dateOfIssue :string; 
    dateOfExpiry:string;  
    hrPersonId :number; 
    passportTypeLkpId:number;  
    countryOfIssueLkpId:number  
    passportTypeLkp :string; 
    countryOfIssueLkp:string;  
    rowStatus:string;  
    id:number;
}
export class HrPersonIdentityCardDto{
    segment1 :string; 
    segment2 :string; 
    segment3:string;  
    segment4 :string; 
    idNumber:string;  
    cardNo:string;  
    notes :string; 
    dateOfExpiry :string; 
    hrPersonId :number; 
    rowStatus:string;   
    id:number;
}
export class HrPersonSalaryElementsDto{
      pyElementId :number; 
      startPeriodId  :number;
      endPeriodId ?:number; 
      hrPersonId :number; 
      amount:number;  
      notes :string; 
      pyElementName :string; 
      startPeriodNameAr:string;  
      startPeriodNameEn :string; 
      endPeriodNameAr :string; 
      endPeriodNameEn :string; 
      rowStatus :string; 
      startPeriod  :PeriodsDates
      endPeriod  :PeriodsDates
}
export class HrPersonAttachmentsDto{
    attachmentName:string;
    filePath:string;
    hrPersonId:number;
    id:number;
    rowStatus :string; 
    tenantId:number;

}
export class PeriodsDates
{
        startDate :string;
        endDate :string;
}

export class HrPersonHealthCardDetailsDto{
    healthCardTypeLkpId : number;
    healthCardType: string;
    healthCardNumber : string;
    issuedBy : String;
    issueDate : string;
    expiryDate : string;
    healthCardCost : number;
    comments : string;
    rowStatus:string;
    hrPersonId:number;
    tenantId:number;
    id:number;
}

export class HrPersonJobAttachmentsDto{
    jobAttachmentName:string;
    filePath:string;
    hrPersonId:number;
    id:number;
    rowStatus :string; 
    tenantId:number; 
}
