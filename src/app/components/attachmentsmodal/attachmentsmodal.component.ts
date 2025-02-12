import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SafeHtml, SafeStyle } from '@angular/platform-browser';
import { ProfileService } from 'src/app/services/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HrPersonAttachmentsDto, HrPersonsDto } from 'src/app/models/HrPersonsDto';

@Component({
  selector: 'app-attachmentsmodal',
  templateUrl: './attachmentsmodal.component.html',
  styleUrls: ['./attachmentsmodal.component.css']
})
export class AttachmentsmodalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private familyModal:MatDialogRef<AttachmentsmodalComponent>,
    private ProfileService:ProfileService,
    private sanitizer: DomSanitizer,
  ) { }

  AttachmentEditObj =new HrPersonAttachmentsDto();
  AttachmentEditObjIndex=null;
  // attachmentName:string;
  //   filePath:string;



  ngOnInit() {
    this.AttachmentEditObj = this.injectedData.AttachmentEditObj;
    
  //   this.filePath = this.injectedData.filePath;
  //  this.attachmentName = this.injectedData.attachmentName;
  // this.initAttachmentEditObj();
  }

  initAttachmentEditObj(){
    this.AttachmentEditObj= new HrPersonAttachmentsDto();
    this.AttachmentEditObj.attachmentName=null;
    this.AttachmentEditObj.filePath=null;
    this.AttachmentEditObjIndex = null;
  }
  cancel(){
    this.familyModal.close(null);
  }

  save(){
    
    this.validateAttachment();
   
    
  }



  validateAttachment(){
    if(!this.AttachmentEditObj.attachmentName ||!this.AttachmentEditObj.filePath ){
      return false;
    }else{
      this.familyModal.close(this.AttachmentEditObj);
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
  attachmentArray:HrPersonAttachmentsDto[]=[];
  editRequest=false;
  viewRequest=false;
  attachmentError = false;
 
  userData=new HrPersonsDto();
  fileExt:string;
  onFileChange(event,id){
   
    if(this.editRequest){
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
   
        this.ProfileService.UploadAttach(file)
        .subscribe(data =>{
          console.log(data);
          let attatch = this.attachmentArray.find(id);
          attatch.attachmentName = file.name;
          attatch.filePath = data.result;
          this.AttachmentEditObj.filePath= data.result;
          let lastIndex = attatch.attachmentName.lastIndexOf(".") + 1;
          let item = this.userData.hrPersonAttachments.find(x=>x.id == attatch.id);
          if(item){
            item.filePath = attatch.filePath;
            this.AttachmentEditObj.filePath= data.result;
            item.rowStatus = 'Updated';
          }else{
            let newAttachmentInAddRequest = new HrPersonAttachmentsDto(); 
            newAttachmentInAddRequest.filePath = attatch.filePath;
            newAttachmentInAddRequest.attachmentName = attatch.attachmentName;
            newAttachmentInAddRequest.tenantId = 1;//this.attatch.tenantId;
            newAttachmentInAddRequest.rowStatus = 'New';
            this.userData.hrPersonAttachments.push(newAttachmentInAddRequest);
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
          let attatch = new HrPersonAttachmentsDto();
          attatch.attachmentName = file.name;
          attatch.filePath = data.result;
          this.AttachmentEditObj.filePath= data.result;
          let newAttachmentInAddRequest = new HrPersonAttachmentsDto(); 
            newAttachmentInAddRequest.filePath = attatch.filePath;
            newAttachmentInAddRequest.attachmentName = attatch.attachmentName;
            newAttachmentInAddRequest.tenantId = 1;//attatch.tenantId;
            newAttachmentInAddRequest.rowStatus = 'New';
            this.userData.hrPersonAttachments.push(newAttachmentInAddRequest);
        })
        
      }
    }
  }
}
