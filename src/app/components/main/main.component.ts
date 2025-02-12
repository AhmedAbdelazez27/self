import { Component, OnInit, HostListener, ChangeDetectorRef } from "@angular/core"; 
import { MainpageService } from "src/app/services/mainpage.service";
import { AddrequestService } from "src/app/services/addrequest.service";
import {
  portalgetalldatatable,
  ScPortalRequest,
} from "src/app/models/portalgetalldatatable";
import {
  faPen,
  faEye,
  faTrash,
  faChartBar,
  faAddressCard,
  faStickyNote,
  faLock,
  faDownload,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DeletemodalComponent } from "src/app/components/deletemodal/deletemodal.component";
import { BoardService } from "src/app/services/board.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { ProfileService } from "src/app/services/profile.service";
import { HrPersonsDto } from "src/app/models/HrPersonsDto";
import { SelectdropdownService } from "src/app/services/selectdropdown.service";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { DatePipe } from "@angular/common";
import { MatCalendar } from '@angular/material';
import { GetVacationDaysInputDto } from "src/app/models/GetVacationDaysInputDto";
import { HrDocumentRequestDto, HrTeamAvailableDto, HrTeamAvailableResponseDto } from "src/app/models/HrDocumentRequestDto";
import { Globals } from "src/app/globals";
import { HrPersonVacationsDto, HrVacationsTypesDto } from "src/app/models/HrPersonVacationsDto";
import { getDate } from "date-fns";
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
  providers: [DatePipe],
}) 

