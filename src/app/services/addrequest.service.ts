import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { portalRequestCreate } from '../models/portalRequestCreate';

@Injectable({
  providedIn: 'root'
})
export class AddrequestService {
  constructor(private http:HttpClient,private backhttp:HttpBackend) { this.httpClientBack = new HttpClient(backhttp); }
  private httpClientBack: HttpClient;

  GetAttachmentData(aidRequestTrTypeId):Observable<any>{
    return this.http.get<any>(Globals.Url + 'ScFndProtalAttachmentSetting/GetProtalAttachmentSettingForAidRequestTypeLkp?RequestTypeId=' + aidRequestTrTypeId)
    .pipe(
      map(x=> x.result.items)
    )
  }

  GetAvailableTenants():Observable<any>{
    return this.http.get<any>(Globals.Url + 'ScPortalRequest/GetAvailableTenants')
    .pipe(
      map(x=> x.result)
    )
  }

  SendRequest(body:portalRequestCreate):Observable<any>{
    
    return this.http.post<any>(Globals.Url + 'ScPortalRequest/PortalCreate',JSON.stringify(body))
  }

  EditRequest(body:portalRequestCreate):Observable<any>{
    return this.http.post<any>(Globals.Url + 'ScPortalRequest/PortalUpdate',JSON.stringify(body))
  }

  GetRequest(id,tenantId):Observable<any>{
    let body={
      id:id
    }
    return this.http.post<any>(Globals.Url + 'ScPortalRequest/PortalGet?tenantId='+tenantId,JSON.stringify(body))
    .pipe(
      map(x=> x.result)
    )
  }

  DeleteRequest(id,tenantId):Observable<any>{
    let body={
      id:id
    }
    return this.http.post<any>(Globals.Url + 'ScPortalRequest/PortalDelete?tenantId='+tenantId,JSON.stringify(body))
    .pipe(
      map(x=> x.result)
    )
  }

  UploadAttach(file:File):Observable<any>{
    const fileData: FormData = new FormData();
    fileData.append('file', file, file.name);
    return this.httpClientBack.post<any>(Globals.Url + 'ScPortalRequest/UploadAttach',fileData)
  }

}
