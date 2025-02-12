import { Injectable } from '@angular/core';
import { forkJoin ,Observable } from 'rxjs';
import { Globals } from 'src/app/globals';
import { HttpClient } from '@angular/common/http';
import { portalgetall } from "src/app/models/portalgetall";
import { portalgetalldatatable } from "src/app/models/portalgetalldatatable";

import { map } from 'rxjs/operators';
import { portaladdrequest } from '../models/validaddrequest';

@Injectable({
  providedIn: 'root'
})
export class MainpageService {
  constructor(private http:HttpClient) { }
  GetDashboardDataTable():Observable<portalgetalldatatable>{
    let body:portalgetall;
    body = {
      orderByValue:{
        colId:'Id',
        sort:'Id asc'
      },
      skipCount:0,
      maxResultCount:10
    }
    return this.http.post<any>(Globals.Url + 'ScPortalRequest/PortalGetAll',JSON.stringify(body))
  }

  GetAddRequestPermission(){
    if(localStorage.getItem('addRequest')){
      return JSON.parse(localStorage.getItem('addRequest'));
    }else{
      return JSON.parse(sessionStorage.getItem('addRequest'));
    }
  }
 
  GetValidationScPortalRequests(): Observable<portaladdrequest> {
    let body={
      tenantId:1,
      lang: "ar",
      AidRequestTrTypeId:null
    }
    return this.http.post<any>(Globals.Url + 'ScPortalRequest/ValidationScPortalRequests',JSON.stringify(body));   
  } 

  GetValidationDataOnAddRequest(){    
    return this.GetValidationScPortalRequests().pipe(
      map(response => {
        console.log(response);        
          return response;       
      })
    );
  }
  
  
  

  // GetValidationDataOnAddRequest(){    
  //   return this.GetValidationScPortalRequests().pipe(
  //     map(response => {
  //       console.log(response);        
  //         return response;       
  //     })
  //   );
  // }
  

  
  

  SetAddRequestPermissionToLocalStorage(addRequest){
    localStorage.setItem('addRequest',addRequest)
  }

  SetAddRequestPermissionToSessionStorage(addRequest){
    sessionStorage.setItem('addRequest',addRequest)
  }

  RemoveAddRequest(){
    localStorage.removeItem('addRequest');
    sessionStorage.removeItem('addRequest');
  }

}
