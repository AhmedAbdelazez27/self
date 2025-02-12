import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { PortalUserDtoResponse } from 'src/app/models/portalUserDto';
import { EditUserPortal } from '../models/editUserPortal';
import { map } from 'rxjs/operators';
import { HrPersonsDto, PortalPersonDtoResponse } from '../models/HrPersonsDto';
import { HrPersonsEditDto } from '../models/HrPersonsEditDto';
import { HrPersonVacationsDto, HrPersonVacationsResponsDto } from '../models/HrPersonVacationsDto';
import { PyPayrollOperationsPortalDto, PyPayrollOperationsPortalResponsDto } from '../models/PyPayrollOperationsPortalDto';
import { PyPayrollOperationPersonResponsDto } from '../models/PyPayrollOperationPersonDto';
import { PyPayrollOperationDetalEditResponsDto } from '../models/PyPayrollOperationPersonDetailsDto';
import { HrPersonVacationsEditDto } from '../models/HrPersonVacationsEditDto';
import { GetVacationDaysInputDto } from '../models/GetVacationDaysInputDto';
import { HrDocumentRequestResponsDto, HrTeamAvailableResponseDto } from '../models/HrDocumentRequestDto';
import { HrDocumentRequestEditDto } from '../models/HrDocumentRequestEditDto';
import { HrEmployeeResignationResponsDto } from '../models/HrEmployeeResignationDto';
import { HrEmployeeResignationEditDto } from '../models/HrEmployeeResignationEditDto';
import { PostDto, PostWithReasonDto } from '../models/postDto';
 

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http:HttpClient,private backhttp:HttpBackend) { this.httpClientBack = new HttpClient(backhttp);}
  private httpClientBack: HttpClient;
 
  
 
  GetProfileData(id):Observable<PortalPersonDtoResponse>{
    
    return this.http.get<any>(Globals.Url + 'HrPersons/GetDetailForPortal?id='+id+'&')
  }

  UpdateProfileData(body:EditUserPortal):Observable<any>{
    return this.http.put<any>(Globals.Url + 'PortalUserUnified/Update',JSON.stringify(body))
  }
  GetAttachmentData():Observable<any>{
    return this.http.get<any>(Globals.Url + 'PortalUserUnified/GetAllAttachments?16999')
    .pipe(
      map(x=> x.result.items)
    )
  }

  UploadAttach(file:File):Observable<any>{
  
    let fileData: FormData = new FormData();
    fileData.append('file', file, file.name);
    return this.httpClientBack.post<any>(Globals.Url + 'HrPersons/UploadAttach',fileData)
  }

  UpdatePersonProfileData(body:HrPersonsEditDto):Observable<any>{
    return this.http.put<any>(Globals.Url + 'HrPersons/UpdatePortal',JSON.stringify(body))
  }




  UpdatePersonVacationData(body:HrPersonVacationsEditDto):Observable<any>{
    return this.http.put<any>(Globals.Url + 'HrPersonVacations/Update',JSON.stringify(body))
  }
  // CreatePersonVacationData(body:HrPersonVacationsEditDto):Observable<any>{
  //   return this.http.post<any>(Globals.Url + 'HrPersonVacations/CreatePortal',JSON.stringify(body))
  // }
  CreatePersonVacationData(body: HrPersonVacationsEditDto, tenantId: number): Observable<any> {
    const url = `${Globals.Url}HrPersonVacations/CreatePortal?tenantId=${tenantId}`;
    return this.http.post<any>(url, JSON.stringify(body));
  }
  
  DeletePersonVacationData(id:any):Observable<any>{
   
    return this.http.delete<any>(Globals.Url +'HrPersonVacations/DeletePortal?id='+id+'&')
     
  }

   GetVacationsTypesData(id:any,tenantId:any ):Observable<any>{
   
    return this.http.get<any>(Globals.Url +'HrPersonVacations/GetDetailForPortal?id='+id+'&'+'tenantId='+tenantId+'&')
    .pipe(
       map(x=> x.result.items)
     )
  }
   
  GetProfileData2(id:any):Observable<HrPersonVacationsResponsDto>{
    
    return this.http.get<any>(Globals.Url +'HrPersonVacations/GetDetailForPortal?id='+id+'&')
  }
  GetVacationsRequests(id:any):Observable<HrPersonVacationsResponsDto>{
    
    return this.http.get<any>(Globals.Url + 'HrPersonVacations/GetVacationsRequestForPortal?id='+id+'&')
  }
  GetPendingRequest(id:any):Observable<HrPersonVacationsResponsDto>{
    
    return this.http.get<any>(Globals.Url +'HrPersonVacations/GetRequestsForPortal?id='+id+'&')
  }
  GetPendingRequestHistory(id:any):Observable<HrPersonVacationsResponsDto>{
    
    return this.http.get<any>(Globals.Url +'HrPersonVacations/GetRequestsForPortalHistory?id='+id+'&')
  }
  GetProfileData3(id:any):Observable<PyPayrollOperationPersonResponsDto>{
    
    return this.http.get<any>(Globals.Url + 'PyPayrollOperations/GetDetail2ForPortal?id='+id+'&')
  }

  GetProfileData4(id:any,PersonId:any):Observable<PyPayrollOperationPersonResponsDto>{
    
    return this.http.get<any>(Globals.Url + 
      'PyPayrollOperations/GetAllPyPayrollOperationsPersonsForPortal?id='+id+'&'+'PersonId='+PersonId+'&')
  }
  GetProfileData5(id:any):Observable<PyPayrollOperationDetalEditResponsDto>{
    
    return this.http.get<any>(Globals.Url +'PyPayrollOperations/GetAllPyPayrollOperationsPersonsDetails?id='+id+'&')
  }
  Getpayrolldetails(id: string): Observable<any> {
 
    const url = `${Globals.Url}PyPayrollOperations/GetAllPyPayrollOperationsPersonsDetailspayroll?id=${id}`;
    return this.http.get<any>(url);
}
  
  


  //for get days

  GetCalcNoOfDays(body:GetVacationDaysInputDto):Observable<any>{
   // return this.http.get<any>(Globals.Url + 'HrPersonVacations/GetVacationDays',JSON.stringify(body))
   return this.http.get<any>(Globals.Url + 'HrPersonVacations/GetVacationDays?HrPersonId='+body.HrPersonId+'&'+'HrVacationsTypeId='+body.HrVacationsTypeId+'&'+'FromDate='+body.FromDate+'&'+'ToDate='+body.ToDate+'&'+'UserId='+body.UserId+'&')
  }

   GetVacationsBalance(body:GetVacationDaysInputDto):Observable<any>{    
    return this.http.get<any>(Globals.Url +'HrPersonVacations/GetVacationsBalancePortal?hrPersonId='+body.HrPersonId+'&'+'hrVacationsTypeId='+body.HrVacationsTypeId+'&')
   }

   GetTotalAnuualLeaveDays(id:any):Observable<any>{    
    return this.http.get<any>(Globals.Url + 'HrPersonVacations/GetTotalAnuualLeaveDays?id='+id+'')
   }

   GetTotalSickLeaveDays(id:any):Observable<any>{
    return this.http.get<any>(Globals.Url + 'HrPersonVacations/GetTotalSickLeaveDays?id='+id+'')
   }

   GetTotalOtherLeaveDays(id:any):Observable<any>{
    return this.http.get<any>(Globals.Url + 'HrPersonVacations/GetTotalOtherLeaveDays?id='+id+'')
   }

   GetTotalBalance(id: any) : Observable<any>{
    return this.http.get<any>(Globals.Url + 'HrPersonVacations/GetTotalBalance?hrPersonId='+id+'')
   }

   GetPercentagePersonalInformation(id:any):Observable<any>{    
    return this.http.get<any>(Globals.Url + 'HrPersons/GetPercentagePersonalInformation?id='+id+'')
   }

   GetPercentageAttachment(id:any):Observable<any>{
    return this.http.get<any>(Globals.Url + 'HrPersons/GetPercentageAttachment?id='+id+'')
   }

   GetPercentagAddress(id:any):Observable<any>{
    return this.http.get<any>(Globals.Url + 'HrPersons/GetPercentagAddress?id='+id+'')
   }

   GetSalaryInfo(id:any):Observable<any>{
    return this.http.get<any>(Globals.Url + 'HrPersons/HasSalary?id='+id+'')
   }

   ApprovePersonVacation(postWithReasonDto:PostWithReasonDto):Observable<any>{
    return this.http.post<any>(Globals.Url + 'HrPersonVacations/GetApprovePersonVacation',postWithReasonDto)
   }
   PreApprovePersonVacation(body:PostDto):Observable<any>{
    return this.http.post<any>(Globals.Url + 'HrPersonVacations/PreApproveHrPersonVacations',JSON.stringify(body))
   }
   RejectPersonVacation(postWithReasonDto:PostWithReasonDto):Observable<any>{
    return this.http.post<any>(Globals.Url + 'HrPersonVacations/GetRejectPersonVacation',postWithReasonDto)
   }
   //HrPerson-Documents
   GetAllEmployeeSameSupervisor(id:any):Observable<HrTeamAvailableResponseDto>{
    
    return this.http.get<any>(Globals.Url +'HrPersons/GetAllEmployeeSameSupervisor?id='+id+'&')
  }
   GetAllDocumentRequests(id:any):Observable<HrDocumentRequestResponsDto>{
    
    return this.http.get<any>(Globals.Url +'HrDocumentRequest/GetDetailForPortal?id='+id+'&')
  }
  UpdateDocumentRequestsData(body:HrDocumentRequestEditDto):Observable<any>{
    return this.http.put<any>(Globals.Url +'HrDocumentRequest/Update',JSON.stringify(body))
  }
  // CreateDocumentRequestsData(body:HrDocumentRequestEditDto):Observable<any>{
  //   return this.http.post<any>(Globals.Url + 'HrDocumentRequest/Create',JSON.stringify(body))
  // }

  CreateDocumentRequestsData(body: HrDocumentRequestEditDto, tenantId: number): Observable<any> {
    const url = `${Globals.Url}HrDocumentRequest/Create?tenantId=${tenantId}`;
    return this.http.post<any>(url, JSON.stringify(body));
  }



  DeleteDocumentRequestsData(id:any):Observable<any>{
 
    return this.http.delete<any>(Globals.Url + 'HrDocumentRequest/DeletePortal?id='+id+'&')
     
  }

  UploadDocumentRequest(file:File):Observable<any>{
    let fileData: FormData = new FormData();
    fileData.append('file', file, file.name);
    return this.httpClientBack.post<any>(Globals.Url + 'HrDocumentRequest/UploadAttach',fileData)
  }

  GetAllDocumentRequestsForApproval(id:any):Observable<HrDocumentRequestResponsDto>{
    
    return this.http.get<any>(Globals.Url + 'HrDocumentRequest/GetDocumentRequestForPortal?id='+id+'&')
  }

  //aprove status 
   ApproveDocumentRequest(postWithReasonDto : PostWithReasonDto):Observable<any>{
    return this.http.post<any>(Globals.Url + 'HrDocumentRequest/GetHrDocumentRequestApprove',postWithReasonDto)
   }
   PreApproveDocumentRequest(userid:any,id:any):Observable<any>{
    return this.http.get<any>(Globals.Url + 'HrDocumentRequest/GetHrDocumentRequestPreApprove?id='+id+'&'+'userId='+userid+'&')
   }
   RejectDocumentRequest(postWithReasonDto : PostWithReasonDto):Observable<any>{
    return this.http.post<any>(Globals.Url + 'HrDocumentRequest/GetHrDocumentRequestRejected',postWithReasonDto)
   }
   //HrEmployeeResignation

   GetEmployeeResignation(id:any):Observable<HrEmployeeResignationResponsDto>{
    
    return this.http.get<any>(Globals.Url + 'HrEmployeeResignation/GetDetailForPortal?id='+id+'&')
  }

  UpdatePersonResignation(body:HrEmployeeResignationEditDto):Observable<any>{
    return this.http.put<any>(Globals.Url + 'HrEmployeeResignation/Update',JSON.stringify(body))
  }
  CreatePersonResignation(body:HrEmployeeResignationEditDto):Observable<any>{
    return this.http.post<any>(Globals.Url + 'HrEmployeeResignation/Create',JSON.stringify(body))
  }
  DeletePersonResignation(id:any):Observable<any>{
   
    return this.http.delete<any>(Globals.Url + 'HrEmployeeResignation/Delete?id='+id+'&')
     
  }

  GetEmployeeResignationToApprove(id:any):Observable<HrEmployeeResignationResponsDto>{
    
    return this.http.get<any>(Globals.Url + 'HrEmployeeResignation/GetAllResignationForPortal?id='+id+'&')
  }
  ApproveResignation(userid:any,id:any):Observable<any>{
    return this.http.get<any>(Globals.Url + 'HrEmployeeResignation/GetApproveResignation?id='+id+'&'+'userId='+userid+'&')
   }
   RejectResignation(userid:any,id:any):Observable<any>{
    return this.http.get<any>(Globals.Url + 'HrEmployeeResignation/GetRejectResignation?id='+id+'&'+'userId='+userid+'&')
   }
   getPayslip(id: string, lang: string): Observable<any> {
    return this.http.get<any>(`${Globals.Url}PyPayrollOperations/GetAllPyPayrollOperationsPersonsDetailspayroll?id=${id}&lang=${lang}`);
  }
  
  printVacation(id: string, hrVacationsTypeId: string, lang: string): Observable<any> {
    return this.http.get<any>(`${Globals.Url}HrPersonVacations/GetHrPersonVacationsPrint?id=${id}&hrVacationsTypeId=${hrVacationsTypeId}&lang=${lang}`);
  }

  }
