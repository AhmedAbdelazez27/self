import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { ProfileService } from "src/app/services/profile.service";
import { MainpageService } from "src/app/services/mainpage.service";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
//import { HrVacationsTypesDto } from 'src/app/models/HrPersonsEditDto';
import { HrPersonsDto } from 'src/app/models/HrPersonsDto';
import { HrPersonVacationsDto, HrPersonVacationsResponsDto } from 'src/app/models/HrPersonVacationsDto';
import{HrPersonVacationsEditDto} from 'src/app/models/HrPersonVacationsEditDto'
import { HrPersonDialogComponent } from '../hr-person-dialog/hr-person-dialog.component';
import {  faEye, faSquare,faPlusCircle,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { Globals } from 'src/app/globals';
import { HrViewVacationComponent } from '../hr-view-vacation/hr-view-vacation.component';
import { PortalUserDto } from 'src/app/models/portalUserDto';
import { PostDto } from 'src/app/models/postDto';
import { GetVacationDaysInputDto } from 'src/app/models/GetVacationDaysInputDto';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-hr-vacations-types',
  templateUrl: './hr-vacations-types.component.html',
  styleUrls: ['./hr-vacations-types.component.css'],
  providers: [ DatePipe ]
})
export class HrVacationsTypesComponent implements OnInit {
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;