export class MainComponent implements OnInit {
  columnClass: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private datePipe: DatePipe,
    private MainpageService: MainpageService,
    private AddrequestService: AddrequestService,
    private route: Router,
    private deleteModal: MatDialog,
    private BoardService: BoardService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private ProfileService: ProfileService,
    private dropdownsService: SelectdropdownService,
    private cdr: ChangeDetectorRef
  ) {
    this.setColumnClass(window.innerWidth);
  }

  orders: ScPortalRequest[] = [];
  userData = new HrPersonsDto();

  loadingOverlay = true;
  // Icons
  editIcon = faPen;
  showIcon = faEye;
  deleteIcon = faTrash;
  toastrMsgs: any;
  disabled = false;
  firstTitleList: any = [];
  jobList: any = [];
  jobGradeList: any = [];
  hrOrganizationsDeptList: any = [];
  nationalityList: any = [];
  genderList: any = [];
  hrOrganizationsBranchList: any = [];
  maritalStatusList: any = [];
  statusList: any = [];
  passIcon = faLock;
  downloadIcon=faDownload;
  apicon=faCheck;
  usrid: any;
  currentDateTime: any;
  dayPart: any;
  profilePercentage: number;
  annualLeaveConsumedDays : number;
  annualLeaveDays:number;
  hasSalary:boolean=false;
  hasAttachment:boolean= false;
  hasPersonal:boolean= false;
  hasAddress:boolean= false;
  personPhoto: string;
  currentYear : number;
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
  progressValue: number = 90;
  progressColor: string = 'accent';
  progressColors: string = 'Warn';
  progressColort: string = 'green';
  progressValues: number = 75;
  progressValuet: number = 95;
  lang: string;
  noOfSickLeave:string;
  noOfAnualLeave:number;
  documentData = new HrDocumentRequestDto();  
  teamData = new HrTeamAvailableDto();
  leaveRequestData = new HrPersonVacationsDto();
  async ngOnInit() {
    this.currentYear = this.currentYear = new Date().getFullYear();
    console.log("year");
    console.log(this.currentYear)
    console.log(this.currentDateTime);
    this.lang = localStorage.getItem("lang");
    this.usrid = localStorage.getItem("user_id");
    this.disabled = true;
    this.getToastrMsgs(); 
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    console.log(hours);
    console.log(ampm);
    if (hours >= 18) {
      this.dayPart = this.lang == "ar" ? "مساء الخير" : "Good Evening";
    } else if (hours < 18 && hours > 12) {
      this.dayPart = this.lang == "ar" ? "مساء الخير" : "Good AfterNoon";
    }
    if (hours < 12) {
      this.dayPart = this.lang == "ar" ? "صباح الخير" : "Good Morning";
    }
    this.profilePercentage = 25;
    const personalPercentage = await this.ProfileService.GetPercentagePersonalInformation(this.usrid).toPromise(); 
    this.profilePercentage = this.profilePercentage + Number(personalPercentage.result);
    if(Number(personalPercentage.result) > 0){
      this.hasPersonal = true;
    }
    else{
      this.hasPersonal = false;
    }
    const attachmentPercentage = await this.ProfileService.GetPercentageAttachment(this.usrid).toPromise();
    this.profilePercentage = this.profilePercentage + Number(attachmentPercentage.result); 
    if(Number(attachmentPercentage.result) > 0){
      this.hasAttachment = true;
    }
    else{
      this.hasAttachment = false;
    }
    const addressPercentage = await this.ProfileService.GetPercentagAddress(this.usrid).toPromise();
    this.profilePercentage = this.profilePercentage + Number(addressPercentage.result); 
   console.log('Address'+addressPercentage.result);
    if(Number(addressPercentage.result) > 0){
      this.hasAddress = true;
    }
    else{
      this.hasAddress = false;
    }
    const hasSalary = await this.ProfileService.GetSalaryInfo(this.usrid).toPromise();
    // this.profilePercentage = this.profilePercentage + Number(hasSalary.result); 
    this.profilePercentage = this.profilePercentage + 0; 
    console.log('Salary'+hasSalary.result);
     if(Number(hasSalary.result) > 0){
       this.hasSalary = true;
     }
     else{
       this.hasSalary = false;
     }

    this.ProfileService.GetProfileData(this.usrid)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log(data);
        this.userData = data.result;
        this.personPhoto = data.result.personPhoto;
        sessionStorage.setItem("person_id", this.userData.id.toString());

        // this.userData.birthDate = this.fromStringToDate(data.result.birthDate);
        // this.userData.hireDate = this.fromStringToDate(data.result.hireDate);
        // if (data.result.probationEndDate) { this.userData.probationEndDate = this.fromStringToDate(data.result.probationEndDate); }
        this.loadingOverlay = false;
      });
      let updateData = new GetVacationDaysInputDto();
      updateData.HrVacationsTypeId=22;
      updateData.HrPersonId=this.usrid;
      this.ProfileService.GetVacationsBalance(updateData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>{
        
        console.log(data.result);
       this.noOfSickLeave=data.result;

      },error=>{
  
      })
      let updateData1 = new GetVacationDaysInputDto();
      updateData1.HrVacationsTypeId=30;
      updateData1.HrPersonId=this.usrid;
      this.ProfileService.GetVacationsBalance(updateData1)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>{
        
        console.log(data.result);
       this.noOfAnualLeave=data.result;
       //this.noOfAnualLeave = 22; 
       this.annualLeaveConsumedDays = Number(this.noOfAnualLeave)-Number(this.annualLeaveDays);
       this.annualLeaveConsumedDays = this.annualLeaveConsumedDays < 0?0:this.annualLeaveConsumedDays;
      },error=>{
  
      })
      this.ProfileService.GetTotalAnuualLeaveDays(this.usrid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>{ 
       this.annualLeaveDays=data.result;
       this.annualLeaveConsumedDays = Number(this.noOfAnualLeave)-Number(this.annualLeaveDays);
       this.annualLeaveConsumedDays = this.annualLeaveConsumedDays < 0?0:this.annualLeaveConsumedDays;
      },error=>{
  
      });

      this.ProfileService.GetAllEmployeeSameSupervisor(this.usrid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.teamData = data.result;
        console.log(data); 
        this.loadingOverlay = false; 
      });
 
      
      this.ProfileService.GetAllDocumentRequests(this.usrid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => { 
        this.documentData.documentRequest = data.result; 
        this.loadingOverlay = false; 
      });
      
      this.ProfileService.GetProfileData2(this.usrid)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log(data);
        this.leaveRequestData.hrPersonVacations = data.result; 
        this.loadingOverlay = false; 
      });
    // FirstTitleList Select Drop Down
    this.dropdownsService
      .GetFirstTitleList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.firstTitleList = data;
      });
    // jobList Select Drop Down
    this.dropdownsService
      .GetjobList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.jobList = data;
      });
    //jobGradeList Select Drop Down
    this.dropdownsService
      .GetjobGradeList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.jobGradeList = data;
      });
    //hrOrganizationsDeptList Select Drop Down
    this.dropdownsService
      .GethrOrganizationsDeptList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.hrOrganizationsDeptList = data;
      });
    // Nationality Select Drop Down
    this.dropdownsService
      .GetNationalityList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.nationalityList = data;
      });
    // Gender Select Drop Down
    this.dropdownsService
      .GetGenderList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.genderList = data;
      });
    //hrOrganizationsBranchList Select Drop Down
    this.dropdownsService
      .GethrOrganizationsBranchList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.hrOrganizationsBranchList = data;
      });
    //status Select Drop Down
    this.dropdownsService
      .GetstatusList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.statusList = data;
      });
      this.cdr.detectChanges();
  }
  fromStringToDate(str): any {
    let parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  // getData(){
  //   this.MainpageService.GetDashboardDataTable()
  //   .pipe(takeUntil(this.destroy$))
  //   .subscribe(data=>{
  //     this.orders = data.result.items;
  //     this.loadingOverlay = false;
  //     let filterdOrders = this.orders.filter(x=>x.statusLkpId == 149 || x.statusLkpId == 150 || x.statusLkpId == 179 || x.statusLkpId == 158);
  //     if(filterdOrders.length>0){
  //       this.MainpageService.SetAddRequestPermissionToSessionStorage(false);
  //     }else{
  //       this.MainpageService.SetAddRequestPermissionToSessionStorage(true);
  //     }
  //   })
  // }

  // editRow(id,tenantId){
  //   this.route.navigate(['board/addrequest',id, tenantId])
  // }

  // viewRow(id,tenantId){
  //   this.route.navigate(['board/addrequest',id, tenantId,'view'])
  // }

  getToastrMsgs() {
    this.translate
      .get("ToastrSuccess")
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.toastrMsgs = data;
      });
  }

  // deleteRow(id,tenantId){
  //   let matDialog = new MatDialogConfig();
  //   matDialog.disableClose = true;
  //   matDialog.maxWidth="350px";
  //   this.deleteModal.open(DeletemodalComponent,matDialog)
  //   .afterClosed().subscribe(res=>{
  //     if(res == null || res == undefined){
  //       return false
  //     }else{
  //       this.loadingOverlay = true;
  //       this.AddrequestService.DeleteRequest(id,tenantId)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe(data=>{
  //         this.toastr.success(this.toastrMsgs.delete);
  //         this.getData();
  //         this.BoardService.pushNotification()
  //       },error=>{
  //         this.toastr.error(error.error.error.message);
  //       })
  //     }
  //   });

  // }
  
  selectedDate: any;
  onSelect(event){
    console.log(event);
    this.selectedDate= event;
  }
  printDocument(id,documentLkp){
    let reportUrl = Globals.ReportUrl+"?id="+id+"&documentLkpId="+documentLkp;  
    console.log(reportUrl);
    window.open(reportUrl,"_blank");
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setColumnClass(event.target.innerWidth);
  }

  setColumnClass(windowWidth: number) {
    if (windowWidth >= 767 && windowWidth <= 1024) {
      this.columnClass = 'col-md-4';
    } else {
      this.columnClass = 'col-md-8';
    }
  }

}
