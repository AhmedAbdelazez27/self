import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tokenrequest } from '../models/tokenrequest';


@Injectable({
  providedIn: 'root'
})
export class ForgertpasswordService {
  constructor(private http:HttpClient) { }
  
  // sendEmail(email: string): Observable<any> {
  //   const url = `${Globals.Url}User/ForgetPassword?email=${encodeURIComponent(email)}&}`;
  //   return this.http.post<any>(url, {})
  //     .pipe(
  //       map(x => x.result)
  //     );
  // }
  
  sendEmail(email: string, tenancyName: string): Observable<any> {
    const url = `${Globals.Url}/HrPersons/SendForgotPasswordEmail?email=${email}&tenancyName=${tenancyName}`;
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    return this.http.post<any>(url, { headers }).pipe(
      map(response => response.result)
    );
  } 
  
  resetPassword(body):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(Globals.Url + `User/PostForgetPassword`,JSON.stringify(body),{headers:headers})
    .pipe(
      map(x=> x.result)
    )
  }
}
