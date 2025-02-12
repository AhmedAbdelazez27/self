import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HrPersonVacationsDto } from 'src/app/models/HrPersonVacationsDto';
import { ProfileService } from "src/app/services/profile.service";
import {  faCheck,faEye,faTimes,faMinusCircle,faCrow, faSquare,faPlusCircle,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PostDto, PostWithReasonDto } from 'src/app/models/postDto';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { NotificationDto } from 'src/app/models/NotificationDto';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HrDocumentRequestEditDto } from 'src/app/models/HrDocumentRequestEditDto';
import { HrDocumentRequestViewComponent } from '../hr-document-request-view/hr-document-request-view.component';
import { HrViewVacationComponent } from '../hr-view-vacation/hr-view-vacation.component';
import { DatePipe } from '@angular/common';
import { HrDocumentRequestDto } from 'src/app/models/HrDocumentRequestDto';
import { HrPersonVacationsEditDto } from 'src/app/models/HrPersonVacationsEditDto';
import { DocumentRequestViewComponent } from '../document-request-view/document-request-view.component';
import { VacationRequestViewComponent } from '../vacation-request-view/vacation-request-view.component';

@Component({
  selector: 'app-vacation-requests',
  templateUrl: './vacation-requests.component.html',
  styleUrls: ['./vacation-requests.component.css'],
  providers : [DatePipe]
})
export class VacationRequestsComponent implements OnInit {

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;

