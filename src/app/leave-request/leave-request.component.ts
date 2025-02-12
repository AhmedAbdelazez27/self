 
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
 
  import { HrPersonVacationsEditDto } from 'src/app/models/HrPersonVacationsEditDto';
import { DocumentRequestViewComponent } from '../components/document-request-view/document-request-view.component';
import { VacationRequestViewComponent } from '../components/vacation-request-view/vacation-request-view.component';
//import { DatePipe } from '@angular/common';
 

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:false}) sort: MatSort;

  displayedColumns = ['type', 'documentHrPersons','vacationBalance', 'vacationNoOfDays','vacationStartDate','vacationEndDate','documentTypeLkp','vacationPortalStatusLkp' ];
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
   // private datePipe: DatePipe,  
    private _liveAnnouncer: LiveAnnouncer
  ) { }
  vacationData = new HrPersonVacationsDto(); 

  PersonEditObj = new HrPersonVacationsEditDto();
  PersonEditObjIndex = null;
 

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
    this.ProfileService.GetPendingRequestHistory(this.userid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log(data);
        this.vacationData.hrPersonVacations = data.result;
         this.vacationData.hrPersonVacations.forEach( modify =>{
       //   modify.vacationOperationDate = this.datePipe.transform(this.fromStringToDate(modify.vacationOperationDate));
        })
        this.dataSource = new MatTableDataSource(this.vacationData.hrPersonVacations);
       setTimeout(() => this.dataSource.paginator = this.paginator);
       setTimeout(() => this.dataSource.sort = this.sort);
        this.loadingOverlay = false;
      }); 
       this.initPersonEditObj();
  }

  announceSortChange(sortState: Sort) {
   
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
 


  
  viewLeaveRequest(row) {
     this.PersonEditObj.id = row.id;
    this.PersonEditObj.operationNumber = row.vacationOperationNumber;
    this.PersonEditObj.operationDate = row.vacationOperationDate;
    this.PersonEditObj.startDate = row.vacationStartDate;
    this.PersonEditObj.endDate = row.vacationEndDate; 
    this.PersonEditObj.hrPersonId = row.vacationHrPersonId; 
     this.PersonEditObj.hrPersonName = row.vacationHrPersons.fullName; 
    this.PersonEditObj.vacationBalance = row.vacationBalance; 
     this.PersonEditObj.hrVacationsTypeName = row.vacationHrVacationsTypes.vacationsTypeName;
    this.PersonEditObj.fndPortalStatusLkp =row.vacationPortalStatusLkp;
    this.PersonEditObj.portalStatusLkpId = row.vacationPortalStatusLkpId;
    this.PersonEditObj.noOfDays = row.vacationNoOfDays;
    this.PersonEditObj.notes = row.vacationNotes;
    this.PersonEditObj.reason=row.vacationReason;
    this.PersonEditObj.isOutCountryLeave = row.vacationIsOutCountryLeave == "Y" ? "Yes" : "No";
    
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
