import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject , Subject } from 'rxjs';
import { Globals } from 'src/app/globals';
import { HttpClient } from '@angular/common/http';
import { dashboardcounts } from 'src/app/models/dashboardcounts';
import { portaladdrequest } from '../models/validaddrequest';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private http:HttpClient) { }
  private subject = new BehaviorSubject<any>(null);

  GetDashboardDataCounts():Observable<dashboardcounts>{
    return this.http.get<any>(Globals.Url + 'PortalUserData/GetDashBoardData')
  }

  // GetValidationScPortalRequests():Observable<any>{
  //   return this.http.get<any>(Globals.Url + 'ScPortalRequest/ValidationScPortalRequests')
  // }

  // GetValidationScPortalRequests(): Observable<portaladdrequest> {
  //   let body={
  //     tenantId:1,
  //    // lang: "ar"

  //   }
  //   return this.http.post<any>(Globals.Url + 'ScPortalRequest/ValidationScPortalRequests',JSON.stringify(body));   
  // } 
  getNotificate(): Observable<any> {
    return this.subject.asObservable();
  }

  pushNotification() {
    this.subject.next({ new:'new' });
  }

}