  displayedColumns = ['operationDate', 'fullName', 'noOfDays','hrVacationsTypes.vacationsTypeName','fndPortalStatusLkp','Actions'];
  dataSource: MatTableDataSource<HrPersonVacationsDto>;
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

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
    private _liveAnnouncer: LiveAnnouncer
  ) { }
  vacationData = new HrPersonVacationsDto(); 

  jobGradeList: any = [];
  loadingOverlay = true;
  disabled=false;
  statusList2:any=[];
  hrPersonList:any=[];
  hrPersonAlternativeList:any=[];
  printVacationReportList:any=[];

  hrVacationsTypeList:any=[];
  toastrMsgs:any;
  strid:any;
  tenantId:any;
  lang:string;
  annualLeaveDays:number;
  sickLeaveDays:number;
  otherLeaveDays:number;
  annualLeaveConsumedDays:number;
  annualLeaveRemainingDays:number;
  annualLeaveBalance:number;
  currentYear : number;
  async ngOnInit() {
    this.currentYear = this.currentYear = new Date().getFullYear();
    this.lang = localStorage.getItem('lang');
    this.disabled = true;
    
    this.getToastrMsgs();
    this.MainpageService.GetDashboardDataTable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.loadingOverlay = false;
        if (data.result.totalCount > 0) {
          this.disabled = true;
        }
      })
    
      this.strid=localStorage.getItem('user_id'); 
    this.ProfileService.GetProfileData2(this.strid)
   
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
         this.vacationData.hrPersonVacations = data.result;   
        console.log("leave request")
        console.log(this.vacationData.hrPersonVacations)
        this.vacationData.hrPersonVacations.forEach( modify =>{
        modify.operationDate = this.datePipe.transform(this.fromStringToDate(modify.operationDate));
        modify.startDate = this.datePipe.transform(this.fromStringToDate(modify.startDate));
        modify.endDate = this.datePipe.transform(this.fromStringToDate(modify.endDate));
      })
        
        this.loadingOverlay = false;
        this.dataSource = new MatTableDataSource(this.vacationData.hrPersonVacations);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
      });
   
      
    this.dropdownsService.GethrVacationsTypeList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.hrVacationsTypeList = data;
        console.log('Fetched Vacations Type List:', data);

      })
      
      this.dropdownsService.GetHrPersonList(this.strid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.hrPersonList = data;
      })


      
    let updateData1 = new GetVacationDaysInputDto();
      updateData1.HrVacationsTypeId=30;
      updateData1.HrPersonId=this.strid;
      const vacationdata = await this.ProfileService.GetVacationsBalance(updateData1).toPromise();
      this.annualLeaveBalance=vacationdata.result;
      this.annualLeaveConsumedDays = Number(this.annualLeaveBalance)-Number(this.annualLeaveDays);
      this.annualLeaveRemainingDays = this.annualLeaveConsumedDays < 0 ?0:this.annualLeaveConsumedDays;
    this.ProfileService.GetTotalAnuualLeaveDays(this.strid)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{ 
     this.annualLeaveDays=data.result;
     this.annualLeaveConsumedDays = Number(this.annualLeaveBalance)-Number(this.annualLeaveDays);
     this.annualLeaveRemainingDays = this.annualLeaveConsumedDays < 0 ?0:this.annualLeaveConsumedDays;
    },error=>{

    });

    this.ProfileService.GetTotalSickLeaveDays(this.strid)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      
      console.log(data.result);
     this.sickLeaveDays=data.result;
    },error=>{

    });

    this.ProfileService.GetTotalOtherLeaveDays(this.strid)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      
      console.log(data.result);
     this.otherLeaveDays=data.result;
    },error=>{

    })
    this.initPersonEditObj();
  }
  getToastrMsgs(){
    this.translate.get('ToastrSuccess')
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{      
      this.toastrMsgs = data;
    })
  }
  
  fromStringToDate(str):any{
    if(str!=null){
    let parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0])
    }
  }
 
  PersonEditObj:HrPersonVacationsEditDto;
  PersonEditObjIndex=null;
  editIcon=faEdit;
  deleteIcon=faTrash;
  addIcon=faPlusCircle;
  initPersonEditObj(){
    this.PersonEditObj= new HrPersonVacationsEditDto();
    this.PersonEditObjIndex = null;
    this.PersonEditObj.id=null;
  }


  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  addPerson(){
    let matDialog = new MatDialogConfig();
    this.tenantId=localStorage.getItem('tenantId'); 
    matDialog.disableClose = true;
    this.initPersonEditObj();
    matDialog.width = '70vw'; 
    matDialog.panelClass = 'custom-mat-dialog'; 
    this.PersonEditObj.fndStatusLkp=this.lang=='ar'?'جديد':'New';
  
    this.PersonEditObj.hrPersonId = Number(localStorage.getItem('user_id'));

    matDialog.data = {PersonEditObjIndex: this.PersonEditObjIndex, 
      PersonEditObj: this.PersonEditObj,
   hrVacationsTypeList: this.hrVacationsTypeList,
   hrPersonList:this.hrPersonList ,
      hrPersonAlternativeList:this.hrPersonAlternativeList}
    this.matDialog.open(HrPersonDialogComponent,matDialog)

    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initPersonEditObj();
        return false
      }else{
        this.loadingOverlay = true;
        console.log(res);
        let newVacation = new HrPersonVacationsEditDto();
       this.tenantId = Number(localStorage.getItem('tenantId')); // Ensure tenantId is a number
       newVacation.id=0;
        newVacation.operationNumber=null;
        newVacation.operationDate=res.operationDate;   
        newVacation.startDate=this.datePipe.transform(res.startDate, 'dd/MM/yyyy');
        newVacation.endDate=this.datePipe.transform(res.endDate, 'dd/MM/yyyy');
       newVacation.hrPersonId = this.PersonEditObj.hrPersonId;
        newVacation.hrVacationsTypeId=res.hrVacationsTypeId;
        newVacation.vacationBalance=res.vacationBalance;
        newVacation.statusLkpId=842;
        newVacation.portalStatusLkpId=41698;
        newVacation.noOfDays=res.noOfDays;
        newVacation.notes=res.notes;
        newVacation.isFromPortal=true;
        newVacation.attachmentPath = this.PersonEditObj.attachmentPath;
        newVacation.isOutCountryLeave = this.PersonEditObj.isOutCountryLeave;
        newVacation.tenantId=Number(localStorage.getItem('tenantId'));
            this.ProfileService.CreatePersonVacationData(newVacation, this.tenantId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              this.toastr.success('Leave Request had been added Successfully');
              this.loadingOverlay = false;
              this.ngOnInit();
             // window.location.reload();
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            })
      }
    });
  }



  editPerson(row){
    this.disabled = false;
    console.log(row);
    this.PersonEditObj.id = row.id;
    this.PersonEditObj.hrVacationsTypeId=this.lang=='ar'?'جديد':'leave';
    
    this.PersonEditObj.operationNumber = row.operationNumber;
    this.PersonEditObj.operationDate = row.operationDate;
    this. PersonEditObj.startDate=this.datePipe.transform(row.startDate, 'dd/MM/yyyy');
    this. PersonEditObj.endDate=this.datePipe.transform(row.endDate, 'dd/MM/yyyy');
    this.PersonEditObj.hrVacationsTypeId = row.hrVacationsTypes.id;

    this.PersonEditObj.hrPersonId = row.hrPersonId;
   this.PersonEditObj.attachmentPath = row.attachmentPath;
    this.PersonEditObj.vacationBalance = row.hrVacationsTypes.vacationBalance;
    this.PersonEditObj.fndStatusLkp = row.fndStatusLkp;
    this.PersonEditObj.noOfDays = row.noOfDays;
    this.PersonEditObj.notes = row.notes;
    this.PersonEditObj.attachmentRequired = row.attachmentRequired;
    this.PersonEditObj.isOutCountryLeave = row.isOutCountryLeave;
    this.PersonEditObjIndex = row;
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    
    matDialog.data = {
      PersonEditObjIndex: this.PersonEditObjIndex,
      PersonEditObj: this.PersonEditObj, 
      hrVacationsTypeList: this.hrVacationsTypeList,
      hrPersonList: this.hrPersonList,
      hrPersonAlternativeList: this.hrPersonAlternativeList
    };
    
    this.matDialog.open(HrPersonDialogComponent, matDialog)
      .afterClosed().subscribe(res => {
        if (res == null || res == undefined) {
          this.initPersonEditObj();
          return false;
        } else {
          this.loadingOverlay = true;
          console.log(res);
          let newVacation = new HrPersonVacationsEditDto();
          newVacation.id = this.PersonEditObj.id;
          newVacation.operationNumber = this.PersonEditObj.operationNumber;
          newVacation.operationDate = this.PersonEditObj.operationDate;
          newVacation.startDate = this.datePipe.transform(this.PersonEditObj.startDate, 'dd/MM/yyyy');
          newVacation.endDate = this.datePipe.transform(this.PersonEditObj.endDate, 'dd/MM/yyyy');
          newVacation.hrPersonId = this.PersonEditObj.hrPersonId;
          newVacation.attachmentPath = this.PersonEditObj.attachmentPath;
          newVacation.hrVacationsTypeId = row.hrVacationsTypes.hrVacationsTypeId;
          newVacation.hrVacationsTypeName = row.hrVacationsTypes.vacationsTypeName;
          newVacation.vacationBalance = this.PersonEditObj.vacationBalance;
          newVacation.statusLkpId = this.PersonEditObj.statusLkpId;
          newVacation.noOfDays = this.PersonEditObj.noOfDays;
          newVacation.notes = this.PersonEditObj.notes;
          newVacation.isFromPortal = true;
          newVacation.isOutCountryLeave = this.PersonEditObj.isOutCountryLeave;
          newVacation.portalStatusLkpId = 41698;
    
          if (newVacation.id) {
            this.ProfileService.UpdatePersonVacationData(newVacation)
              .pipe(takeUntil(this.destroy$))
              .subscribe(data => {
                this.toastr.success('Leave Request has been updated successfully.');
                this.loadingOverlay = false;
                this.ngOnInit();
              }, error => {
                this.toastr.error(error.error.error.message);
                this.loadingOverlay = false;
              });
          }
        }
      });
    
  }

  deletePerson(id){
    this.ProfileService.DeletePersonVacationData(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              this.toastr.success(this.toastrMsgs.deleteLeaveRequest);
              this.loadingOverlay = false;
              this.ngOnInit(); 
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            }) 
  }

  submitLeaveRequest(id){ 
    let postDto = new PostDto();
    postDto.userId = this.strid;
    postDto.lang = "en";
    postDto.id=id;
    this.ProfileService.PreApprovePersonVacation(postDto)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              this.toastr.success(this.toastrMsgs.submitLeaveRequest);
              this.loadingOverlay = false;
              this.ngOnInit(); 
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            }) 
  }

  printVacationDocument(id){
    let reportUrl = Globals.ReportUrl+"?id="+id+"&documentLkpId=41707"
    console.log(reportUrl);
    window.open(reportUrl,"_blank");
  }



  
  // printVacationReportDocument(id: number, hrVacationsTypeId: number) {
  //   let reportUrl = `${Globals.VactionReportUrl}?id=${id}&hrVacationsTypeId=${hrVacationsTypeId}&documentLkpId=41707`;
  //   console.log(reportUrl);
  //   window.open(reportUrl, "_blank");
  // }
  printVacationReportDocument(id: string, hrVacationsTypeId: string) {
    const lang = localStorage.getItem('lang') || 'en';
    this.ProfileService.printVacation(id, hrVacationsTypeId, lang).subscribe(
        (result) => {
            console.log(result); 
            if (result && result.success && Array.isArray(result.result) && result.result.length > 0) {
                 this.printVacationReportList = result.result; 
                 this.openPrintPreview(); 
            } else {
                this.toastr.error(this.toastrMsgs.NoData); 
            }
        },
        (error) => {
            console.error('Error fetching vacation report:', error);
            this.toastr.error(this.toastrMsgs.FetchError); 
        }
    );
}
  viewLeaveRequest(row) {
    console.log(row)
    this.PersonEditObj.id = row.id;
    this.PersonEditObj.operationNumber = row.operationNumber;
    this.PersonEditObj.operationDate = row.operationDate;
    this.PersonEditObj.startDate = row.startDate;
    this.PersonEditObj.endDate = row.endDate; 
    this.PersonEditObj.hrPersonId = row.hrPersonId; 
    this.PersonEditObj.hrPersonName = row.hrPersons.fullName; 
    this.PersonEditObj.vacationBalance = row.hrVacationsTypes.vacationBalance; 
    this.PersonEditObj.hrVacationsTypeId = row.hrVacationsTypes.hrVacationsTypeId;
    this.PersonEditObj.hrVacationsTypeName = row.hrVacationsTypes.vacationsTypeName;
    this.PersonEditObj.fndPortalStatusLkp =row.fndPortalStatusLkp;
    this.PersonEditObj.portalStatusLkpId = row.portalStatusLkpId;
    this.PersonEditObj.noOfDays = row.noOfDays;
    this.PersonEditObj.notes = row.notes;
    this.PersonEditObj.reason=row.reason;
    this.PersonEditObj.isOutCountryLeave = row.isOutCountryLeave == "Y" ? "Yes" : "No";
    this.PersonEditObj.postDate = this.datePipe.transform(row.postDate, 'dd/MM/yyyy');
    this.PersonEditObj.supervisorSubmitDate = this.datePipe.transform(row.supervisorSubmitDate, 'dd/MM/yyyy');
    this.PersonEditObj.supervisorSubmitId = row.supervisorSubmitId ;
    this.PersonEditObj.postUserId = row.postUserId ;
    this.PersonEditObjIndex = row; 
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;

    matDialog.width = '85vw'; 
    matDialog.panelClass = 'custom-mat-dialog';
    matDialog.data={
      PersonEditObjIndex: this.PersonEditObjIndex,
      PersonEditObj: this.PersonEditObj, 
    } 
    const dialogRef = this.dialog.open(HrViewVacationComponent, matDialog);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openPrintPreview() {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        const employee = this.printVacationReportList[0];
        printWindow.document.write(`
<html>
<head>
<style>
    @page { margin: 0; } 
    body { font-family: Arial, sans-serif; }
    .header img {   height: 100px;  }
    .header h1 {  margin: 0;   flex-grow: 1; text-align: left; margin-left: 270px;  }
    .container { margin: 20px; }
     table {  width: 100%;  border-collapse: collapse;  margin-top: 30px;  }
    .header {  display: flex;  align-items: center; margin-bottom: 20px; color: #333333; text-align: center;  }
    .header-title { margin-bottom: 30px;   text-decoration: none;  font-family: Arial, sans-serif;  font-size: 38px; color: #666666;text-transform: uppercase;}
    th,td {  border: 1px solid rgba(0, 0, 0, 0.2);  padding: 4px; text-align: left; height: 30px; }
    td { max-width: 20px;  overflow: hidden;  white-space: nowrap; text-overflow: ellipsis;}
    table th {  background-color: rgb(233, 235, 236); color: rgb(23, 23, 24);  }
    strong {font-weight: 600;   }
    .underline { border-bottom: 2px solid rgb(211, 213, 218);  padding-bottom: 2px;  display: inline-block;  width: 150px;  text-align :center;   }
    .signature-text { display: inline-block;  border-bottom: 2px solid rgb(0, 0, 0);  padding-bottom: 2px;  }
    label {  margin-left: 10px;  }
    .leave-slip-title {  text-align: center;  margin-bottom: 30px;  text-decoration: underline;   }
</style>
</head>
<body>
<div class="header">
    <h1 class="header-title">${employee.tenancyName || ''}</h1>
    <img src="${employee.tenantLogoPath || ''}" alt="Logo"> 
</div>
<h2 class="leave-slip-title">LEAVE REQUEST</h2>
<div class="container">
    <table>
      <tbody>
        <tr>
          <td><strong>Employee Name:</strong> ${employee.fullName || ''}</td>
          <td><strong>Department:</strong> ${employee.departmentName || ''}</td>
        </tr>
        <tr style="height: 150px;"> 
             <td colspan="2" style="vertical-align: top;"><strong>Reasons For Requested Leave:</strong>  <br>
               <span class="value">${employee.vacationsTypeName || ''}</span>
             </td> 
        </tr>
        <tr>
          <td colspan="2">
            <strong>Date Requested:</strong>&nbsp;&nbsp; &nbsp; &nbsp;  
            <strong>From </strong>&nbsp;&nbsp; <span class="underline">${this.formatDate(employee.startDate) || ''}</span> &nbsp;
            <strong>To </strong> &nbsp;&nbsp;<span class="underline">${this.formatDate(employee.endDate) || ''}</span>
          </td>
        </tr>
      </tbody>
    </table>
</div>
<br><br>
<div class="container" style="text-align: right;">
    <strong>Employee's Signature</strong>
    <span class="separator">:</span>
    <span class="underline"></span>
</div>
<div class="container" style="text-align: right;">
    <strong>Manager/Supervisor Approval</strong>
    <span class="separator">:</span>
    <label>
        <input type="checkbox" > Approved
    </label>
    <label>
        <input type="checkbox"> Rejected
    </label>
</div>
<div class="container" style="text-align: center;">
    <table style="margin: auto;"> 
      <tbody>
        <tr style="height: 140px;"> 
             <td colspan="2" style="vertical-align: top;">
            <strong style="color: rgb(136, 188, 236);">Notes / Comments:</strong> ${employee.notes || ''}
             </td> 
        </tr>
      </tbody>
    </table>
</div>
</body>
</html>
 `);
  printWindow.document.close();
  printWindow.print();
    }
}
}
