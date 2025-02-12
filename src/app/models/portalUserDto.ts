
import { EditUserRelativesDto } from './editUserRelatives';
import { PortalUserAttachmentsDto } from './PortalUserAttachmentsDto';
import { ScPortalRequestDuties } from './ScPortalRequestDuties';
import { ScPortalRequestIncome } from './ScPortalRequestIncome';

export interface PortalUserDtoResponse {
    result: PortalUserDto;
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
export class PortalUserDto{
    encId:string;
    user:UserDto;
    name:string;
    nameEn:string;
    employer:string;
    notes:string;
    birthDate:string;
    birthDateStr:string;
    idExpirationDate:string;
    idExpirationDateStr:string;
    genderLkpId:number;
    cityLkpId:number;
    caseCategoryLkpId:number;
    qualificationLkpId:number;
    educationalStageLkpId:number;
    maritalStatusLkpId:number;
    region:string;
    idNumber:string;
    wifeHusbandName1:string;
    idNumberWifeHusband1:string;
    jobWifeHusband1:string;
    wifeNationalityLkpId:number;
    wifeIdExpirationDate:string;
    wifeHelthStatusLkpId:number;
    wifeQualificationLkpId:number;
    wifeName2:string;
    idNumberWife2:string;
    jobWife2:string;
    wifeNationality2LkpId:number;
    wifeIdExpirationDate2:string;
    wifeHelthStatus2LkpId:number;
    wifeQualification2LkpId:number;
    wifeName3:string;
    idNumberWife3:string;
    jobWife3:string;
    wifeNationality3LkpId:number;
    wifeIdExpirationDate3:string;
    wifeHelthStatus3LkpId:number;
    wifeQualification3LkpId:number;
    wifeName4:string;
    idNumberWife4:string;
    jobWife4:string;
    wifeNationality4LkpId:number;
    wifeIdExpirationDate4:string;
    wifeHelthStatus4LkpId:number;
    wifeQualification4LkpId:number;
    branchLkpId:number;
    passportNumber:string;
    unifiedNumber:string;
    passportIssueDate:string;
    passportExpiryDate:string;
    residenceEndDate:string;
    passportIssueDateStr:string;
    passportExpiryDateStr:string;
    residenceEndDateStr:string;
    nationalityLkpId:number;
    mobileNumber1:string;
    mobileNumber2:string;
    jobDescription:string;
    job:string;
    sponsorName:string;
    countryNo:string;
    address:string;
    userName:string;
    
    emailAddress:string;
    hasNoRequests:boolean;
    idNumbersRepeated:boolean;
    userDuties:ScPortalRequestDuties[];
    userIncomes:ScPortalRequestIncome[];
    genderFndLookupValues:FndLookupValuesDto[];
    cityFndLookupValues:FndLookupValuesDto[];
    nationalityFndLookupValues:FndLookupValuesDto[];
    educationalStage:FndLookupValuesDto[];
    maritalStatusFndLookupValues:FndLookupValuesDto[];	
    qualificationFndLookupValues:FndLookupValuesDto[];
    fndCaseCategoryLkp:FndLookupValuesDto[];
    relatives:EditUserRelativesDto[];
    userRelatives:EditUserRelativesDto[];
    userAttachments:PortalUserAttachmentsDto[]=[];
   // userFinancial:EditUserFinancialDto[];
   bankLkpId:number;
    bankLkp:FndLookupValuesDto[];
    accountNumber:string;
    accountOwner:string;
    ibanNumber:string;
    id:number;

    electricityMeterNumber:string;
    houseNumber:string;
}
export class UserDto{
    userName:string;
    name:string;
    surname:string;
    emailAddress:string;
    isActive:boolean;
    fullName:string;
    lastLoginTime:string;
    creationTime:string;
    roleNames:[]
    id:number;
    portalRequestNumber:string;
    tenantId:number;
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