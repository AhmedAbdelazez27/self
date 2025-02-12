import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SafeHtml, SafeStyle } from '@angular/platform-browser';
import { ProfileService } from 'src/app/services/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HrDocumentRequestDto } from 'src/app/models/HrDocumentRequestDto';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-hr-document-request-approve-dialog',
  templateUrl: './hr-document-request-approve-dialog.component.html',
  styleUrls: ['./hr-document-request-approve-dialog.component.css']
})
export class HrDocumentRequestApproveDialogComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private documentModal:MatDialogRef<HrDocumentRequestApproveDialogComponent>,
    private ProfileService:ProfileService,
    private dropdownsService:SelectdropdownService,
    private sanitizer: DomSanitizer,
  ) { }
  hrPersonList:any=[];
  documentlist:any=[];
  lang:string;
  strid:any;
  DocumentEditObj =new HrDocumentRequestDto();
  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.strid=localStorage.getItem('user_id')
    this.DocumentEditObj = this.injectedData.DocumentEditObj;
  }

  cancel(){
    this.documentModal.close(null);
  }

  save(){
    
    this.validateAttachment();
   
    
  }
  validateAttachment(){
    if(!this.DocumentEditObj.filePath){
      return false;
    }else{
      this.documentModal.close(this.DocumentEditObj);
    }
  }
  onFileChange(event,id){
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.ProfileService.UploadDocumentRequest(file)
      .subscribe(data =>{
        console.log(data);
        this.DocumentEditObj.filePath = data.result;
         
      })
      
    
  }
}
}
