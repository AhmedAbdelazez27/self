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

@Component({
  selector: 'app-hr-view-vacation',
  templateUrl: './hr-view-vacation.component.html',
  styleUrls: ['./hr-view-vacation.component.css'],
  providers: [ DatePipe ]
})
export class HrViewVacationComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any, 
    private familyModal:MatDialogRef<HrViewVacationComponent>,
    private dropdownsService:SelectdropdownService,
    private ProfileService:ProfileService,
    private datePipe: DatePipe,
  ) { }
  hrPersonList:any=[];
  hrPersonAlternativeList:any=[];

  hrVacationsTypeList:any=[];
  PersonEditObj = new HrPersonVacationsDto(); 
 disabled=false;
 lang:string;
 strid:any;
 selectedEndDate:any;
 selectedStartDate:any;
  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.strid=localStorage.getItem('user_id')
    this.disabled=false;
    console.log(this.injectedData);
    this.PersonEditObj = this.injectedData.PersonEditObj;
    this.PersonEditObj.supervisorSubmitDate = this.datePipe.transform(this.fromStringToDate(this.PersonEditObj.supervisorSubmitDate));
    this.PersonEditObj.postDate = this.datePipe.transform(this.fromStringToDate(this.PersonEditObj.postDate));
    console.log ("Reason");
    console.log (this.PersonEditObj);
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
    if(str!=null){
    let parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0])
    }
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
    
    this.strid=localStorage.getItem('user_id')
    this.dropdownsService.GetHrPersonList(this.strid)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{   
      this.hrPersonList = data;
    })
    
    this.dropdownsService.GethrVacationsTypeList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{   
      this.hrVacationsTypeList = data;
    }) 
    }

    btnclose(){
        this.familyModal.close()
       }
}
