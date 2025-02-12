export interface PortalPersonDtoResponse {
    result: HrPersonsDto;
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
 
export class FndLookupValuesDto{
    nameEn:string;
    nameAr:string;
    lookupCode:string;
    lookupType:string;
    yesNo:boolean;
    addedValues:string;
    lastModificationTime:string;
    lastModifierUserId:number;
    creationTime:string;
    creatorUserId:number;
    id:number;
}
export class HrPersonsDto{
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
    iban :string;
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
    hrOrganizationsDept:HrOrganizationsDto;
    hrOrganizationsBranchId:number;
    hrOrganizationsBranch:HrOrganizationsDto;
    hrPersonSupervisorId:number;
    hrPersonSupervisor:HrPersonsDto;
    pyPayrollTypeId:number;
    genderLkpId  :number; 
    fndGenderLkp:FndLookupValuesDto;   
    personTypeLkpId:number;   
    fndPersonTypeLkp:FndLookupValuesDto;   
    nationalityLkpId:number;   
    fndNationalityLkp:FndLookupValuesDto;   
    maritalStatusLkpId:number;   
    fndMaritalStatusLkp:FndLookupValuesDto;   
    statusLkpId:number;   
    fndStatusLkp:FndLookupValuesDto;   
    jobGradeLkpId:number;   
    fndJobGradeLkp:FndLookupValuesDto;   
    jobLkpId?:number;   
    fndJobLkp:FndLookupValuesDto;   
    personCategoryLkpId?:number;   
    fndPersonCategoryLkp:FndLookupValuesDto;   
    firstTitleLkpId?:number;   
    fndFirstTitleLkp:FndLookupValuesDto;   
    sponserLkpId?:number;   
    fndSponserLkp:FndLookupValuesDto;   
    countryOfBrithLkpId?:number;   
    fndCountryOfBrithLkp:FndLookupValuesDto;   
    probationUnitLkpId?:number;   
    fndProbationUnitLkp:FndLookupValuesDto;   
    destinationCountryLkpId?:number;   
    fndDestinationCountryLkp:FndLookupValuesDto;   
    ticketClassLkpId?:number;   
    fndTicketClassLkp:FndLookupValuesDto;   
    noticeUnitLkpId?:number;   
    fndNoticeUnitLkp:FndLookupValuesDto;   
    paymentTypeLkpId?:number;   
    fndPaymentTypeLkp:FndLookupValuesDto;   
    bankLkpId?:number;   
    fndBankLkp:FndLookupValuesDto;   
    hrPersonVisaDetails:HrPersonVisaDetailsDto[]=[];
    hrPersonAddressDetails:HrPersonAddressDetailsDto[]=[];
    hrPersonPassportDetails:HrPersonPassportDetailsDto[];
    hrPersonIdentityCard:HrPersonIdentityCardDto[];
    hrPersonSalaryElements:HrPersonSalaryElementsDto[];
    hrPersonAttachments:HrPersonAttachmentsDto[]=[];
    hrPersonHealthCardDetails:HrPersonHealthCardDetailsDto[]=[];
    hrPersonJobAttachments:HrPersonJobAttachmentsDto[]=[];
    id:number;
    fndFirstTitleStr : string;
    fndStatusStr : string;
    fndJobStr : string;
    fndJobGradeStr : string;
    hrOrganizationsBranchStr : string;
    fndNationalityStr : string;
    fndGenderStr : string; 
    annualLeaveBalance :number;
}
export class HrOrganizationsDto{
    organizationName:string;  
    shortName :string;
    notes  :string;
    organizationTypeLkpId :number;
    parentPath :string;
    parentId :number;
    parent: HrOrganizationsDto  ;
    fndOrganizationTypeLkp :FndLookupValuesDto;
}
export class PyPayrollTypesDto{
    payrollTypeNumber:string;
    pyPayrollTypeName:string;
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
export class HrPersonAddressDetailsDto{
    hrPersonId:Number;  
    hrPersons  :string;
    addressTypeLkpId?:number;  
    fndAddressTypeLkp  :string;
    addressDetails  :string;
    cityLkpId?  :number;
    fndCityLkp :string;
    countryLkpId :number;  
    fndCountryLkp  :string;
    telephone :number;
    mobile  :number;
    id:Number;
    tenantId:Number;
    rowStatus:String;
}
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