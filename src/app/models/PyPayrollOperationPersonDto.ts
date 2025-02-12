
export interface PyPayrollOperationPersonResponsDto {
    result: PyPayrollOperationPersonDto;
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

export class PyPayrollOperationPersonDto {
    pyPayrollOperationId:number;
    bankLkpId:number;
    hrPersonId:number;
    accountNumber:string;
   // fndBankLkp:string;
    operationNumber:string;
    hrPersonName:string;
    pyPayrollTypeName:string;
    periodName:string;
    startDate:string;
   endDate: string;
    id: number;
    
    
}
