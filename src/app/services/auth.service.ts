import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { Observable } from 'rxjs';
import { tokenrequest } from 'src/app/models/tokenrequest';
import { SelectdropdownService } from "src/app/services/selectdropdown.service";
import { MainpageService } from "src/app/services/mainpage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http:HttpClient,
    private SelectdropdownService:SelectdropdownService,
    private MainpageService:MainpageService,
    ) { }
 
  GetTokenFromServer(email,password,tenancyName):Observable<tokenrequest>{
    let body = {
      userName:email,
      password:password,
     tenantId:7
        // tenancyName:tenancyName,
      
    }
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post<tokenrequest>(Globals.TokenUrl,JSON.stringify(body),{headers:headers})
  }
 
  isLoggedIn() {
    return this.GetToken() !== null;
  }

  Logout(){
    let lang = localStorage.getItem('lang');
    localStorage.clear();
    sessionStorage.clear();
     localStorage.setItem('lang',lang);
  }

  SetTokenToLocalStorage(token){
    localStorage.setItem('token',token)
  }

  SetTokenToSessionStorage(token){
    sessionStorage.setItem('token',token)
  }

  GetToken(){
    if(localStorage.getItem('token')){
      return localStorage.getItem('token');
    }else{
      return sessionStorage.getItem('token');
    }
  }

  RemoveToken(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.MainpageService.RemoveAddRequest();
  }
  SetUserIdSessionStorage(userId){
    sessionStorage.setItem('userId',userId)
  }
  GetuserId(){
    if(localStorage.getItem('userId')){
      return localStorage.getItem('userId');
    }else{
      return sessionStorage.getItem('userId');
    }
  }
  RemoveuserId(){
    localStorage.removeItem('userId');
    sessionStorage.removeItem('userId');
     
  }

  SetTenantIdToSessionStorage(tenantId){
    sessionStorage.setItem('tenantId',tenantId)
  }
  GetTenantId(){
    if(localStorage.getItem('tenantId')){
      return localStorage.getItem('tenantId');
    }else{
      return sessionStorage.getItem('tenantId');
    }
  }
}
