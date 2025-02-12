import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SafeHtml, SafeStyle } from '@angular/platform-browser';
import { ProfileService } from 'src/app/services/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HrPersonJobAttachmentsDto, HrPersonsDto } from 'src/app/models/HrPersonsDto';

@Component({
  selector: 'app-jobattachmentsmodal',
  templateUrl: './job-description-modal.component.html',
  styleUrls: ['./job-description-modal.component.css']
})
export class JobDescriptionModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private familyModal:MatDialogRef<JobDescriptionModalComponent>,
    private ProfileService:ProfileService,
    private sanitizer: DomSanitizer,
  ) { }

  JobAttachmentEditObj =new HrPersonJobAttachmentsDto();
  JobAttachmentEditObjIndex=null;
  // attachmentName:string;
  //   filePath:string;



  ngOnInit() {
   // this.JobAttachmentEditObj = this.injectedData.JobAttachmentEditObj;
   this.JobAttachmentEditObj  = new HrPersonJobAttachmentsDto();
   this.JobAttachmentEditObj.jobAttachmentName=null;
   this.JobAttachmentEditObj.filePath=null; 
  }

  initJobAttachmentEditObj(){
    this.JobAttachmentEditObj= new HrPersonJobAttachmentsDto();
    this.JobAttachmentEditObj.jobAttachmentName=null;
    this.JobAttachmentEditObj.filePath=null; 
  }
  cancel(){
    this.familyModal.close(null);
  }

  save(){
    
    this.validateAttachment();
   
    
  }



  validateAttachment(){
    if(!this.JobAttachmentEditObj.jobAttachmentName ||!this.JobAttachmentEditObj.filePath ){
      return false;
    }else{
      this.familyModal.close(this.JobAttachmentEditObj);
    }
  }
  getPic(fileExt:string){
    if(fileExt){
      if(fileExt.toLowerCase().includes("png") || fileExt.toLowerCase().includes("jpg") || fileExt.toLowerCase().includes("jpeg")){
        return 1
      }else{
        return 2
      }
    }
  }
  attachmentArray:HrPersonJobAttachmentsDto[]=[];
  editRequest=false;
  viewRequest=false;
  attachmentError = false;
 
  userData=new HrPersonsDto();
  fileExt:string;
  onFileChange(event,id){
   
    if(this.editRequest){
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
      //  debugger;
        this.ProfileService.UploadAttach(file)
        .subscribe(data =>{
          console.log(data);
          let attatch = this.attachmentArray.find(id);
          attatch.jobAttachmentName = file.name;
          attatch.filePath = data.result;
          this.JobAttachmentEditObj.filePath= data.result;
          let lastIndex = attatch.jobAttachmentName.lastIndexOf(".") + 1;
          let item = this.userData.hrPersonAttachments.find(x=>x.id == attatch.id);
          if(item){
            item.filePath = attatch.filePath;
            this.JobAttachmentEditObj.filePath= data.result;
            item.rowStatus = 'Updated';
          }else{
            let newAttachmentInAddRequest = new HrPersonJobAttachmentsDto(); 
            newAttachmentInAddRequest.filePath = attatch.filePath;
            newAttachmentInAddRequest.jobAttachmentName = attatch.jobAttachmentName;
            newAttachmentInAddRequest.tenantId = 1;//this.attatch.tenantId;
            newAttachmentInAddRequest.rowStatus = 'New';
            this.userData.hrPersonJobAttachments.push(newAttachmentInAddRequest);
          }

        })
      }
    }else{
      if (event.target.files.length > 0) {
        let file = event.target.files[0];
        this.ProfileService.UploadAttach(file)
        .subscribe(data =>{
          console.log(data);
         // debugger;
          let attatch = new HrPersonJobAttachmentsDto();
          attatch.jobAttachmentName = file.name;
          attatch.filePath = data.result;
          this.JobAttachmentEditObj.filePath= data.result;
          let newAttachmentInAddRequest = new HrPersonJobAttachmentsDto(); 
            newAttachmentInAddRequest.filePath = attatch.filePath;
            newAttachmentInAddRequest.jobAttachmentName = attatch.jobAttachmentName;
            newAttachmentInAddRequest.tenantId = 1;//attatch.tenantId;
            newAttachmentInAddRequest.rowStatus = 'New';
            this.userData.hrPersonJobAttachments.push(newAttachmentInAddRequest);
        })
        
      }
    }
  }
}
