import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { ProfileService } from "src/app/services/profile.service";
import { MainpageService } from "src/app/services/mainpage.service";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HrPersonsDto } from 'src/app/models/HrPersonsDto';
import { HrPersonVacationsDto } from 'src/app/models/HrPersonVacationsDto';
import{HrPersonVacationsEditDto} from 'src/app/models/HrPersonVacationsEditDto'
import { HrPersonDialogComponent } from '../hr-person-dialog/hr-person-dialog.component';
import {  faEye, faSquare,faPlusCircle,faEdit, faTrash, faCheck, faTimes, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { HrEmployeeResignationDto } from 'src/app/models/HrEmployeeResignationDto';
import { HrEmployeeResignationEditDto } from 'src/app/models/HrEmployeeResignationEditDto';
import { HrEmployeeResignationDialogComponent } from '../hr-employee-resignation-dialog/hr-employee-resignation-dialog.component';

@Component({
  selector: 'app-hr-employee-resignation-approve',
  templateUrl: './hr-employee-resignation-approve.component.html',
  styleUrls: ['./hr-employee-resignation-approve.component.css'],
  providers: [ DatePipe ]
})
export class HrEmployeeResignationApproveComponent implements OnInit {

  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    
    private ProfileService: ProfileService,
    private dropdownsService: SelectdropdownService,
    private toastr: ToastrService,
    private MainpageService: MainpageService,
    private matDialog: MatDialog,
    public translate: TranslateService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }
  resignationData = new HrEmployeeResignationDto(); 
  jobGradeList: any = [];
  approveicon=faPlusCircle;
  aprovedicon=faCheck;
  rejectedicon=faTimes;
  rejecticon=faMinusCircle;
  loadingOverlay = true;
  disabled=false;
  statusList2:any=[];
  hrPersonList:any=[];
  hrResignationTypeList:any=[];
  toastrMsgs:any;
  strid:any;
  lang:string;
  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.disabled = true;
    this.getToastrMsgs();
    this.strid=localStorage.getItem('user_id')
    this.ProfileService.GetEmployeeResignationToApprove(this.strid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log(data);
        this.resignationData = data.result;
        console.log(data.result);
        this.loadingOverlay = false;
      });
    this.dropdownsService.GethrResignationTypeList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.hrResignationTypeList = data;
      })
      
      this.dropdownsService.GetHrPersonList(this.strid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.hrPersonList = data;
      })
   
     
  }
  getToastrMsgs(){
    this.translate.get('ToastrSuccess')
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{      
      this.toastrMsgs = data;
    })
  }
  
  fromStringToDate(str):any{
    let parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0])
  }
 
  ApproveResignation(id){
    this.ProfileService.ApproveResignation(this.strid,id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              if (data.result.finalStatues == 'F') {
                this.toastr.warning(data.result.reason);
            }
            else {
              this.toastr.success(data.result.reason);
              this.loadingOverlay = false;
              this.ngOnInit();
            }
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            })
     
   
  } 
  RejectResignation(id){
    this.ProfileService.RejectResignation(this.strid,id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              if (data.result.finalStatues == 'F') {
                this.toastr.warning(data.result.reason);
            }
            else {
              this.toastr.success(data.result.reason);
              this.loadingOverlay = false;
              this.ngOnInit();
            }
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            })
     
   
  } 
 
}
