import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordDto } from '../models/changePasswordDto';

@Injectable({
  providedIn: 'root',
})
export class ChangepasswordService {
  constructor(private http: HttpClient) {}

  ChangePassword(changePasswordDto: ChangePasswordDto): Observable<any> {
    return this.http.post<any>(
      Globals.Url + 'HrPersons/ChangePassword',
      JSON.stringify(changePasswordDto)
    );
  }
}
