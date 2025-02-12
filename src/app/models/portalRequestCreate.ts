import { ScPortalRequestDuties } from './ScPortalRequestDuties';
import { ScPortalRequestIncome } from './ScPortalRequestIncome';

export class portalRequestCreate {
    tenantId:number;
    portalRequestNumber:string;
    portalRequestDate:string|Date;
    portalRequestDateStr:string;
    idExpirationDate:string;
    idExpirationDateStr:string;
    aidRequestTypeLkpId:number;
    aidRequestTrTypeId:number=null;
    AidRequestTypeTrName:string;
    sourceLkpId:number;
    aidRequestTypeTr:PortalRequestScFndAidRequestTypeTrDto[];
    statusLkpId:number;
    description:string;
    requestAttachments:PortalRequestAttachmentCreate[];
    requestAttachments2:PortalUserAttachmentsCreate[];
    requestDuties:ScPortalRequestDuties[];
    requestIncomes:ScPortalRequestIncome[];
    scPortalRequestVisitedList=null;
    id:number;
    branchLkpId:number;
}
export class PortalRequestAttachmentCreate{
    tenantId:number;
    portalRequestId:number;
    filePath:string;
    protalAttachmentSettingId:number;
    rowStatus:string;
    fileExt:string;
    id:number;
}
export class PortalUserAttachmentsCreate{
    tenantId:number;
    portalRequestId:number;
    filePath:string;
    protalAttachmentSettingId:number;
    rowStatus:string;
    fileExt:string;
    id:number;
}

export class PortalRequestScFndAidRequestTypeTrDto{
    AidRequestTypeLkpId:number;    
    AidRequestTypeTrName:string;
    id:number;
  
}
