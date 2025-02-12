
export interface PyPayrollOperationDetalEditResponsDto {
    result: PyPayrollOperationPersonDetailsDto;
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}

export class PyPayrollOperationPersonDetailsDto {
    pyPayrollOperationPersonId: number;
    sourceCodeLkpId: number;
    sourceId: number;
    sourceName: string;
    earningAmount: number;
    deductionAmount: number;
    periodNameAr: string;
    periodNameEn: string;
    bankNameAr: string;
    bankNameEn: string;
    hrPersonName: string;
    hrPersonNumber: string;
    pyPayrollTypeName: string;
    startDate: string;
    endDate: string;
    accountNumber: string;
    payrollNetValue: string;
    totalPay: string;
    tenantId: number;
    id:number;
    tenantLogoPath: string;
    tenancyname: string;
    personDetailsList: PyPayrollOperationPersonDetailsDto[];
}

