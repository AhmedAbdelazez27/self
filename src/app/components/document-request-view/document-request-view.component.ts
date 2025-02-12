import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HrDocumentRequestDto } from 'src/app/models/HrDocumentRequestDto';
import { SelectdropdownResultResults } from 'src/app/models/selectdropdown';
import { ProfileService } from 'src/app/services/profile.service';
import { VacationRequestViewComponent } from '../vacation-request-view/vacation-request-view.component';
import { HrDocumentRequestEditDto } from 'src/app/models/HrDocumentRequestEditDto';
import { PostWithReasonDto } from 'src/app/models/postDto';

@Component({
  selector: 'app-document-request-view',
  templateUrl: './document-request-view.component.html',
  styleUrls: ['./document-request-view.component.css']
})
export class DocumentRequestViewComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  toastrMsgs: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData: any,
  private familyModal:MatDialogRef<VacationRequestViewComponent>,
  private ProfileService:ProfileService,
  private toastr: ToastrService,
  private ViewModal:MatDialogRef<DocumentRequestViewComponent>) { }

  DocumentEditObj = new HrDocumentRequestDto();

  strid:any;
  userData:any;
  supervisorname:string;
  rejectReason:string;
  loadingOverlay = true;

  ngOnInit() {
    this.strid=localStorage.getItem('user_id')
    this.DocumentEditObj = this.injectedData.DocumentEditObj;
    console.log("result")
    console.log(this.DocumentEditObj)
  
    
  }

  btnclose(){
   this.ViewModal.close()
  }

  
  getTextFromSelect(id:number,list:SelectdropdownResultResults[]){
    let obj =  list.find(x=>x.id == id);
    if (obj) {
      return obj.text
    }
  }
  RejectDocumentRequest(id){
    let postWithReasonDto = new PostWithReasonDto();
    postWithReasonDto.id = id;
    postWithReasonDto.userId = this.strid;
    postWithReasonDto.lang = "en";
    postWithReasonDto.reasonReject = this.DocumentEditObj.reason;

  if (!postWithReasonDto.reasonReject || postWithReasonDto.reasonReject.trim() === '') {
    this.toastr.warning('Rejection reason is mandatory.');
    return;
  }
    this.ProfileService.RejectDocumentRequest(postWithReasonDto)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              console.log(data);
              if (data.result.finalStatues == 'F') {
                this.toastr.warning(data.result.reason);
            }
            else {
              this.toastr.success('Rejected successfully.');
              this.loadingOverlay = false;
              window.location.reload();
              // this.ngOnInit();
              // this.familyModal.close(null);
            }
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            })
     
   
  }

  
  ApproveDocumentRequest(id) {
    let postWithReasonDto = new PostWithReasonDto();
    postWithReasonDto.id = id;
    postWithReasonDto.userId = this.strid;
    postWithReasonDto.lang = "en";
    postWithReasonDto.reasonReject = this.DocumentEditObj.reason;
      this.ProfileService.ApproveDocumentRequest(postWithReasonDto)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          console.log(data);
          if (data.result.finalStatues === 'F') {
            this.toastr.warning(data.result.reason);
          } else {
            this.toastr.success('Approved successfully.');
            this.loadingOverlay = false;
            window.location.reload();
            // this.ngOnInit();
            // this.familyModal.close(null);
          }
          },error=>{
            this.toastr.error(error.error.error.message);
            this.loadingOverlay = false;
          })
        
}
}

