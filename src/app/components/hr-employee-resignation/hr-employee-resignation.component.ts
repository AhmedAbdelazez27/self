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
import {  faEye, faSquare,faPlusCircle,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { HrEmployeeResignationDto } from 'src/app/models/HrEmployeeResignationDto';
import { HrEmployeeResignationEditDto } from 'src/app/models/HrEmployeeResignationEditDto';
import { HrEmployeeResignationDialogComponent } from '../hr-employee-resignation-dialog/hr-employee-resignation-dialog.component';

@Component({
  selector: 'app-hr-employee-resignation',
  templateUrl: './hr-employee-resignation.component.html',
  styleUrls: ['./hr-employee-resignation.component.css'],
  providers: [ DatePipe ]
})
export class HrEmployeeResignationComponent implements OnInit {

  
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
    this.ProfileService.GetEmployeeResignation(this.strid)
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
   
    this.initResignationEditObj();
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
 
  ResignationEditObj:HrEmployeeResignationEditDto;
  ResignationEditObjIndex=null;
  editIcon=faEdit;
  deleteIcon=faTrash;
  addIcon=faPlusCircle;
  initResignationEditObj(){
    this.ResignationEditObj= new HrEmployeeResignationEditDto();
    this.ResignationEditObjIndex = null;
    this.ResignationEditObj.id=null;
  }

  addResignation(){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    this.ResignationEditObj.statusLkp=this.lang=='ar'?'جديد':'New';
    matDialog.data = {ResignationEditObjIndex: this.ResignationEditObjIndex, ResignationEditObj: this.ResignationEditObj
      ,hrResignationTypeList:this.hrResignationTypeList,hrPersonList:this.hrPersonList}
    this.matDialog.open(HrEmployeeResignationDialogComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initResignationEditObj();
        return false
      }else{
    
        this.loadingOverlay = true;
        console.log(res);
        let newResignation = new HrEmployeeResignationEditDto();
        newResignation.id=0;
        newResignation.resignationNumber=null;
        newResignation.resignationDate=this.datePipe.transform(res.resignationDate, 'dd/MM/yyyy');
        newResignation.noticeDate=this.datePipe.transform(res.noticeDate, 'dd/MM/yyyy');
        newResignation.requestDate=this.datePipe.transform(res.requestDate, 'dd/MM/yyyy');
        newResignation.hrPersonId=res.hrPersonId;
        newResignation.resignationTypeLkpId=res.resignationTypeLkpId;
        //newResignation.statusLkpId=11629;
        newResignation.requestStatusLkpId=11508;
        newResignation.reason=res.reason;
            this.ProfileService.CreatePersonResignation(newResignation)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              this.toastr.success(this.toastrMsgs.editProfile);
              this.loadingOverlay = false;
              this.ngOnInit();
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            })
      }
    });
  }

  editResignation(i){
    this.disabled = false;
 
    this.ResignationEditObj.id = this.resignationData[i].id;
    this.ResignationEditObj.resignationNumber = this.resignationData[i].resignationNumber;
    this.ResignationEditObj.resignationDate = this.fromStringToDate(this.resignationData[i].resignationDate);
    this.ResignationEditObj.noticeDate = this.fromStringToDate(this.resignationData[i].noticeDate);
    this.ResignationEditObj.requestDate = this.fromStringToDate(this.resignationData[i].requestDate);
    this.ResignationEditObj.hrPersonId = this.resignationData[i].hrPersonId;
    this.ResignationEditObj.resignationTypeLkpId = this.resignationData[i].resignationTypeLkpId;
    this.ResignationEditObj.statusLkp = this.resignationData[i].statusLkp;
    this.ResignationEditObj.reason = this.resignationData[i].reason;
    this.ResignationEditObjIndex = i;
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.data = {ResignationEditObjIndex: this.ResignationEditObjIndex, ResignationEditObj: this.ResignationEditObj
      ,hrResignationTypeList:this.hrResignationTypeList,hrPersonList:this.hrPersonList}
    this.matDialog.open(HrEmployeeResignationDialogComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined)
      {
        this.initResignationEditObj();
        return false
      }
      else{
        this.loadingOverlay = true;
        console.log(res);
        let newResignation = new HrEmployeeResignationEditDto();
        newResignation.id=this.ResignationEditObj.id;
        newResignation.resignationNumber=this.ResignationEditObj.resignationNumber;
        newResignation.resignationDate=this.datePipe.transform(this.ResignationEditObj.resignationDate, 'dd/MM/yyyy');
        newResignation.noticeDate=this.datePipe.transform(this.ResignationEditObj.noticeDate, 'dd/MM/yyyy');
        newResignation.requestDate=this.datePipe.transform(this.ResignationEditObj.requestDate, 'dd/MM/yyyy');
        newResignation.hrPersonId=this.ResignationEditObj.hrPersonId;
        newResignation.resignationTypeLkpId=this.ResignationEditObj.resignationTypeLkpId;
        newResignation.statusLkpId=this.ResignationEditObj.statusLkpId;
        newResignation.reason=this.ResignationEditObj.reason;
        newResignation.requestStatusLkpId=11421;
          if(newResignation.id){
            this.ProfileService.UpdatePersonResignation(newResignation)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              this.toastr.success(this.toastrMsgs.editProfile);
              this.loadingOverlay = false;
              this.ngOnInit();
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            })
      
          }

      }
    });
    
  }

  deleteResignation(id){
    this.ProfileService.DeletePersonResignation(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              this.toastr.success('Deleted');
              this.loadingOverlay = false;
              this.ngOnInit();
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            })
     
   
  }
}
