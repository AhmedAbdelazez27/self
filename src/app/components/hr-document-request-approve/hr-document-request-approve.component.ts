import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HrDocumentRequestDto } from 'src/app/models/HrDocumentRequestDto';
import { ProfileService } from "src/app/services/profile.service";
import {  faCheck,faEye, faSquare,faPlusCircle,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { TranslateService } from '@ngx-translate/core';
//import { DatePipe } from '@angular/common';
import { HrDocumentRequestEditDto } from 'src/app/models/HrDocumentRequestEditDto';
import { HrDocumentRequestDialogComponent } from '../hr-document-request-dialog/hr-document-request-dialog.component';
import { HrDocumentRequestApproveDialogComponent } from '../hr-document-request-approve-dialog/hr-document-request-approve-dialog.component';
import { HrDocumentRequestViewComponent } from '../hr-document-request-view/hr-document-request-view.component';
import { PostWithReasonDto } from 'src/app/models/postDto';

@Component({
  selector: 'app-hr-document-request-approve',
  templateUrl: './hr-document-request-approve.component.html',
  styleUrls: ['./hr-document-request-approve.component.css']
})
export class HrDocumentRequestApproveComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private ProfileService: ProfileService,
    private dropdownsService:SelectdropdownService,
    private toastr: ToastrService,
    private matDialog: MatDialog,
    public translate: TranslateService,
    private dialog: MatDialog,
  ) { }
  documentData = new HrDocumentRequestDto(); 
  loadingOverlay = true;
  disabled=false;
  aprovedicon=faCheck;
  statusList2:any=[];
  hrPersonList:any=[];
  documentlist:any=[];
    toastrMsgs:any;
  strid:any;
  personid:any;
  postWithReasonDto = new PostWithReasonDto();
  ngOnInit() {
    this.personid=sessionStorage.getItem('person_id');
    this.strid=localStorage.getItem('user_id')
    this.ProfileService.GetAllDocumentRequestsForApproval(this.strid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log(data);
        this.documentData.documentRequest = data.result;
        console.log(data.result);
       
        this.loadingOverlay = false;
        console.log(this.documentData);
      });
      this.initDocumentEditObj();
  }
  DocumentEditObj:HrDocumentRequestEditDto;
  DocumentEditObjIndex=null;
  filePath:string;
  editIcon=faEdit;
  deleteIcon=faTrash;
  addIcon=faPlusCircle;
  initDocumentEditObj(){
    this.DocumentEditObj= new HrDocumentRequestEditDto();
    this.DocumentEditObjIndex = null;
    this.DocumentEditObj.id=null;
  }
  editDocumentForApproval(i){
     this.DocumentEditObj.id = this.documentData[i].id;
    this.DocumentEditObj.desc = this.documentData[i].desc;
    this.DocumentEditObj.filePath = this.documentData[i].filePath;
     this.DocumentEditObj.documentLkpId=this.documentData[i].documentLkpId;
     this.DocumentEditObj.submittedTo=this.documentData[i].submittedTo;
     this.DocumentEditObj.hrPersonId=this.documentData[i].hrPersonId;
     this.DocumentEditObj.fndStatusLkp = this.documentData[i].fndStatusLkp;
    this.DocumentEditObjIndex = i;
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.data = {
      DocumentEditObjIndex: this.DocumentEditObjIndex,
      DocumentEditObj: this.DocumentEditObj, 
      filePath:this.filePath
     }
    this.matDialog.open(HrDocumentRequestApproveDialogComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initDocumentEditObj();
        return false
      }else{
        console.log(res);
       
        this.loadingOverlay = true;
        let newAttachment = new HrDocumentRequestEditDto();
        newAttachment.id = this.DocumentEditObj.id;
        newAttachment.filePath = this.DocumentEditObj.filePath;
        newAttachment.desc = this.DocumentEditObj.desc;
        newAttachment.submittedTo = this.DocumentEditObj.submittedTo;
        newAttachment.documentLkpId = this.DocumentEditObj.documentLkpId;
        newAttachment.hrPersonId = this.DocumentEditObj.hrPersonId;
        newAttachment.statusLkpId=11423;
        if(newAttachment.id){
          this.ProfileService.UpdateDocumentRequestsData(newAttachment)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data=>{
            this.toastr.success('saved.');
            this.ngOnInit();
            //window.location.reload();
            this.loadingOverlay = false;
            
          },error=>{
            this.toastr.error(error.error.error.message);
            this.loadingOverlay = false;
          })
    
        }
        
        this.initDocumentEditObj();
      }
    });
  }


  //Approve document
  ApproveDocumentRequest(id){
    let postWithReasonDto = new PostWithReasonDto();
    postWithReasonDto.id = id;
    postWithReasonDto.userId = this.strid;
    postWithReasonDto.lang = "en";
    postWithReasonDto.reasonReject = this.DocumentEditObj.reason;
    this.ProfileService.ApproveDocumentRequest(postWithReasonDto)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              if (data.result.finalStatues == 'F') {
                this.toastr.warning(data.result.reason);
            }
            else {
              this.toastr.success(data.result.reason);
             // this.toastr.success('approved');
              this.loadingOverlay = false;
              this.ngOnInit();
              // window.location.reload();
            }
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            })
     
   
  } 
  ViewDocument(i) {
    this.DocumentEditObj.id = this.documentData[i].id;
    this.DocumentEditObj.desc = this.documentData[i].desc;
    this.DocumentEditObj.filePath = this.documentData[i].filePath;
    this.DocumentEditObj.documentLkpId = this.documentData[i].documentLkpId;
    this.DocumentEditObj.submittedTo = this.documentData[i].submittedTo;
    this.DocumentEditObj.hrPersonId = this.documentData[i].hrPersonId;
    this.DocumentEditObj.fndStatusLkp = this.documentData[i].fndStatusLkp;
    this.DocumentEditObj.hrPersons = this.documentData[i].hrPersons;
    this.DocumentEditObj.documentLkp = this.documentData[i].documentLkp;
    this.DocumentEditObjIndex = i;
    const dialogRef = this.dialog.open(HrDocumentRequestViewComponent, {
      width: '900px',
      height: 'auto',
      data: {
        DocumentEditObjIndex: this.DocumentEditObjIndex,
        DocumentEditObj: this.DocumentEditObj,
        filePath: this.filePath // Assuming filePath is defined somewhere
      },
      disableClose: true // Set disableClose here instead of MatDialogConfig
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
}


