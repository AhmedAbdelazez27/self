import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationDto } from '../models/NotificationDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  addUser(body):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post<any>(Globals.Url + 'User/SignUp',JSON.stringify(body),{headers:headers})
  }
  GetNewNotificationsPortal(tenantId : any,userId : any) : Observable<any>{
    return this.http.get<any>(Globals.Url + 'User/GetNewNotificationsPortal?tenantId='+tenantId+'&'+'userId='+userId+'&')
  }

  NotificationsListPortal(tenantId : any,userId : any ) : Observable<any>{
    return this.http.get<any>(Globals.Url + 'User/NotificationsListPortal?tenantId='+tenantId+'&'+'userId='+userId+'&')
  }

  ChangeNotificationStatePortal(body : NotificationDto) : Observable<any>{
    return this.http.post<any>(Globals.Url + 'User/ChangeNotificationStatePortal',JSON.stringify(body) )
  }

  GetTenantDetailDtoPortal(tenantId : number) : Observable<any>{
    return this.http.get<any>(Globals.Url + 'TenantData/GetTenantDetailDtoPortal?tenantId='+tenantId+'&')
  }

}
