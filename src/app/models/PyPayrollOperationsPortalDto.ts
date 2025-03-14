export interface PyPayrollOperationsPortalResponsDto {
    result: PyPayrollOperationsPortalDto;
    targetUrl: string;
    success: boolean;
    error: string;
    unAuthorizedRequest: boolean;
    __abp: boolean;
}
export class PyPayrollOperationsPortalDto {
    operationNumber: string;
    operationDate: string;
    fndStatusLkpStr: string;
    fndJobLkpStr: string;
    periodsStr: string;
    hrPersonsStr: string;
    hrPersonId:string;
    pyPayrollTypesStr: string;
    notes: string
    tenantId: number;
    id: number;

}

    // pyPayrollOperationPersonId: number;
    // sourceCodeLkpId: number;
    // sourceId: number;
    // sourceName: string;
    // earningAmount: number;
    // deductionAmount: number;
    // periodNameAr: string;
    // periodNameEn: string;
    // bankNameAr: string;
    // bankNameEn: string;
    // hrPersonName: string;
    // hrPersonNumber: string;
    // pyPayrollTypeName: string;
    // startDate: string;
    // endDate: string;
    // accountNumber: string;
    // payrollNetValue: string;


