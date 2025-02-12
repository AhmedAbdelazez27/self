import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HrDocumentRequestDto } from 'src/app/models/HrDocumentRequestDto';
import { ProfileService } from "src/app/services/profile.service";
import {  faCheck,faEye,faDownload, faSquare,faPlusCircle,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { HrDocumentRequestEditDto } from 'src/app/models/HrDocumentRequestEditDto';
import { HrDocumentRequestDialogComponent } from '../hr-document-request-dialog/hr-document-request-dialog.component';
import { Globals } from 'src/app/globals';
import { HrDocumentRequestViewComponent } from '../hr-document-request-view/hr-document-request-view.component';
import { NotificationDto } from 'src/app/models/NotificationDto';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-hr-document-request',
  templateUrl: './hr-document-request.component.html',
  styleUrls: ['./hr-document-request.component.css'],
  providers: [ DatePipe ]
})
export class HrDocumentRequestComponent implements OnInit {

    @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
    @ViewChild(MatSort,{static:false}) sort: MatSort;

  displayedColumns = ['requestDate', 'submittedTo', 'hrPersons','documentLkp','portalStatusLkp','Download','Actions'];
  dataSource: MatTableDataSource<HrDocumentRequestDto>;

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
    private matDialog: MatDialog,
    public translate: TranslateService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private _liveAnnouncer: LiveAnnouncer
  ) { }
  documentData = new HrDocumentRequestDto();
  loadingOverlay = true;
  disabled=false;
  statusList2:any=[];
  hrPersonList:any=[];
  hrPersonAlternativeList:any=[];
  notificationData = new NotificationDto();
  documentlist:any=[];
    toastrMsgs:any;
  strid:any;
  tenantId:any;
  personid:any;
  alternativepersonid:any;
  userData:any;
  supervisorname : string

  lang:string;
  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.personid=sessionStorage.getItem('person_id');
    this.strid=localStorage.getItem('user_id')
    this.ProfileService.GetAllDocumentRequests(this.strid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log(data);
        this.documentData.documentRequest = data.result;
        console.log ("document");
        console.log(this.documentData.documentRequest);
        this.documentData.documentRequest.forEach( modify =>{
          modify.requestDate = this.datePipe.transform(this.fromStringToDate(modify.requestDate));
        })
        this.dataSource = new MatTableDataSource(this.documentData.documentRequest);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
        this.loadingOverlay = false;
        console.log(this.documentData.documentRequest);
      });

      this.strid=localStorage.getItem('user_id')

      this.dropdownsService.GetHrPersonList(this.strid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>{
        this.hrPersonList = data;
      })
      this.ProfileService.GetProfileData(this.strid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>{
        console.log(data);
        this.supervisorname =  data.result.hrPersonSupervisor.fullName;
      });


      this.dropdownsService.GetDocumentTypeList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>{
        this.documentlist = data;
      })
      this.initDocumentEditObj();
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

  DocumentEditObj:HrDocumentRequestEditDto;
  DocumentEditObjIndex=null;
  filePath:string;
  editIcon=faEdit;
  deleteIcon=faTrash;
  downloadIcon=faDownload;
  addIcon=faPlusCircle;
  aprovedicon=faPlusCircle;
  apicon=faCheck;
  initDocumentEditObj(){
    this.DocumentEditObj= new HrDocumentRequestEditDto();
    this.DocumentEditObjIndex = null;
    this.DocumentEditObj.id=null;
  }
  addDocument(){
    let matDialog = new MatDialogConfig();
    this.tenantId = Number(localStorage.getItem('tenantId')); // Ensure tenantId is a number

    matDialog.disableClose = true;
    let now =this.datePipe.transform(new Date(), 'dd/MM/yyyy') ;
    this.DocumentEditObj.requestDate=this.fromStringToDate(now);
    this.DocumentEditObj.hrPersonId = Number(localStorage.getItem('user_id'));
    this.DocumentEditObj.fndStatusLkp=this.lang=='ar'?'جديد':'New';
    matDialog.data = {
      DocumentEditObjIndex: this.DocumentEditObjIndex,
      DocumentEditObj: this.DocumentEditObj,
      filePath:this.filePath}


    this.matDialog.open(HrDocumentRequestDialogComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initDocumentEditObj();
        return false
      }else{
      //  debugger;
        console.log(res);
        this.loadingOverlay = true;
        let newAttachment = new HrDocumentRequestEditDto();
        newAttachment.id=0;
        newAttachment.desc = res.desc;
        newAttachment.filePath=res.filePath;
        newAttachment.statusLkpId=41696;
        newAttachment.portalStatusLkpId=41716;
        newAttachment.documentLkpId=res.documentLkpId;
        newAttachment.submittedTo=res.submittedTo;
        newAttachment.hrPersonId=res.hrPersonId;
        newAttachment.requestDate=this.datePipe.transform(res.requestDate, 'dd/MM/yyyy');
        newAttachment.documentRequestNumber=res.documentRequestNumber;
        newAttachment.comments=res.comments;
        newAttachment.subject=res.subject;
        newAttachment.reason=res.reason;
        newAttachment.tenantId = this.tenantId; // Ensure tenantId is included in the DTO

        this.ProfileService.CreateDocumentRequestsData(newAttachment,this.tenantId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data=>{
          this.toastr.success('Document Request has been added successfully.');
          this.loadingOverlay = false;
          this.ngOnInit();
         // window.location.reload();
        },error=>{
          this.toastr.error(error.error.error.message);
          this.loadingOverlay = false;
        })


        this.initDocumentEditObj();
      }
    });
  }



  editDocument(row){
     this.DocumentEditObj.id = row.id;
    this.DocumentEditObj.desc = row.desc;
    this.DocumentEditObj.filePath = row.filePath;
     this.DocumentEditObj.documentLkpId=row.documentLkpId;
     this.DocumentEditObj.submittedTo=row.submittedTo;
     this.DocumentEditObj.hrPersonId=row.hrPersonId;
     this.DocumentEditObj.fndStatusLkp = row.fndStatusLkp;
        this.DocumentEditObj.requestDate=this.fromStringToDate(row.requestDate);
        this.DocumentEditObj.documentRequestNumber=row.documentRequestNumber;
        this.DocumentEditObj.comments=row.comments;
        this.DocumentEditObj.documentLkp=row.documentLkp;
        this.DocumentEditObj.subject=row.subject;
        this.DocumentEditObj.reason=row.reason;
    this.DocumentEditObjIndex = row;
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    // matDialog.data = {
    //   DocumentEditObjIndex: this.DocumentEditObjIndex,
    //   DocumentEditObj: this.DocumentEditObj,
    //   filePath:this.filePath
    //  }
     matDialog.data = {DocumentEditObjIndex: this.DocumentEditObjIndex,
       DocumentEditObj: this.DocumentEditObj,
       filePath:this.filePath,
       documentlist:this.documentlist,
      hrPersonList:this.hrPersonList
    }

    this.matDialog.open(HrDocumentRequestDialogComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initDocumentEditObj();
        return false
      }else{
        console.log(res);
        this.loadingOverlay = true;
        let newAttachment = new HrDocumentRequestEditDto();
        newAttachment.id = this.DocumentEditObj.id;
        newAttachment.filePath = this.DocumentEditObj.filePath;
        newAttachment.desc = this.DocumentEditObj.desc;
        newAttachment.submittedTo = this.DocumentEditObj.submittedTo;
        newAttachment.documentLkpId = this.DocumentEditObj.documentLkpId;
        newAttachment.hrPersonId = this.DocumentEditObj.hrPersonId;
        newAttachment.documentLkp=this.DocumentEditObj.documentLkp;
        newAttachment.statusLkpId=41696
        newAttachment.requestDate=this.datePipe.transform(this.DocumentEditObj.requestDate, 'dd/MM/yyyy');
        newAttachment.documentRequestNumber=this.DocumentEditObj.documentRequestNumber;
        newAttachment.comments=this.DocumentEditObj.comments;
        newAttachment.subject=this.DocumentEditObj.subject;
        newAttachment.reason=this.DocumentEditObj.reason;
        newAttachment.portalStatusLkpId=41716;
        if(newAttachment.id){
          this.ProfileService.UpdateDocumentRequestsData(newAttachment)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data=>{
            this.toastr.success('Document Request has been Updated successfully.');
            this.loadingOverlay = false;
            this.ngOnInit();

          },error=>{
            this.toastr.error(error.error.error.message);
            this.loadingOverlay = false;
          })

        }

        this.initDocumentEditObj();
      }
    });
  }


  deleteDocument(id){
    // this.loadingOverlay = true;
    this.ProfileService.DeleteDocumentRequestsData(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              this.toastr.success('Document Request has been deleted successfully');
              this.loadingOverlay = false;
              this.ngOnInit();
             // window.location.reload();
            },error=>{
              this.toastr.error(error.error.error.message);
              this.loadingOverlay = false;
            })


  }
  fromStringToDate(str):any{
    if(str!=null){
    let parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0])
    }
  }
  printDocument(id,documentLkp){
    let reportUrl = Globals.ReportUrl+"?id="+id+"&documentLkpId="+documentLkp;
    console.log(reportUrl);
    window.open(reportUrl,"_blank");
  }
  submitDocumentRequest(row){
    this.ProfileService.PreApproveDocumentRequest(this.strid,row.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(data=>{
              if (data.result.finalStatues == 'F') {
                this.toastr.warning(data.result.reason);
            }
            else {
              this.toastr.success(data.result.reason);
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


  viewDocumentRequest(row){
    console.log(row);
    console.log(row.hrPersons.firstName);
    this.DocumentEditObj.id = row.id;
    this.DocumentEditObj.desc = row.desc;
    this.DocumentEditObj.filePath = row.filePath;
    this.DocumentEditObj.documentLkpId =row.documentLkpId;
    this.DocumentEditObj.submittedTo = row.submittedTo;
    this.DocumentEditObj.hrPersonId = row.hrPersonId;
    this.DocumentEditObj.fndStatusLkp = row.fndStatusLkp;
    this.DocumentEditObj.PortalStatusLkp = row.portalStatusLkp;
    this.DocumentEditObj.portalStatusLkpId = row.portalStatusLkpId;
    this.DocumentEditObj.comments = row.comments;
    this.DocumentEditObj.subject = row.subject;
    this.DocumentEditObj.reason = row.reason;
    this.DocumentEditObj.documentLkp = row.documentLkp;
    this.DocumentEditObj.hrPersons = row.hrPersons;
    this.DocumentEditObj.lastmodificationDate = this.datePipe.transform(row.lastmodificationDate, 'dd/MM/yyyy');
    this.DocumentEditObj.supervisorSubmitDate = this.datePipe.transform(row.supervisorSubmitDate, 'dd/MM/yyyy');
    this.DocumentEditObj.supervisorSubmitId = row.supervisorSubmitId ;
    this.DocumentEditObj.supervisorname= this.supervisorname;
    this.DocumentEditObjIndex = row;
    const dialogRef = this.dialog.open(HrDocumentRequestViewComponent, {
      width: '70%',
      maxWidth: '70vw',
      height: 'auto',
      data: {
        DocumentEditObjIndex: this.DocumentEditObjIndex,
        DocumentEditObj: this.DocumentEditObj,
      },
      disableClose: true // Set disableClose here instead of MatDialogConfig
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
