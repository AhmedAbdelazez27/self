import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialog, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { ProfileService } from "src/app/services/profile.service";
import { MainpageService } from "src/app/services/mainpage.service";
import { HrPersonVacationsDto } from 'src/app/models/HrPersonVacationsDto';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GetVacationDaysInputDto } from 'src/app/models/GetVacationDaysInputDto';
import { DatePipe } from '@angular/common';
import { HrEmployeeResignationDto } from 'src/app/models/HrEmployeeResignationDto';

@Component({
  selector: 'app-hr-employee-resignation-dialog',
  templateUrl: './hr-employee-resignation-dialog.component.html',
  styleUrls: ['./hr-employee-resignation-dialog.component.css'],
  providers: [ DatePipe ]
})
export class HrEmployeeResignationDialogComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,

    private familyModal:MatDialogRef<HrEmployeeResignationDialogComponent>,
    private dropdownsService:SelectdropdownService,
    private ProfileService:ProfileService,
    private datePipe: DatePipe,
  ) { }
  hrPersonList:any=[];
  hrResignationTypeList:any=[];
  ResignationEditObj = new HrEmployeeResignationDto(); 
 disabled=false;
 lang:string;
 strid:any;
 selectedEndDate:any;
 selectedStartDate:any;
  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.strid=localStorage.getItem('user_id')
    this.disabled=false;
    this.ResignationEditObj = this.injectedData.ResignationEditObj;
    this.GetData();
    
  }
  fromStringToDate(str):any{
    let parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0])
  }
   

  save(){
    this.validatePasss();
  }

  validatePasss(){
    
    if(!this.ResignationEditObj.hrPersonId || !this.ResignationEditObj.resignationTypeLkpId){
      return false;
    }else{
      this.familyModal.close(this.ResignationEditObj);
    }
  }

  cancel(){
    this.familyModal.close(null);
  }
  GetData(){
    
    this.strid=localStorage.getItem('user_id')
    this.dropdownsService.GetHrPersonList(this.strid)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{   
      this.hrPersonList = data;
    })
    
    this.dropdownsService.GethrResignationTypeList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{   
      this.hrResignationTypeList = data;
    })
  
    }
}
