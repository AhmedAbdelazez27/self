import { DatePipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Subject } from "rxjs";
import { HrViewVacationComponent } from "../hr-view-vacation/hr-view-vacation.component";
import { SelectdropdownService } from "src/app/services/selectdropdown.service";
import { HrPersonVacationsDto } from "src/app/models/HrPersonVacationsDto";
import { takeUntil } from "rxjs/operators";
import { GetVacationDaysInputDto } from "src/app/models/GetVacationDaysInputDto";
import { ProfileService } from "src/app/services/profile.service";
import { ToastrService } from "ngx-toastr";
import { PostWithReasonDto } from "src/app/models/postDto";

@Component({
  selector: 'app-vacation-request-view',
  templateUrl: './vacation-request-view.component.html',
  styleUrls: ['./vacation-request-view.component.css'],
  providers: [ DatePipe ]
  
})
export class VacationRequestViewComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  toastrMsgs: any;
  userid: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any, 
    private familyModal:MatDialogRef<VacationRequestViewComponent>,
    private dropdownsService:SelectdropdownService,
    private ProfileService:ProfileService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
  ) { }
  hrPersonList:any=[];
  hrPersonAlternativeList:any=[];

  hrVacationsTypeList:any=[];
  PersonEditObj = new HrPersonVacationsDto(); 
 disabled=false;
 lang:string;
 strid:any;
 loadingOverlay = false;
 selectedEndDate:any;
 selectedStartDate:any;
 postWithReasonDto = new PostWithReasonDto();
  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.strid=localStorage.getItem('user_id')
    this.disabled=false;
    
    this.PersonEditObj = this.injectedData.PersonEditObj;
     this.GetData(); 
    this.ProfileService.GetProfileData(this.strid)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{ 
      let userData =  data.result;   
      this.PersonEditObj.supervisorname = userData.hrPersonSupervisor.fullName;
      this.PersonEditObj.postUserName = "";
    });
  }
  fromStringToDate(str):any{
    let parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0])
  }
  public onChange(value: any): void {
    const selectedValue =value;
   // const selectedValue = event.value; // Retrieve the selected value
    this.PersonEditObj.hrVacationsTypeId=selectedValue;
    console.log('Selected value:', selectedValue);
    let updateData = new GetVacationDaysInputDto();
    updateData.HrVacationsTypeId=this.PersonEditObj.hrVacationsTypeId;
      updateData.HrPersonId=this.PersonEditObj.hrPersonId;
      updateData.HrPersonId=this.PersonEditObj.hrPersonId;

      //this.strid;
    this.ProfileService.GetVacationsBalance(updateData)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      
      console.log(data.result);
      this.PersonEditObj.vacationBalance=data.result;
    },error=>{

    })
  }

handleStartDateChange(event: any) {
 
  this.PersonEditObj.startDate= event;  
    this.selectedStartDate =this.datePipe.transform(event,"dd/MM/yyyy");

    
      let updateData = new GetVacationDaysInputDto();
      updateData.ToDate=this.selectedEndDate;
      updateData.FromDate=this.selectedStartDate;
      updateData.HrVacationsTypeId=this.PersonEditObj.hrVacationsTypeId;
      updateData.UserId=this.strid;
      updateData.HrPersonId=this.PersonEditObj.hrPersonId;//this.strid;
      
     
      this.ProfileService.GetCalcNoOfDays(updateData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>{
        console.log(data);
        this.PersonEditObj.noOfDays=data.result;
      },error=>{
         
         
      })
   // }

}
handleEndDateChange(event:any) {
 
  this.PersonEditObj.endDate=event;
    this.selectedEndDate = this.datePipe.transform(event,"dd/MM/yyyy");;
      let updateData = new GetVacationDaysInputDto();
      updateData.ToDate=this.selectedEndDate;
      updateData.FromDate=this.selectedStartDate;
      updateData.HrVacationsTypeId=this.PersonEditObj.hrVacationsTypeId;
      updateData.UserId=this.strid;
      updateData.HrPersonId=this.PersonEditObj.hrPersonId;//this.strid;
     
      this.ProfileService.GetCalcNoOfDays(updateData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>{
        
        console.log(data.result);
        this.PersonEditObj.noOfDays=data.result;
      },error=>{
         
         
      })
   // }

}

  save(){
    this.validatePasss();
  }

  validatePasss(){
    
    if(!this.PersonEditObj.hrVacationsTypeId || !this.PersonEditObj.hrPersonId){
      return false;
    }else{
      this.familyModal.close(this.PersonEditObj);
    }
  }

  cancel(){
    this.familyModal.close(null);
  }
  GetData(){
    this.loadingOverlay = true;
    this.strid=localStorage.getItem('user_id')
    this.dropdownsService.GetHrPersonList(this.strid)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{   
      this.hrPersonList = data;
      this.loadingOverlay = false;
    })
    
    this.dropdownsService.GethrVacationsTypeList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{   
      this.hrVacationsTypeList = data;
      this.loadingOverlay = false;
    }) 
    }

    btnclose(){
        this.familyModal.close()
       }
       ApproveVacationRequest(id){
        this.loadingOverlay = true;
        let postWithReasonDto = new PostWithReasonDto();
        postWithReasonDto.id = id;
        postWithReasonDto.userId = this.strid;
        postWithReasonDto.lang = "en";
        postWithReasonDto.reasonReject = this.PersonEditObj.reason;
        this.ProfileService.ApprovePersonVacation(postWithReasonDto)
                .pipe(takeUntil(this.destroy$))
                .subscribe(data=>{
                  console.log(data);
                  if (data.result.finalStatues == 'F') {
                    this.toastr.warning(data.result.reason);
                }
                else { 
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

RejectPersonVacation(id) {
  this.loadingOverlay = true;
  let postWithReasonDto = new PostWithReasonDto();
  postWithReasonDto.id = id;
  postWithReasonDto.userId = this.strid;
  postWithReasonDto.lang = "en";
  postWithReasonDto.reasonReject = this.PersonEditObj.reason;

  if (!postWithReasonDto.reasonReject || postWithReasonDto.reasonReject.trim() === '') {
    this.toastr.warning('Rejection reason is mandatory.');
    this.loadingOverlay = false;
    return;
  }

  this.ProfileService.RejectPersonVacation(postWithReasonDto)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        console.log(data);
        if (data.result.finalStatues === 'F') {
          this.toastr.warning(data.result.reason);
        } else {
          this.toastr.success('Rejected successfully.');
          this.loadingOverlay = false;
          window.location.reload();
          // this.ngOnInit();
          // this.familyModal.close(null);
        }
      },
      error => {
        this.toastr.error(error.error.error.message);
        this.loadingOverlay = false;
      }
    );
}

}
