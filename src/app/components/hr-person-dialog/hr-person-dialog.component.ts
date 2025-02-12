import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialog, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { ProfileService } from "src/app/services/profile.service";
import { MainpageService } from "src/app/services/mainpage.service";
import { HrPersonVacationsDto } from 'src/app/models/HrPersonVacationsDto';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { GetVacationDaysInputDto } from 'src/app/models/GetVacationDaysInputDto';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hr-person-dialog',
  templateUrl: './hr-person-dialog.component.html',
  styleUrls: ['./hr-person-dialog.component.css'],
  providers: [ DatePipe ]
})
export class HrPersonDialogComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,

    private familyModal:MatDialogRef<HrPersonDialogComponent>,
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
 selectedEndDate:any;
 selectedStartDate:any;
 dateValidation : boolean;

 public hrVacationscrtl : FormControl = new FormControl();
 public hrVacationsFilterCtrl: FormControl = new FormControl();
 public filteredhrVacations: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

 protected _onDestroy = new Subject<void>();

  ngOnInit() {
    
    this.lang = localStorage.getItem('lang');
    this.strid=localStorage.getItem('user_id')
    this.disabled=false;
    
    this.PersonEditObj = this.injectedData.PersonEditObj;

    let now = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    this.PersonEditObj.operationDate = now;

    if (this.PersonEditObj.startDate) {
        this.PersonEditObj.startDate = this.fromStringToDate(this.PersonEditObj.startDate);
    }
    if (this.PersonEditObj.endDate) {
      this.PersonEditObj.endDate = this.fromStringToDate(this.PersonEditObj.endDate);
    }


    this.GetData();

    this.hrVacationsFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterhrVacations();
    });
    
  }

  fromStringToDate(str): any {
    let parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}
  public onChange(value: any): void {
    const selectedValue =value;
    this.PersonEditObj.hrVacationsTypeId=selectedValue;
    console.log('Selected value:', selectedValue);
    let selectedArrayObject = this.hrVacationsTypeList.find(o => o.id == selectedValue);
    this.PersonEditObj.attachmentRequired = selectedArrayObject.additional;
    let updateData = new GetVacationDaysInputDto();
    updateData.HrVacationsTypeId=this.PersonEditObj.hrVacationsTypeId;
      updateData.HrPersonId=this.PersonEditObj.hrPersonId;
      updateData.HrPersonId=this.PersonEditObj.hrPersonId;

      //this.strid;
    this.ProfileService.GetVacationsBalance(updateData)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log("balance")
      console.log(data.result);
      this.PersonEditObj.vacationBalance=data.result;
    },error=>{

    })
    this.ProfileService.GetTotalAnuualLeaveDays(updateData)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      
      console.log(data.result);
      this.PersonEditObj.GetTotalAnuualLeaveDays=data.result;
    },error=>{

    })

    
  }



  handleStartDateChange(event: any) {
    this.PersonEditObj.startDate = event; 
    console.log(this.PersonEditObj.startDate);
    
    this.selectedStartDate = this.datePipe.transform(event, "dd/MM/yyyy");

    let updateData = new GetVacationDaysInputDto();
    updateData.ToDate = this.selectedEndDate;
    updateData.FromDate = this.selectedStartDate;
    updateData.HrVacationsTypeId = this.PersonEditObj.hrVacationsTypeId;
    updateData.UserId = this.strid;
    updateData.HrPersonId = this.PersonEditObj.hrPersonId;
    
    this.ProfileService.GetCalcNoOfDays(updateData)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
        console.log(data);
        this.PersonEditObj.noOfDays = data.result;
    }, error => {
    });
}
handleEndDateChange(event:any) {
 

  this.PersonEditObj.endDate = event; 
  console.log(this.PersonEditObj.endDate);
  this.selectedEndDate = this.datePipe.transform(event, "dd/MM/yyyy");
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

  datevalidation(){
    var endDate = new Date(this.PersonEditObj.endDate);
    var startDate = new Date(this.PersonEditObj.startDate);
    if(endDate.getTime() === startDate.getTime() || endDate.getTime() > startDate.getTime()){
      this.dateValidation =true;
    }
    else{
    this.dateValidation =false;
  }
}

  validatePasss(){
    this.datevalidation();
    if(!this.PersonEditObj.hrVacationsTypeId || !this.PersonEditObj.hrPersonId || !this.dateValidation){
      this.toastr.warning('Validation Error kindly check it.');
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

    onFileChange(event,id){ 
      if (event.target.files.length > 0) {
        let file = event.target.files[0];
        this.ProfileService.UploadAttach(file)
        .subscribe(data =>{
          console.log(data);
          this.PersonEditObj.attachmentPath = data.result; 
        }) 
      }
    }

  
    protected filterhrVacations() {
      console.log(this.hrVacationsTypeList);
      if (!this.hrVacationsTypeList) {
        return;
      }
      let search = this.hrVacationsFilterCtrl.value;
      if (!search) {
        this.filteredhrVacations.next(this.hrVacationsTypeList.slice());
        return;
      } else {
        search = search.toLowerCase();
      }
      this.filteredhrVacations.next(
        this.hrVacationsTypeList.filter(i => i.text.toLowerCase().indexOf(search) > -1)
      );
    }
  
    hrVacationsOpenedChange(isOpened: boolean) {
      if (isOpened) {
        this.filteredhrVacations.next(this.hrVacationsTypeList.slice());
      }
    }
}