  displayedColumns = ['documentRequestDate','type', 'documentHrPersons','vacationBalance', 'vacationNoOfDays','vacationStartDate','vacationEndDate','documentTypeLkp','vacationPortalStatusLkp','Actions'];
  dataSource: MatTableDataSource<HrPersonVacationsDto>;
  injectedData: any;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private ProfileService: ProfileService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private _liveAnnouncer: LiveAnnouncer
  ) { }
  vacationData = new HrPersonVacationsDto(); 

  PersonEditObj = new HrPersonVacationsEditDto();
  PersonEditObjIndex = null;

  DocumentEditObj:HrDocumentRequestEditDto;
  DocumentEditObjIndex=null;

  loadingOverlay = true;
  approveicon=faPlusCircle;
  aprovedicon=faCheck;
  rejectedicon=faTimes;
  rejecticon=faMinusCircle;
  disabled=false;
  toastrMsgs:any;
  personid:any;
  userid:any; 
  notificationData = new NotificationDto();
  postWithReasonDto = new PostWithReasonDto();
  ngOnInit() {
    this.getToastrMsgs();
    this.personid=sessionStorage.getItem('person_id');
    this.userid=localStorage.getItem('user_id');
    this.ProfileService.GetPendingRequest(this.userid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log(data);
        this.vacationData.hrPersonVacations = data.result;
        console.log ("Pending Request");
        console.log (this.vacationData.hrPersonVacations);
        this.vacationData.hrPersonVacations.forEach( modify =>{
          modify.documentRequestDate = this.datePipe.transform(this.fromStringToDate(modify.documentRequestDate));
          modify.vacationOperationDate = this.datePipe.transform(this.fromStringToDate(modify.vacationOperationDate));
        })
        this.dataSource = new MatTableDataSource(this.vacationData.hrPersonVacations);
       setTimeout(() => this.dataSource.paginator = this.paginator);
       setTimeout(() => this.dataSource.sort = this.sort);
        this.loadingOverlay = false;
      }); 
      this.initDocumentEditObj();
      this.initPersonEditObj();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  initDocumentEditObj(){
    this.DocumentEditObj= new HrDocumentRequestEditDto();
    this.DocumentEditObjIndex = null;
    this.DocumentEditObj.id=null;
  }
  initPersonEditObj(){
    this.PersonEditObj= new HrPersonVacationsEditDto();
    this.PersonEditObjIndex = null;
    this.PersonEditObj.id=null;
  }

  getToastrMsgs(){
    this.translate.get('ToastrSuccess')
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{      
      this.toastrMsgs = data;
    })
  }
  ApproveVacationRequest(id){
    this.loadingOverlay = true;
    this.ProfileService.ApprovePersonVacation(this.postWithReasonDto)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              console.log(data);
              if (data.result.finalStatues == 'F') {
                this.toastr.warning(data.result.reason);
            }
            else { 
              this.toastr.success(this.toastrMsgs.approvedPendingRequest);
              this.loadingOverlay = false;
              this.ngOnInit();
            }
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            })
     
   
  }

  ApproveDocumentRequest(row){
    console.log(row.id);
    this.loadingOverlay = true;
    this.ProfileService.ApproveDocumentRequest(this.postWithReasonDto)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              console.log(data);
              if (data.result.finalStatues == 'F') {
                this.toastr.warning(data.result.reason);
            }
            else { 
              this.toastr.success(this.toastrMsgs.approvedPendingRequest);
              // this.notificationData.id = row.id;
              // this.notificationData.name = row.hrPersonVacations.hrPersons.fullName;
              // this.notificationData.message =row.fndPortalStatusLkp;
              // this.notificationData.type = row.type;
              // this.notificationData.status = "unRead";
              this.loadingOverlay = false;
              this.ngOnInit();
            }
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            })
     
   
  }
  RejectVacationRequest(id){
    this.ProfileService.RejectPersonVacation(this.postWithReasonDto)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              console.log(data);
              if (data.result.finalStatues == 'F') {
                this.toastr.warning(data.result.reason);
            }
            else {
              this.toastr.success(data.result.reason);
              this.loadingOverlay = false;
              this.ngOnInit();
            }
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            })
     
   
  }

  RejectDocumentRequest(id){
    this.postWithReasonDto.id = id;
    this.postWithReasonDto.reasonReject = this.DocumentEditObj.reason;
    this.postWithReasonDto.lang = "en";
    this.postWithReasonDto.userId = this.userid;
    this.ProfileService.RejectDocumentRequest(this.postWithReasonDto)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              console.log(data);
              if (data.result.finalStatues == 'F') {
                this.toastr.warning(data.result.reason);
            }
            else {
              this.toastr.success(data.result.reason);
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

  PreApproveVacationRequest(id){
    this.loadingOverlay = true;
    let postDto = new PostDto();
    postDto.userId = this.userid;
    postDto.id = id;
    postDto.lang = "en";
    this.ProfileService.PreApprovePersonVacation(postDto)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              console.log(data);
              if (data.result.finalStatues == 'F') {
                this.toastr.warning(data.result.reason);
            }
            else {
              this.toastr.success(data.result.reason);
              this.loadingOverlay = false;
              this.ngOnInit();
            }
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            }) 
  }


  viewDocumentRequest(row){
    console.log(row);
    this.DocumentEditObj.id = row.id;
    this.DocumentEditObj.desc = row.documentDesc; 
    this.DocumentEditObj.filePath = row.filePath;
    this.DocumentEditObj.documentLkpId =row.documentTypeLkpId; 
    this.DocumentEditObj.submittedTo = row.documentSubmittedTo;  
    this.DocumentEditObj.hrPersonId = row.documentHrPersonId; 
    this.DocumentEditObj.fndStatusLkp = row.fndStatusLkp; 
    this.DocumentEditObj.PortalStatusLkp = row.vacationPortalStatusLkp; 
    this.DocumentEditObj.portalStatusLkpId = row.vacationPortalStatusLkpId; 
    this.DocumentEditObj.comments = row.documentComments;
    this.DocumentEditObj.subject = row.documentSubject;
    this.DocumentEditObj.reason = row.documentReason; 
    this.DocumentEditObj.documentLkp = row.documentTypeLkp;
    this.DocumentEditObj.hrPersons = row.documentHrPersons;

    // this.vacationData.lastmodificationDate = this.datePipe.transform(row.lastmodificationDate, 'dd/MM/yyyy');
    // this.vacationData.supervisorSubmitDate = this.datePipe.transform(row.supervisorSubmitDate, 'dd/MM/yyyy');
    // this.vacationData.supervisorSubmitId = row.supervisorSubmitId ;
    // this.DocumentEditObj.supervisorname= row.supervisorname;
    this.DocumentEditObjIndex = row; 
    const dialogRef = this.dialog.open(DocumentRequestViewComponent, {
      width: '70%',
      maxWidth: '70vw',
      height: 'auto',
      data: {
        DocumentEditObjIndex: this.DocumentEditObjIndex,
        DocumentEditObj: this.DocumentEditObj, 
      },
      disableClose: true 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  viewLeaveRequest(row) {
    console.log(row)
    this.PersonEditObj.id = row.id;
    this.PersonEditObj.operationNumber = row.vacationOperationNumber;
    this.PersonEditObj.operationDate = row.vacationOperationDate;
    this.PersonEditObj.startDate = row.vacationStartDate;
    this.PersonEditObj.endDate = row.vacationEndDate; 
    this.PersonEditObj.hrPersonId = row.vacationHrPersonId; 
     this.PersonEditObj.hrPersonName = row.vacationHrPersons.fullName; 
    this.PersonEditObj.vacationBalance = row.vacationBalance; 
    // this.vacationData.hrVacationsTypeId = row.hrVacationsTypes.hrVacationsTypeId;
    this.PersonEditObj.hrVacationsTypeName = row.vacationHrVacationsTypes.vacationsTypeName;
    this.PersonEditObj.fndPortalStatusLkp =row.vacationPortalStatusLkp;
    this.PersonEditObj.portalStatusLkpId = row.vacationPortalStatusLkpId;
    this.PersonEditObj.noOfDays = row.vacationNoOfDays;
    this.PersonEditObj.notes = row.vacationNotes;
    this.PersonEditObj.reason=row.vacationReason;
    this.PersonEditObj.isOutCountryLeave = row.vacationIsOutCountryLeave == "Y" ? "Yes" : "No";
    // this.PersonEditObj.postDate = this.datePipe.transform(row.postDate, 'dd/MM/yyyy');
    // this.PersonEditObj.supervisorSubmitDate = this.datePipe.transform(row.supervisorSubmitDate, 'dd/MM/yyyy');
    // this.PersonEditObj.supervisorSubmitId = row.supervisorSubmitId ;
    this.PersonEditObj.postUserId = row.postUserId ;
    this.PersonEditObjIndex = row; 
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;

    matDialog.width = '60vw'; 
    matDialog.panelClass = 'custom-mat-dialog';
    matDialog.data={
      PersonEditObjIndex: this.PersonEditObjIndex,
      PersonEditObj: this.PersonEditObj, 
    } 
    const dialogRef = this.dialog.open(VacationRequestViewComponent, matDialog);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  fromStringToDate(str):any{
    if(str!=null){
    let parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0])
    }
  }

}
