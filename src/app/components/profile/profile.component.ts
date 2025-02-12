import { Component, OnInit, ViewChild } from '@angular/core';
import { faTrash,faPlusCircle,faEdit, faDownload } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from "src/app/services/profile.service";
import { MainpageService } from "src/app/services/mainpage.service";
import { SelectdropdownService } from "src/app/services/selectdropdown.service";
import { PortalUserDto } from 'src/app/models/portalUserDto';
import { EditUserPortal } from 'src/app/models/editUserPortal';
import { DatePipe } from '@angular/common';
import { SelectdropdownResultResults } from 'src/app/models/selectdropdown';
import { EditUserRelativesDto } from 'src/app/models/editUserRelatives';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { FamilymembersmodalComponent } from 'src/app/components/familymembersmodal/familymembersmodal.component';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PortalUserAttachmentsDto } from 'src/app/models/PortalUserAttachmentsDto';
import { AttachmentsmodalComponent } from '../attachmentsmodal/attachmentsmodal.component';
import { PortalRequestAttachmentCreate, PortalUserAttachmentsCreate, portalRequestCreate } from 'src/app/models/portalRequestCreate';
import { HrPersonAddressDetailsDto, HrPersonAttachmentsDto, HrPersonHealthCardDetailsDto, HrPersonIdentityCardDto, HrPersonJobAttachmentsDto, HrPersonPassportDetailsDto, HrPersonSalaryElementsDto, HrPersonVisaDetailsDto, HrPersonsDto } from 'src/app/models/HrPersonsDto';
import { HrPersonVisaDetailsEditDto } from 'src/app/models/HrPersonVisaDetailsEditDto';
import { VisaModalComponent } from '../visa-modal/visa-modal.component';
import { HrPersonPassportDetailsEditDto } from 'src/app/models/HrPersonPassportDetailsEditDto';
import { PassportModalComponent } from '../passport-modal/passport-modal.component';
import { HrPersonIdentityCardEditDto } from 'src/app/models/HrPersonIdentityCardEditDto';
import { IdentityCardModalComponent } from '../identity-card-modal/identity-card-modal.component';
import { HrPersonsEditDto } from 'src/app/models/HrPersonsEditDto';
import { HrPersonHealthCardDetailsEditDto } from 'src/app/models/HrPersonHealthCardDetailsEditDto';
import { HealthModalComponent } from '../health-modal/health-modal.component';
import { element } from 'protractor';
import { HrPersonAddressDetailsEditDto } from 'src/app/models/HrPersonAddressDetailsEditDto';
import { AddressDetailsModalComponent } from '../address-details-modal/address-details-modal.component';
import { JobDescriptionModalComponent } from '../job-description-modal/job-description-modal.component';
import { HrPersonJobAttachmentEditDto } from 'src/app/models/HrPersonJobAttachmentEditDto';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ DatePipe ]
})
export class ProfileComponent implements OnInit {

  @ViewChild('Visa',{static:false}) Visapaginator: MatPaginator;
  @ViewChild('Passport',{static:false}) Passportpaginator: MatPaginator;
  @ViewChild('Identity',{static:false}) Identitypaginator: MatPaginator;
  @ViewChild('Address',{static:false}) Addresspaginator: MatPaginator;
  @ViewChild('Salary',{static:false}) Salarypaginator: MatPaginator;
  @ViewChild('HealthCard',{static:false}) HealthCardpaginator: MatPaginator;
  @ViewChild('Attachments',{static:false}) Attachmentspaginator: MatPaginator;
  @ViewChild('JobDescription',{static:false}) JobDescriptionpaginator: MatPaginator;

  @ViewChild('Visasort',{static:false}) Visasort: MatSort;
  @ViewChild('Passportsort',{static:false}) Passportsort: MatSort;
  @ViewChild('Identitysort',{static:false}) Identitysort: MatSort;
  @ViewChild('Addresssort',{static:false}) Addresssort: MatSort;
  @ViewChild('Salarysort',{static:false}) Salarysort: MatSort;
  @ViewChild('HealthCardsort',{static:false}) HealthCardsort: MatSort;
  @ViewChild('Attachmentssort',{static:false}) Attachmentssort: MatSort;
  @ViewChild('JobDescriptionsort',{static:false}) JobDescriptionsort: MatSort;

  VisaColumns = ['visaTypeLkp', 'visaNumber', 'placeOfIssueLkp','dateOfIssue','dateOfExpiry','visaCost','issuedByLkp','notes','Action'];
  Visadata: MatTableDataSource<HrPersonVisaDetailsDto>;

  PassportColumns = ['passportTypeLkp', 'passportNumber', 'countryOfIssueLkp','placeOfIssue','dateOfIssue','dateOfExpiry','notes','Action'];
  Passportdata: MatTableDataSource<HrPersonPassportDetailsDto>;

  IdentityColumns = ['idNumber','dateOfExpiry','cardNo','notes','Action'];
  Identitydata: MatTableDataSource<HrPersonIdentityCardDto>;

  AddressColumns = ['fndCountryLkp', 'fndCountryLkp', 'fndCityLkp','addressDetails','telephone','mobile','Action'];
  Addressdata: MatTableDataSource<HrPersonAddressDetailsDto>;

  SalaryColumns = ['pyElementName','amount','startPeriodNameAr','endPeriodNameAr','notes','Action'];
  Salarydata: MatTableDataSource<HrPersonSalaryElementsDto>;

  HealthCardColumns = ['healthCardType', 'healthCardNumber', 'issuedBy','issueDate','expiryDate','healthCardCost','comments','Action'];
  HealthCarddata: MatTableDataSource<HrPersonHealthCardDetailsDto>;

  AttachmentsColumns = ['attachmentName','File','Pic','Action'];
  Attachmentsdata: MatTableDataSource<HrPersonAttachmentsDto>;

  JobDescriptionColumns = ['jobAttachmentName','File','Pic','Action'];
  JobDescriptiondata: MatTableDataSource<HrPersonJobAttachmentsDto>;


  VisaFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.Visadata.filter = filterValue;
  }
  PassportFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.Passportdata.filter = filterValue;
  }
  IdentityFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.Identitydata.filter = filterValue;
  }
  AddressFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.Addressdata.filter = filterValue;
  }
  SalaryFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.Salarydata.filter = filterValue;
  }
  HealthCardFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.HealthCarddata.filter = filterValue;
  }
  AttachmentsFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.Attachmentsdata.filter = filterValue;
  }
  JobDescriptionFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.JobDescriptiondata.filter = filterValue;
  }

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private datePipe: DatePipe,
    private ProfileService:ProfileService,
    private dropdownsService:SelectdropdownService,
    private toastr: ToastrService,
    private MainpageService:MainpageService,
    private matDialog:MatDialog,
    public translate: TranslateService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog

  ) { }
  
  // Icons
  deleteIcon=faTrash;
  addIcon=faPlusCircle;
  editIcon=faEdit;
  downloadIcon=faDownload;
  // ======
  userData = new HrPersonsDto(); 
  name:string;
  nameEn:string;
  employer:string;
  notes:string;
  idNumber:string;
  citiesList:any=[];
  genderList:any=[];
  firstTitleList:any=[];
  personTypeList:any=[];
  countryOfBrithList:any=[];

  personCategoryList:any=[];
  hrOrganizationsDeptList:any=[];
  jobList:any=[];
  hrOrganizationsBranchList:any=[];
  hrPersonSupervisorList:any=[];
  pyPayrollTypeList:any=[];
  sponserList:any=[];
  probationUnitList:any=[];
  destinationCountryList:any=[];
  ticketClassList:any=[];
  noticeUnitList:any=[];
  paymentTypeList:any=[];
 // bankList:any=[];
  statusList:any=[];
  jobGradeList:any=[];

  nationalityList:any=[];
  qualificationsList:any=[];
  relativesTypeList:any=[];
  educationalStageList:any=[];
  maritalStatusList:any=[];
  bankList:any=[];
  branchList:any=[];
  attachmentName:string;
  jobAttachmentName:string;
  filePath:string;
  fileExt:string;
  requestAttachments:PortalRequestAttachmentCreate[];
  requestAttachments2:PortalUserAttachmentsCreate[];


  loadingOverlay = true;
  disabled=false;

  AttachmentEditObj:HrPersonAttachmentsDto;
  AttachmentEditObjIndex=null;

  JobAttachmentEditObj:HrPersonJobAttachmentEditDto;
  JobAttachmentEditObjIndex=null;

  // Errors
  idExpirationDateError=false;
  birthDateError=false;
  genderLkpIdError=false;
  nationalityLkpIdError=false;
  mobileNumber1Error=false;
  educationalStageLkpError=false;
  maritalStatusLkpIdError=false;
  cityLkpIdError=false;
  caseCategoryLkpIdError=false;
  regionError=false;
  idNumberError=false;
   

  toastrMsgs:any;
  profileSubmitted = false;
  attachmentArray:PortalUserAttachmentsDto[];

  dataVisaList:any=[];
  dataAddressList:any=[];
  placeOfIssueList:any=[];
  issuedByList:any=[];
  dataPassList:any=[];
  issuedByCountryList:any=[];
  HealthCardList : any=[];
  usrid:any;
  birthDate : string;

  ngOnInit() {
  this.disabled=true;
  this.usrid=localStorage.getItem('user_id')
    this.getToastrMsgs();
    this.MainpageService.GetDashboardDataTable()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.loadingOverlay = false;
      if(data.result.totalCount > 0){
        this.disabled=true;
      }
    })
    this.ProfileService.GetProfileData(this.usrid)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log(data);
      this.userData =  data.result; 
      console.log("User Data")
      console.log(this.userData)
      // this.userData.birthDate = this.fromStringToDate(data.result.birthDate);
      // this.userData.hireDate = this.fromStringToDate(data.result.hireDate);
      this.userData.birthDate = this.datePipe.transform(this.fromStringToDate(data.result.birthDate));
      this.userData.hireDate = this.datePipe.transform(this.fromStringToDate(data.result.hireDate));
      if (data.result.probationEndDate) {
        this.userData.probationEndDate = this.datePipe.transform(this.fromStringToDate(data.result.probationEndDate));
      }
      this.loadingOverlay = false;
      this.userData.hrPersonVisaDetails.forEach( modify =>{
        modify.dateOfExpiry = this.datePipe.transform(this.fromStringToDate(modify.dateOfExpiry));
        modify.dateOfIssue = this.datePipe.transform(this.fromStringToDate(modify.dateOfIssue));
      })
       this.Visadata = new MatTableDataSource(this.userData.hrPersonVisaDetails);
        setTimeout(() => this.Visadata.paginator = this.Visapaginator);
        setTimeout(() => this.Visadata.sort = this.Visasort);


        this.userData.hrPersonPassportDetails.forEach( modify =>{
          modify.dateOfExpiry = this.datePipe.transform(this.fromStringToDate(modify.dateOfExpiry));
          modify.dateOfIssue = this.datePipe.transform(this.fromStringToDate(modify.dateOfIssue));
        })
        this.Passportdata = new MatTableDataSource(this.userData.hrPersonPassportDetails);
        setTimeout(() => this.Passportdata.paginator = this.Passportpaginator);
        setTimeout(() => this.Passportdata.sort = this.Passportsort);


        this.userData.hrPersonIdentityCard.forEach( modify =>{
          modify.dateOfExpiry = this.datePipe.transform(this.fromStringToDate(modify.dateOfExpiry));
        })
        this.Identitydata = new MatTableDataSource(this.userData.hrPersonIdentityCard);
        setTimeout(() => this.Identitydata.paginator = this.Identitypaginator);
        setTimeout(() => this.Identitydata.sort = this.Identitysort);

        this.Addressdata = new MatTableDataSource(this.userData.hrPersonAddressDetails);
        setTimeout(() => this.Addressdata.paginator = this.Addresspaginator);
        setTimeout(() => this.Addressdata.sort = this.Addresssort);

        this.Salarydata = new MatTableDataSource(this.userData.hrPersonSalaryElements);
        setTimeout(() => this.Salarydata.paginator = this.Salarypaginator);
        setTimeout(() => this.Salarydata.sort = this.Salarysort);


        this.userData.hrPersonHealthCardDetails.forEach( modify =>{
          modify.issueDate = this.datePipe.transform(this.fromStringToDate(modify.issueDate));
          modify.expiryDate = this.datePipe.transform(this.fromStringToDate(modify.expiryDate));
        })
        this.HealthCarddata = new MatTableDataSource(this.userData.hrPersonHealthCardDetails);
        setTimeout(() => this.HealthCarddata.paginator = this.HealthCardpaginator);
        setTimeout(() => this.HealthCarddata.sort = this.HealthCardsort);

        this.Attachmentsdata = new MatTableDataSource(this.userData.hrPersonAttachments);
        setTimeout(() => this.Attachmentsdata.paginator = this.Attachmentspaginator);
        setTimeout(() => this.Attachmentsdata.sort = this.Attachmentssort);

        this.JobDescriptiondata = new MatTableDataSource(this.userData.hrPersonJobAttachments);
        setTimeout(() => this.JobDescriptiondata.paginator = this.JobDescriptionpaginator);
        setTimeout(() => this.JobDescriptiondata.sort = this.JobDescriptionsort);
    });
   
     
    this.dropdownsService.GetCitiesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.citiesList = data;
    })
    //ajith
    this.dropdownsService.GetAddressTypeList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.dataAddressList = data;
    })
    //ajith

    // Gender Select Drop Down
    this.dropdownsService.GetGenderList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.genderList = data;
    })

    // Nationality Select Drop Down
    this.dropdownsService.GetNationalityList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.nationalityList = data;
    })

   
     // bank Select Drop Down
     this.dropdownsService.GetBank()
     .pipe(takeUntil(this.destroy$))
     .subscribe(data=>{
       this.bankList = data;
     })
    
    
// Gender Select Drop Down
this.dropdownsService.GetFirstTitleList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.firstTitleList = data;
})

this.dropdownsService.GetpersonTypeList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.personTypeList = data;
})
   
this.dropdownsService.GetcountryOfBrithList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.countryOfBrithList = data;
})
   
this.dropdownsService.GetpersonCategoryList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.personCategoryList = data;
})
this.dropdownsService.GethrOrganizationsDeptList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.hrOrganizationsDeptList = data;
})

this.dropdownsService.GetjobList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.jobList = data;
})
 
this.dropdownsService.GethrOrganizationsBranchList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.hrOrganizationsBranchList = data;
})
 
this.dropdownsService.GethrPersonSupervisorList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.hrPersonSupervisorList = data;
})
 
this.dropdownsService.GetpyPayrollTypeList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.pyPayrollTypeList = data;
})
 
this.dropdownsService.GetsponserList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.sponserList = data;
})
 
this.dropdownsService.GetprobationUnitList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.probationUnitList = data;
})
this.dropdownsService.GetdestinationCountryList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.destinationCountryList = data;
})
this.dropdownsService.GetticketClassList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.ticketClassList = data;
})
this.dropdownsService.GetnoticeUnitList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.noticeUnitList = data;
})
this.dropdownsService.GetpaymentTypeList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.paymentTypeList = data;
})
this.dropdownsService.GetstatusList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.statusList = data;
})
this.dropdownsService.GetjobGradeList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.jobGradeList = data;
})
 
this.dropdownsService.GetdataVisa()
  .pipe(takeUntil(this.destroy$))
  .subscribe(data=>{   
    this.dataVisaList = data;
  })

  this.dropdownsService.GetDataplaceOfIssue()
  .pipe(takeUntil(this.destroy$))
  .subscribe(data=>{   
    this.placeOfIssueList = data;
  })

  this.dropdownsService.GetDataIssuedBy()
  .pipe(takeUntil(this.destroy$))
  .subscribe(data=>{   
    this.issuedByList = data;
  })
//passport
this.dropdownsService.GetPassType()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{   
  this.dataPassList = data;
})

this.dropdownsService.GetcountryOfBrithList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{   
  this.issuedByCountryList = data;
})
this.dropdownsService.GetMaritalStatusList()
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{   
  this.maritalStatusList = data;
})

this.dropdownsService.GetHeathCardList()
.pipe(takeUntil(this.destroy$))
.subscribe(data =>{
  this.HealthCardList = data;
})
this.initAddressEditObj();
 this.initVisaEditObj();
 this.initPassEditObj();
this. initIdCardEditObj();
this.initAttachmentEditObj();
this.initHealthEditobj();
this.initJobAttachmentEditObj();
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

  openPreview(filePath: string, type: string): void {
    this.dialog.open(ImagePreviewComponent, {
      data: {
        filePath: filePath,
        type: type
      }
    });
  }

  

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  fromStringToDate(str):any{
    if(str!= null){
    let parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0])
    }
  }
  VisaEditObjIndex=null;
  VisaEditObj:HrPersonVisaDetailsEditDto;
  PassEditObjIndex=null;
  PassEditObj:HrPersonPassportDetailsEditDto;
  IdCardEditObjIndex=null;
  IdCardEditObj:HrPersonIdentityCardEditDto;
  HealthCardEditObjIndex = null;
  HealthCardEditObj: HrPersonHealthCardDetailsEditDto;
  AddressEditObjIndex=null;
  AddressEditObj:HrPersonAddressDetailsEditDto;

  initIdCardEditObj(){
    this.IdCardEditObj= new HrPersonIdentityCardEditDto();
    this.IdCardEditObjIndex = null;
    this.IdCardEditObj.id=null;
  }
  initAddressEditObj(){
    this.AddressEditObj= new HrPersonAddressDetailsEditDto();
    this.AddressEditObjIndex = null;
    this.AddressEditObj.id=null;
  }
  initVisaEditObj(){
    this.VisaEditObj= new HrPersonVisaDetailsEditDto();
    this.VisaEditObjIndex = null;
    this.VisaEditObj.id=null;
  }

  initPassEditObj(){
    this.PassEditObj= new HrPersonPassportDetailsEditDto();
    this.PassEditObjIndex = null;
    this.PassEditObj.id=null;
  }

  initHealthEditobj(){
    this.HealthCardEditObj = new HrPersonHealthCardDetailsEditDto();
    this.HealthCardEditObjIndex = null;
    this.HealthCardEditObj.id = null;
  }


  addVisa(){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.data = {VisaEditObjIndex: this.VisaEditObjIndex,
      VisaEditObj: this.VisaEditObj,
       dataVisaList:this.dataVisaList,
      dataPlaceOfIssue:this.placeOfIssueList,
      dataissuedByList:this.issuedByList}
    this.matDialog.open(VisaModalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initVisaEditObj();
        return false
      }else{
        
        console.log(res);
        let newVisa = new HrPersonVisaDetailsEditDto();
        newVisa.rowStatus = 'New';
        newVisa.id =0;// res.id;
        newVisa.visaNumber=res.visaNumber;
        newVisa.dateOfIssue=this.datePipe.transform(res.dateOfIssue, 'dd/MM/yyyy');
        newVisa.dateOfExpiry=this.datePipe.transform(res.dateOfExpiry, 'dd/MM/yyyy');//res.dateOfExpiry.toString();
        newVisa.visaCost=res.visaCost;
        newVisa.notes=res.notes;
        newVisa.placeOfIssueLkpId=res.placeOfIssueLkpId;
        newVisa.visaTypeLkpId=res.visaTypeLkpId;
        newVisa.issuedByLkpId=res.issuedByLkpId;
        newVisa.placeOfIssueLkp= this.getTextFromSelect(this.VisaEditObj.placeOfIssueLkpId,this.placeOfIssueList);
        newVisa.visaTypeLkp = this.getTextFromSelect(this.VisaEditObj.visaTypeLkpId,this.dataVisaList);
        newVisa.issuedByLkp = this.getTextFromSelect(this.VisaEditObj.issuedByLkpId,this.issuedByList);
        newVisa.tenantId = Number(localStorage.getItem("tenantId"));
        this.userData.hrPersonVisaDetails.push(newVisa);
        const filteredData = this.userData.hrPersonVisaDetails.filter(item => item.rowStatus !== 'Deleted');
        this.Visadata = new MatTableDataSource(filteredData);
        setTimeout(() => this.Visadata.paginator = this.Visapaginator);
        setTimeout(() => this.Visadata.sort = this.Visasort);
        this.initVisaEditObj();
      }
    });
  }
  editVisa(row){
    
    this.VisaEditObj.id = row.id;
    this.VisaEditObj.visaNumber = row.visaNumber;
    this.VisaEditObj.dateOfIssue = this.fromStringToDate(row.dateOfIssue);
    this.VisaEditObj.dateOfExpiry = this.fromStringToDate(row.dateOfExpiry);
    this.VisaEditObj.visaCost = row.visaCost;
    this.VisaEditObj.notes = row.notes;
    this.VisaEditObj.placeOfIssueLkpId = row.placeOfIssueLkpId;
    this.VisaEditObj.visaTypeLkpId = row.visaTypeLkpId;
    this.VisaEditObj.issuedByLkpId = row.issuedByLkpId;
    this.VisaEditObjIndex = row;
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.data = {VisaEditObjIndex: this.VisaEditObjIndex, VisaEditObj: this.VisaEditObj,
      dataVisaList:this.dataVisaList,dataPlaceOfIssue:this.placeOfIssueList,dataissuedByList:this.issuedByList}
    this.matDialog.open(VisaModalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initVisaEditObj();
        return false
      }else{
       
        console.log(res);
        let newVisa = new HrPersonVisaDetailsEditDto();
        newVisa.id = this.VisaEditObj.id;
        newVisa.visaNumber = this.VisaEditObj.visaNumber;
        newVisa.dateOfIssue=this.datePipe.transform(this.VisaEditObj.dateOfIssue, 'dd/MM/yyyy'); 
        newVisa.dateOfExpiry=this.datePipe.transform(this.VisaEditObj.dateOfExpiry, 'dd/MM/yyyy'); 
        newVisa.visaCost=this.VisaEditObj.visaCost;
        newVisa.notes=this.VisaEditObj.notes;
        newVisa.placeOfIssueLkpId=this.VisaEditObj.placeOfIssueLkpId;
        newVisa.visaTypeLkpId=this.VisaEditObj.visaTypeLkpId;
        newVisa.issuedByLkpId=this.VisaEditObj.issuedByLkpId;
        newVisa.visaTypeLkp = this.getTextFromSelect(this.VisaEditObj.visaTypeLkpId,this.dataVisaList);
        newVisa.placeOfIssueLkp =this.getTextFromSelect(this.VisaEditObj.placeOfIssueLkpId,this.placeOfIssueList);
        newVisa.issuedByLkp = this.getTextFromSelect(this.VisaEditObj.issuedByLkpId,this.issuedByList);

        if(newVisa.id){
          newVisa.rowStatus = 'Updated';
          let visa = row;
          visa.id = newVisa.id;
          visa.visaNumber = newVisa.visaNumber;
          visa.dateOfIssue=newVisa.dateOfIssue;
          visa.dateOfExpiry=newVisa.dateOfExpiry;
          visa.visaCost=newVisa.visaCost;
          visa.notes=newVisa.notes;
          visa.placeOfIssueLkpId=newVisa.placeOfIssueLkpId;
          visa.visaTypeLkpId=newVisa.visaTypeLkpId;
          visa.issuedByLkpId=newVisa.issuedByLkpId;
          visa.visaTypeLkp = this.getTextFromSelect(this.VisaEditObj.visaTypeLkpId,this.dataVisaList);
          visa.placeOfIssueLkp =this.getTextFromSelect(this.VisaEditObj.placeOfIssueLkpId,this.placeOfIssueList);
          visa.issuedByLkp = this.getTextFromSelect(this.VisaEditObj.issuedByLkpId,this.issuedByList);
          visa.rowStatus = newVisa.rowStatus;

        }else{
          let visa = row;
          visa.visaNumber = newVisa.visaNumber;
          visa.dateOfIssue=newVisa.dateOfIssue;
          visa.dateOfExpiry=newVisa.dateOfExpiry;
          visa.visaCost=newVisa.visaCost;
          visa.notes=newVisa.notes;
          visa.placeOfIssueLkpId=newVisa.placeOfIssueLkpId;
          visa.visaTypeLkpId=newVisa.visaTypeLkpId;
          visa.issuedByLkpId=newVisa.issuedByLkpId;
          visa.visaTypeLkp = this.getTextFromSelect(this. VisaEditObj.visaTypeLkpId,this.dataVisaList);
          visa.placeOfIssueLkp =this.getTextFromSelect(this.VisaEditObj.placeOfIssueLkpId,this.placeOfIssueList);
          visa.issuedByLkp = this.getTextFromSelect(this.VisaEditObj.issuedByLkpId,this.issuedByList);
        }
        this.initVisaEditObj();
      }
    });
  }
  deleteVisa(row){
    let visa = row;
    if (visa.id) {
      visa.rowStatus = 'Deleted';
    }else{
      this.userData.hrPersonVisaDetails.splice(row.id, 1);
    }
    const filteredData = this.userData.hrPersonVisaDetails.filter(item => item.rowStatus !== 'Deleted');
    this.Visadata = new MatTableDataSource(filteredData);
    setTimeout(() => this.Visadata.paginator = this.Visapaginator);
    setTimeout(() => this.Visadata.sort = this.Visasort);
  }
//passport CRUD
addPass(){
  let matDialog = new MatDialogConfig();
  matDialog.disableClose = true;
  matDialog.data = {PassEditObjIndex: this.PassEditObjIndex,
    PassEditObj: this.PassEditObj,
     dataPassList:this.dataPassList,
     issuedByCountryList:this.issuedByCountryList}
  this.matDialog.open(PassportModalComponent,matDialog)
  .afterClosed().subscribe(res=>{
    if(res == null || res == undefined){
      this.initPassEditObj();
      return false
    }else{
   
      console.log(res);
      let newPass = new HrPersonPassportDetailsEditDto();
      newPass.rowStatus = 'New';
      newPass.id = 0;//res.id;
      newPass.passportNumber=res.passportNumber;
      newPass.dateOfIssue=this.datePipe.transform(res.dateOfIssue, 'dd/MM/yyyy');
      newPass.dateOfExpiry=this.datePipe.transform(res.dateOfExpiry, 'dd/MM/yyyy');//res.dateOfExpiry.toString();
      newPass.placeOfIssue=res.placeOfIssue;
      newPass.notes=res.notes;
      newPass.passportTypeLkpId=res.passportTypeLkpId;
      newPass.countryOfIssueLkpId=res.countryOfIssueLkpId;
      newPass.passportTypeLkp = this.getTextFromSelect(this.PassEditObj.passportTypeLkpId,this.dataPassList);
      newPass.countryOfIssueLkp = this.getTextFromSelect(this.PassEditObj.countryOfIssueLkpId,this.issuedByCountryList);
      newPass.tenantId = Number(localStorage.getItem("tenantId"));
      this.userData.hrPersonPassportDetails.push(newPass);
      const filteredData = this.userData.hrPersonPassportDetails.filter(item => item.rowStatus !== 'Deleted');
      this.Passportdata = new MatTableDataSource(filteredData);
        setTimeout(() => this.Passportdata.paginator = this.Passportpaginator);
        setTimeout(() => this.Passportdata.sort = this.Passportsort);
      this.initPassEditObj();
    }
  });
}
editPass(row){
 
  this.PassEditObj.id = row.id;
  this.PassEditObj.passportNumber = row.passportNumber;
  this.PassEditObj.dateOfIssue = this.fromStringToDate(row.dateOfIssue);
  this.PassEditObj.dateOfExpiry = this.fromStringToDate(row.dateOfExpiry);
  this.PassEditObj.placeOfIssue = row.placeOfIssue;
  this.PassEditObj.notes = row.notes;
  this.PassEditObj.countryOfIssueLkpId = row.countryOfIssueLkpId;
  this.PassEditObj.passportTypeLkpId = row.passportTypeLkpId;
  this.PassEditObjIndex = row;
  let matDialog = new MatDialogConfig();
  matDialog.disableClose = true;
  matDialog.data = {PassEditObjIndex: this.PassEditObjIndex, PassEditObj: this.PassEditObj,
    dataPassList:this.dataPassList, issuedByCountryList:this.issuedByCountryList}
  this.matDialog.open(PassportModalComponent,matDialog)
  .afterClosed().subscribe(res=>{
    if(res == null || res == undefined){
      this.initPassEditObj();
      return false
    }else{
      
      console.log(res);
      let newPass = new HrPersonPassportDetailsEditDto();
      newPass.id = this.PassEditObj.id;
      newPass.passportNumber = this.PassEditObj.passportNumber;
      newPass.dateOfIssue=this.datePipe.transform(this.PassEditObj.dateOfIssue, 'dd/MM/yyyy'); 
      newPass.dateOfExpiry=this.datePipe.transform(this.PassEditObj.dateOfExpiry, 'dd/MM/yyyy'); 
      newPass.placeOfIssue=this.PassEditObj.placeOfIssue;
      newPass.notes=this.PassEditObj.notes;
      newPass.passportTypeLkpId=this.PassEditObj.passportTypeLkpId;
      newPass.countryOfIssueLkpId=this.PassEditObj.countryOfIssueLkpId;
      newPass.passportTypeLkp = this.getTextFromSelect(this.PassEditObj.passportTypeLkpId,this.dataPassList);
      newPass.countryOfIssueLkp =this.getTextFromSelect(this.PassEditObj.countryOfIssueLkpId,this.issuedByCountryList);

      if(newPass.id){
        newPass.rowStatus = 'Updated';
        let Pass = row;
        Pass.id = newPass.id;
        Pass.passportNumber = newPass.passportNumber;
        Pass.dateOfIssue=newPass.dateOfIssue;
        Pass.dateOfExpiry=newPass.dateOfExpiry;
        Pass.placeOfIssue=newPass.placeOfIssue;
        Pass.notes=newPass.notes;
        Pass.countryOfIssueLkpId=newPass.countryOfIssueLkpId;
        Pass.passportTypeLkpId=newPass.passportTypeLkpId;
        Pass.passportTypeLkp = this.getTextFromSelect(this.PassEditObj.passportTypeLkpId,this.dataPassList);
        Pass.countryOfIssueLkp =this.getTextFromSelect(this.PassEditObj.countryOfIssueLkpId,this.issuedByCountryList);
        Pass.rowStatus = newPass.rowStatus;

      }else{
        let Pass = row;
       // Pass.id =0; //newPass.id;
        Pass.passportNumber = newPass.passportNumber;
        Pass.dateOfIssue=newPass.dateOfIssue;
        Pass.dateOfExpiry=newPass.dateOfExpiry;
        Pass.placeOfIssue=newPass.placeOfIssue;
        Pass.notes=newPass.notes;
        Pass.countryOfIssueLkpId=newPass.countryOfIssueLkpId;
        Pass.passportTypeLkpId=newPass.passportTypeLkpId;
        Pass.passportTypeLkp = this.getTextFromSelect(this.PassEditObj.passportTypeLkpId,this.dataPassList);
        Pass.countryOfIssueLkp =this.getTextFromSelect(this.PassEditObj.countryOfIssueLkpId,this.issuedByCountryList);
      }
      this.initPassEditObj();
    }
  });
}
deletePass(row){
  let Pass = row;
  if (Pass.id) {
    Pass.rowStatus = 'Deleted';
  }else{
    this.userData.hrPersonPassportDetails.splice(row, 1);
  }
  const filteredData = this.userData.hrPersonPassportDetails.filter(item => item.rowStatus !== 'Deleted');
  this.Passportdata = new MatTableDataSource(filteredData);
        setTimeout(() => this.Passportdata.paginator = this.Passportpaginator);
        setTimeout(() => this.Passportdata.sort = this.Passportsort);
}

//IdentityCard
addIdentity(){
  let matDialog = new MatDialogConfig();
  matDialog.disableClose = true;
  matDialog.data = {IdCardEditObjIndex: this.IdCardEditObjIndex,
    IdCardEditObj: this.IdCardEditObj }
  this.matDialog.open(IdentityCardModalComponent,matDialog)
  .afterClosed().subscribe(res=>{
    if(res == null || res == undefined){
      this.initIdCardEditObj();
      return false
    }else{
     
      console.log(res);
      let newIdentity = new HrPersonIdentityCardEditDto();
      newIdentity.rowStatus = 'New';
      newIdentity.id = 0;//res.id;
      newIdentity.segment1=res.segment1;
      newIdentity.segment2=res.segment2;
      newIdentity.segment3=res.segment3;
      newIdentity.segment4=res.segment4;
      newIdentity.dateOfExpiry=this.datePipe.transform(res.dateOfExpiry, 'dd/MM/yyyy'); 
      newIdentity.cardNo=res.cardNo;
      newIdentity.notes=res.notes;
      newIdentity.idNumber=res.idNumber;
      newIdentity.tenantId = Number(localStorage.getItem("tenantId"));
      this.userData.hrPersonIdentityCard.push(newIdentity);
      const filteredData = this.userData.hrPersonIdentityCard.filter(item => item.rowStatus !== 'Deleted');
      this.Identitydata = new MatTableDataSource(filteredData);
      setTimeout(() => this.Identitydata.paginator = this.Identitypaginator);
      setTimeout(() => this.Identitydata.sort = this.Identitysort);
      this.initIdCardEditObj();
    }
  });
}
editIdentity(row){
  
  this.IdCardEditObj. id = row.id;
  this.IdCardEditObj.segment1 = row.segment1;
  this.IdCardEditObj.segment2 = row.segment2;
  this.IdCardEditObj.segment3 = row.segment3;
  this.IdCardEditObj.segment4 = row.segment4;
  this.IdCardEditObj.dateOfExpiry = this.fromStringToDate(row.dateOfExpiry);
  this.IdCardEditObj.idNumber = row.idNumber;
  this.IdCardEditObj.notes = row.notes;
  this.IdCardEditObj.cardNo = row.cardNo;
  this.IdCardEditObjIndex = row;
  let matDialog = new MatDialogConfig();
  matDialog.disableClose = true;
  matDialog.data = {IdCardEditObjIndex: this.IdCardEditObjIndex, IdCardEditObj: this.IdCardEditObj}
  this.matDialog.open(IdentityCardModalComponent,matDialog)
  .afterClosed().subscribe(res=>{
    if(res == null || res == undefined){
      this.initIdCardEditObj();
      return false
    }else{
     
      console.log(res);
      let newIdentity = new HrPersonIdentityCardEditDto();
      newIdentity.id = this.IdCardEditObj.id;
      newIdentity.segment1 = this.IdCardEditObj.segment1;
      newIdentity.segment2= this.IdCardEditObj.segment2;
      newIdentity.segment3= this.IdCardEditObj.segment3;
      newIdentity.segment4= this.IdCardEditObj.segment4;
      newIdentity.dateOfExpiry=this.datePipe.transform(this.IdCardEditObj.dateOfExpiry, 'dd/MM/yyyy'); 
      newIdentity.idNumber=this.IdCardEditObj.idNumber;
      newIdentity.notes=this.IdCardEditObj.notes;
      newIdentity.cardNo=this.IdCardEditObj.cardNo;
      
      if(newIdentity.id){
        newIdentity.rowStatus = 'Updated';
        let Identity = row;
        Identity.id = this.IdCardEditObj.id;
        Identity.segment1 = this.IdCardEditObj.segment1;
        Identity.segment2= this.IdCardEditObj.segment2;
        Identity.segment3= this.IdCardEditObj.segment3;
        Identity.segment4= this.IdCardEditObj.segment4;
        Identity.dateOfExpiry=this.datePipe.transform(this.IdCardEditObj.dateOfExpiry, 'dd/MM/yyyy'); 
        Identity.idNumber=this.IdCardEditObj.idNumber;
        Identity.notes=this.IdCardEditObj.notes;
        Identity.cardNo=this.IdCardEditObj.cardNo;
        Identity.rowStatus = newIdentity.rowStatus;
      }else{
        let Identity = row;
      //  Identity.id =0; //this.IdCardEditObj.id;
        Identity.segment1 = this.IdCardEditObj.segment1;
        Identity.segment2= this.IdCardEditObj.segment2;
        Identity.segment3= this.IdCardEditObj.segment3;
        Identity.segment4= this.IdCardEditObj.segment4;
        Identity.dateOfExpiry=this.datePipe.transform(this.IdCardEditObj.dateOfExpiry, 'dd/MM/yyyy'); 
        Identity.idNumber=this.IdCardEditObj.idNumber;
        Identity.notes=this.IdCardEditObj.notes;
        Identity.cardNo=this.IdCardEditObj.cardNo;
      }
      this.initIdCardEditObj();
    }
  });
}
deleteIdentity(row){
  let Identity = row;
  if (Identity.id) {
    Identity.rowStatus = 'Deleted';
  }else{
    this.userData.hrPersonIdentityCard.splice(row.id, 1);
  }
  const filteredData = this.userData.hrPersonIdentityCard.filter(item => item.rowStatus !== 'Deleted');
  this.Identitydata = new MatTableDataSource(filteredData);
  setTimeout(() => this.Identitydata.paginator = this.Identitypaginator);
  setTimeout(() => this.Identitydata.sort = this.Identitysort);
}

//Ajith
addAddress(){
  let matDialog = new MatDialogConfig();
  matDialog.disableClose = true;
  matDialog.data = {AddressEditObjIndex: this.AddressEditObjIndex,
    AddressEditObj: this.AddressEditObj,
     dataAddressList:this.dataAddressList,
    dataPlaceOfIssue:this.placeOfIssueList,
    dataissuedByList:this.issuedByList}
  this.matDialog.open(AddressDetailsModalComponent,matDialog)
  .afterClosed().subscribe(res=>{
    if(res == null || res == undefined){
      this.initAddressEditObj();
      return false
    }else{
    
      console.log("Ajith");
      console.log(res);
      let newAddress = new HrPersonAddressDetailsEditDto();
      newAddress.rowStatus = 'New';
      newAddress.id =0;// res.id; 
      newAddress.addressTypeLkpId=res.addressTypeLkpId; 
      newAddress.countryLkpId=res.countryLkpId; 
      newAddress.cityLkpId=res.cityLkpId;
      newAddress.addressDetails=res.addressDetails; 
      newAddress.mobile = res.mobile,
      newAddress.telephone = res.telephone, 
      newAddress.fndAddressTypeLkp = this.getTextFromSelect(this.AddressEditObj.addressTypeLkpId,this.dataAddressList);
      newAddress.fndCountryLkp = this.getTextFromSelect(this.AddressEditObj.countryLkpId,this.issuedByCountryList);
      newAddress.fndCityLkp = this.getTextFromSelect(this.AddressEditObj.cityLkpId,this.citiesList);
      newAddress.tenantId = Number(localStorage.getItem("tenantId"));
      this.userData.hrPersonAddressDetails.push(newAddress);
      const filteredData = this.userData.hrPersonAddressDetails.filter(item => item.rowStatus !== 'Deleted');
      this.Addressdata = new MatTableDataSource(filteredData);
      setTimeout(() => this.Addressdata.paginator = this.Addresspaginator);
      setTimeout(() => this.Addressdata.sort = this.Addresssort);
      this.initAddressEditObj();
    }
  });
}
editAddress(row){
  
  this.AddressEditObj.id = row.id;
  this.AddressEditObj.hrPersonId = row.hrPersonId;
  this.AddressEditObj.hrPersons = row.hrPersons;
  this.AddressEditObj.countryLkpId = row.countryLkpId;
  this.AddressEditObj.cityLkpId = row.cityLkpId;
  this.AddressEditObj.addressTypeLkpId = row.addressTypeLkpId;
  this.AddressEditObj.addressDetails = row.addressDetails;
  this.AddressEditObj.telephone =row.telephone;
  this.AddressEditObj.mobile = row.mobile;
  this.AddressEditObjIndex = row;
  let matDialog = new MatDialogConfig();
  matDialog.disableClose = true;
  matDialog.data = {AddressEditObjIndex: this.AddressEditObjIndex, AddressEditObj: this.AddressEditObj,
    dataAddressList:this.dataAddressList,data:this.dataAddressList,dataissuedByList:this.issuedByList}
  this.matDialog.open(AddressDetailsModalComponent,matDialog)
  .afterClosed().subscribe(res=>{
    if(res == null || res == undefined){
      this.initAddressEditObj();
      return false
    }else{
     
      let newAddress = new HrPersonAddressDetailsEditDto();
      newAddress.id = this.AddressEditObj.id;
      newAddress.hrPersonId = this.AddressEditObj.hrPersonId;
      newAddress.hrPersons=this.AddressEditObj.hrPersons;
      newAddress.addressDetails=this.AddressEditObj.addressDetails;
      newAddress.telephone=this.AddressEditObj.telephone;
      newAddress.mobile=this.AddressEditObj.mobile;
      newAddress.addressTypeLkpId=this.AddressEditObj.addressTypeLkpId;
      newAddress.cityLkpId=this.AddressEditObj.cityLkpId;
      newAddress.countryLkpId=this.AddressEditObj.countryLkpId; 
      newAddress.fndAddressTypeLkp = this.getTextFromSelect(this.AddressEditObj.addressTypeLkpId,this.dataAddressList);
      newAddress.fndCountryLkp =this.getTextFromSelect(this.AddressEditObj.countryLkpId,this.issuedByCountryList);
      newAddress.fndCityLkp = this.getTextFromSelect(this.AddressEditObj.cityLkpId,this.citiesList);
      newAddress.tenantId = Number(localStorage.getItem("tenantId"));
      if(newAddress.id){
        newAddress.rowStatus = 'Updated';
        let Address = row;
        Address.id = newAddress.id;
        Address.hrPersonId = newAddress.hrPersonId;
        Address.hrPersons=newAddress.hrPersons; 
        Address.addressDetails=newAddress.addressDetails;
        Address.telephone=newAddress.telephone;
        Address.mobile=newAddress.mobile;
        Address.addressTypeLkpId=newAddress.addressTypeLkpId;
        Address.countryLkpId=newAddress.countryLkpId;
        Address.cityLkpId=newAddress.cityLkpId;
        Address.fndAddressTypeLkp = this.getTextFromSelect(this.AddressEditObj.addressTypeLkpId,this.dataAddressList);
        Address.fndCountryLkp =this.getTextFromSelect(this.AddressEditObj.countryLkpId,this.issuedByCountryList);
        Address.fndCityLkp = this.getTextFromSelect(this.AddressEditObj.cityLkpId,this.citiesList);
        Address.rowStatus = newAddress.rowStatus;
        Address.tenantId = newAddress.tenantId;

      }else{
        let Address = row;
        Address.hrPersonId = newAddress.hrPersonId;
        Address.hrPersons=newAddress.hrPersons; 
        Address.addressDetails=newAddress.addressDetails;
        Address.telephone=newAddress.telephone;
        Address.mobile=newAddress.mobile;
        Address.addressTypeLkpId=newAddress.addressTypeLkpId;
        Address.countryLkpId=newAddress.countryLkpId;
        Address.cityLkpId=newAddress.cityLkpId;
        Address.fndAddressTypeLkp = this.getTextFromSelect(this.AddressEditObj.addressTypeLkpId,this.dataAddressList);
        Address.fndCountryLkp =this.getTextFromSelect(this.AddressEditObj.countryLkpId,this.issuedByCountryList);
        Address.fndCityLkp = this.getTextFromSelect(this.AddressEditObj.cityLkpId,this.citiesList);
        Address.tenantId = newAddress.tenantId;
      }
      this.initAddressEditObj();
    }
  });
}
deleteAddress(row){
  let Address = row;
  if (Address.id) {
    Address.rowStatus = 'Deleted';
  }else{
    this.userData.hrPersonAddressDetails.splice(row.id, 1);
  }
  const filteredData = this.userData.hrPersonAddressDetails.filter(item => item.rowStatus !== 'Deleted');
    this.Addressdata = new MatTableDataSource(filteredData);
    setTimeout(() => this.Addressdata.paginator = this.Addresspaginator);
    setTimeout(() => this.Addressdata.sort = this.Addresssort);
}
//Ajith



  getPic(fileExt:string){
    if(fileExt){
      if(fileExt.toLowerCase().includes("png") || fileExt.toLowerCase().includes("jpg") || fileExt.toLowerCase().includes("jpeg")){
        return 1
      }else{
        return 2
      }
    }
  }
  
  initAttachmentEditObj(){
    this.AttachmentEditObj= new HrPersonAttachmentsDto();
    this.AttachmentEditObj.attachmentName=null;
    this.AttachmentEditObj.filePath=null;
    this.AttachmentEditObjIndex = null;
  }

  initJobAttachmentEditObj(){
    this.JobAttachmentEditObj= new HrPersonJobAttachmentsDto();
    this.JobAttachmentEditObj.jobAttachmentName=null;
    this.JobAttachmentEditObj.filePath=null;
    this.JobAttachmentEditObj = null;
  }
  focused(event){
    if(event.target.previousSibling.classList.contains('label-over')){
      return false;
    }else{
      event.target.previousSibling.classList.add('label-over');
    }
  }

  blured(event,value){
    if(event.target.previousSibling.classList.contains('label-over') && !value){
      event.target.previousSibling.classList.remove('label-over');
    }else{
      return false;
    }
  }

  getTextFromSelect(id:number,list:SelectdropdownResultResults[]){
    let obj =  list.find(x=>x.id == id);
    if (obj) {
      return obj.text
    }
  }

  getToastrMsgs(){
    this.translate.get('ToastrSuccess')
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{      
      this.toastrMsgs = data;
    })
  }

  // validate(){
  //   if(!this.userData.idNumber || this.userData.idNumber.length != 18){this.idNumberError=true;}else{this.idNumberError=false;}
  //   if(this.userData.wifeHusbandName1 && this.userData.idNumberWifeHusband1.length != 18){this.idNumberWifeHusband1Error=true;}else{this.idNumberWifeHusband1Error=false;}
  //   if(this.userData.wifeName2 && this.userData.idNumberWife2.length != 18){this.idNumberWife2Error=true;}else{this.idNumberWife2Error=false;}
  //   if(this.userData.wifeName3 && this.userData.idNumberWife3.length != 18){this.idNumberWife3Error=true;}else{this.idNumberWife3Error=false;}
  //   if(this.userData.wifeName4 && this.userData.idNumberWife4.length != 18){this.idNumberWife4Error=true;}else{this.idNumberWife4Error=false;}
  //   if(!this.userData.idExpirationDate){this.idExpirationDateError=true;}else{this.idExpirationDateError=false;}
  //   if(!this.userData.birthDate){this.birthDateError=true;}else{this.birthDateError=false;}
  //   if(!this.userData.genderLkpId){this.genderLkpIdError=true;}else{this.genderLkpIdError=false;}
  //   if(!this.userData.nationalityLkpId){this.nationalityLkpIdError=true;}else{this.nationalityLkpIdError=false;}
  //   if(!this.userData.cityLkpId){this.cityLkpIdError=true;}else{this.cityLkpIdError=false;}
  //   if(!this.userData.caseCategoryLkpId){this.caseCategoryLkpIdError=true;}else{this.caseCategoryLkpIdError=false;}
  //   if(!this.userData.region){this.regionError=true;}else{this.regionError=false;}
  //   if(!this.userData.educationalStageLkpId){this.educationalStageLkpError=true;}else{this.educationalStageLkpError=false;}
  //   if(!this.userData.maritalStatusLkpId){this.maritalStatusLkpIdError=true;}else{this.maritalStatusLkpIdError=false;}
  //   if(!this.userData.mobileNumber1){this.mobileNumber1Error=true;}else{this.mobileNumber1Error=false;}
    
  //   if (
  //     this.idNumberError==true || this.idExpirationDateError==true || this.birthDateError==true ||
  //     this.genderLkpIdError==true || this.nationalityLkpIdError==true || this.cityLkpIdError==true ||this.caseCategoryLkpIdError==true ||
  //     this.regionError==true || this.maritalStatusLkpIdError==true || this.mobileNumber1Error==true ||
  //     this.idNumberWifeHusband1Error==true || this.idNumberWife2Error==true || this.idNumberWife3Error==true || 
  //     this.idNumberWife4Error==true
  //     ) {
  //     return false;
  //   }else{
  //     return true
  //   }
    
  // }

  // validateIdNumberLength(val){
  //   val.length == 18? true : false;
  // }

  
  
  addAttachment(){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.data = {
      AttachmentEditObjIndex: this.AttachmentEditObjIndex,
      AttachmentEditObj: this.AttachmentEditObj, 
      attachmentName:this.attachmentName,
      filePath:this.filePath} 
    this.matDialog.open(AttachmentsmodalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initAttachmentEditObj();
        return false
      }else{
      
        console.log(res);
        
        let newAttachment = new HrPersonAttachmentsDto();
        newAttachment.rowStatus = 'New';
        newAttachment.attachmentName = res.attachmentName;
        newAttachment.filePath=res.filePath;
        newAttachment.tenantId = Number(localStorage.getItem("tenantId"));
        this.userData.hrPersonAttachments.push(newAttachment);
        const filteredData = this.userData.hrPersonAttachments.filter(item => item.rowStatus !== 'Deleted');
        this.Attachmentsdata = new MatTableDataSource(filteredData);
        setTimeout(() => this.Attachmentsdata.paginator = this.Attachmentspaginator);
        setTimeout(() => this.Attachmentsdata.sort = this.Attachmentssort);
        this.initAttachmentEditObj();
      }
    });
  }

  

  editAttachment(i){
  
    this.AttachmentEditObj.id = this.userData.hrPersonAttachments[i].id;
    this.AttachmentEditObj.attachmentName = this.userData.hrPersonAttachments[i].attachmentName;
    this.AttachmentEditObj.filePath = this.userData.hrPersonAttachments[i].filePath;
    
    this.AttachmentEditObjIndex = i;
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.data = {
      AttachmentEditObjIndex: this.AttachmentEditObjIndex, 
      AttachmentEditObj: this.AttachmentEditObj   
     }
    this.matDialog.open(AttachmentsmodalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initAttachmentEditObj();
        return false
      }else{
        console.log(res);
        let newAttachment = new HrPersonAttachmentsDto();
        newAttachment.attachmentName = this.AttachmentEditObj.attachmentName;
        newAttachment.filePath = this.AttachmentEditObj.filePath;
        
        if(!newAttachment.id){
          newAttachment.rowStatus = 'Updated';
          let attachment = this.userData.hrPersonAttachments[this.AttachmentEditObjIndex];
          attachment.attachmentName = newAttachment.attachmentName;
          attachment.filePath = newAttachment.filePath;
          attachment.tenantId = Number(localStorage.getItem("tenantId"));
          attachment.rowStatus = newAttachment.rowStatus;
        }else{
          let attachment = this.userData.hrPersonAttachments[this.AttachmentEditObjIndex];
          attachment.attachmentName = newAttachment.attachmentName;
          attachment.filePath = newAttachment.filePath;
          attachment.tenantId = Number(localStorage.getItem("tenantId"));
        }

        this.initAttachmentEditObj();
      }
    });
  }

  

  deleteAttachment(row){
    let attachment = row;
    if (attachment.id) {
      attachment.rowStatus = 'Deleted';
    }else{
      this.userData.hrPersonAttachments.splice(row.id, 1);
    }
    const filteredData = this.userData.hrPersonAttachments.filter(item => item.rowStatus !== 'Deleted');
    this.Attachmentsdata = new MatTableDataSource(filteredData);
    setTimeout(() => this.Attachmentsdata.paginator = this.Attachmentspaginator);
    setTimeout(() => this.Attachmentsdata.sort = this.Attachmentssort);
  }



  addHealth(){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.data = {HealthCardEditObjIndex: this.HealthCardEditObjIndex,
      HealthCardEditObj: this.HealthCardEditObj,
      HealthCardList:this.HealthCardList}
    this.matDialog.open(HealthModalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initHealthEditobj();
        return false
      }else{
         
        console.log("send obj")
        console.log(res);
        let newHealth = new HrPersonHealthCardDetailsEditDto();
        newHealth.rowStatus = 'New';
        newHealth.id =0;// res.id;
        newHealth.healthCardNumber=res.healthCardNumber;
        newHealth.issuedBy =res.issuedBy;
        newHealth.issueDate=this.datePipe.transform(res.issueDate, 'dd/MM/yyyy');
        newHealth.expiryDate=this.datePipe.transform(res.expiryDate, 'dd/MM/yyyy');//res.dateOfExpiry.toString();
        newHealth.healthCardCost=res.healthCardCost;
        newHealth.comments=res.comments;
        newHealth.healthCardTypeLkpId=res.healthCardTypeLkpId;
        newHealth.healthCardType= this.getTextFromSelect(this.HealthCardEditObj.healthCardTypeLkpId,this.HealthCardList);
        newHealth.tenantId = Number(localStorage.getItem("tenantId"));
        this.userData.hrPersonHealthCardDetails.push(newHealth);
        const filteredData = this.userData.hrPersonHealthCardDetails.filter(item => item.rowStatus !== 'Deleted');
        this.HealthCarddata = new MatTableDataSource(filteredData);
        setTimeout(() => this.HealthCarddata.paginator = this.HealthCardpaginator);
        setTimeout(() => this.HealthCarddata.sort = this.HealthCardsort);
        this.initHealthEditobj();
      }
    });
  }


  editHealth(row){
   
    this.HealthCardEditObj.id = row.id;
    this.HealthCardEditObj.healthCardNumber = row.healthCardNumber;
    this.HealthCardEditObj.issueDate = this.fromStringToDate(row.issueDate);
    this.HealthCardEditObj.expiryDate = this.fromStringToDate(row.expiryDate);
    this.HealthCardEditObj.issuedBy = row.issuedBy;
    this.HealthCardEditObj.healthCardCost = row.healthCardCost;
    this.HealthCardEditObj.comments = row.comments;
    this.HealthCardEditObj.healthCardType = row.healthCardType;
    this.HealthCardEditObj.healthCardTypeLkpId = row.healthCardTypeLkpId;
    this.HealthCardEditObjIndex = row;
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.data = {HealthCardEditObjIndex: this.HealthCardEditObjIndex, HealthCardEditObj: this.HealthCardEditObj,
    HealthCardList:this.HealthCardList}
    this.matDialog.open(HealthModalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initHealthEditobj();
        return false
      }else{
       
        console.log(res);
        let newHealth = new HrPersonHealthCardDetailsEditDto();
        newHealth.id = this.HealthCardEditObj.id;
        newHealth.healthCardNumber=res.healthCardNumber;
        newHealth.issuedBy =res.issuedBy;
        newHealth.issueDate=this.datePipe.transform(res.issueDate, 'dd/MM/yyyy');
        newHealth.expiryDate=this.datePipe.transform(res.expiryDate, 'dd/MM/yyyy');//res.dateOfExpiry.toString();
        newHealth.healthCardCost=res.healthCardCost;
        newHealth.comments=res.comments;
        newHealth.healthCardTypeLkpId=res.healthCardTypeLkpId;
        newHealth.healthCardType= this.getTextFromSelect(this.HealthCardEditObj.healthCardTypeLkpId,this.HealthCardList);
        newHealth.tenantId = Number(localStorage.getItem("tenantId"));
        if(newHealth.id){
          newHealth.rowStatus = 'Updated';
          let Health = row;
          Health.id = newHealth.id;
          Health.healthCardNumber = newHealth.healthCardNumber;
          Health.issuedBy=newHealth.issuedBy;
          Health.comments=newHealth.comments;
          Health.healthCardCost=newHealth.healthCardCost;
          Health.healthCardType= this.getTextFromSelect(this.HealthCardEditObj.healthCardTypeLkpId,this.HealthCardList);
          Health.tenantId = newHealth.tenantId;
        }else{
          let Health = row;
         // Pass.id =0; //newPass.id;
         Health.id = newHealth.id;
         Health.healthCardNumber = newHealth.healthCardNumber;
         Health.issuedBy=newHealth.issuedBy;
         Health.comments=newHealth.comments;
         Health.healthCardCost=newHealth.healthCardCost;
         Health.healthCardTypeLkpId=newHealth.healthCardTypeLkpId;
         Health.tenantId = newHealth.tenantId;
         Health.healthCardType= this.getTextFromSelect(this.HealthCardEditObj.healthCardTypeLkpId,this.HealthCardList);
        }
        this.initHealthEditobj();
      }
    });
  }

  deleteHealth(row){
    let Identity = row;
    if (Identity.id) {
      Identity.rowStatus = 'Deleted';
    }else{
      this.userData.hrPersonHealthCardDetails.splice(row.id, 1);
    }
    const filteredData = this.userData.hrPersonHealthCardDetails.filter(item => item.rowStatus !== 'Deleted');
    this.HealthCarddata = new MatTableDataSource(filteredData);
    setTimeout(() => this.HealthCarddata.paginator = this.HealthCardpaginator);
    setTimeout(() => this.HealthCarddata.sort = this.HealthCardsort);
  }

  
  addJobAttachment(){ 
    let matDialog = new MatDialogConfig();
    this.initJobAttachmentEditObj();
    matDialog.disableClose = true;
    matDialog.data = {
      JobAttachmentEditObjIndex: this.JobAttachmentEditObjIndex,
      JobAttachmentEditObj: this.JobAttachmentEditObj, 
      jobAttachmentName:this.jobAttachmentName,
      filePath:this.filePath} 
    this.matDialog.open(JobDescriptionModalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initJobAttachmentEditObj();
        return false
      }else{ 
        let newAttachment = new HrPersonJobAttachmentsDto();
        newAttachment.rowStatus = 'New';
        newAttachment.jobAttachmentName = res.jobAttachmentName;
        newAttachment.filePath=res.filePath;
        newAttachment.tenantId = Number(localStorage.getItem("tenantId"));
        this.userData.hrPersonJobAttachments.push(newAttachment); 
        const filteredData = this.userData.hrPersonJobAttachments.filter(item => item.rowStatus !== 'Deleted');
        this.JobDescriptiondata = new MatTableDataSource(filteredData);
        setTimeout(() => this.JobDescriptiondata.paginator = this.JobDescriptionpaginator);
        setTimeout(() => this.JobDescriptiondata.sort = this.JobDescriptionsort);
        this.initJobAttachmentEditObj();
      }
    });
  }

  

  editJobAttachment(i){
  
    this.JobAttachmentEditObj.id = this.userData.hrPersonJobAttachments[i].id;
    this.JobAttachmentEditObj.jobAttachmentName = this.userData.hrPersonJobAttachments[i].jobAttachmentName;
    this.JobAttachmentEditObj.filePath = this.userData.hrPersonJobAttachments[i].filePath;
    
    this.JobAttachmentEditObjIndex = i;
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.data = {
      JobAttachmentEditObjIndex: this.JobAttachmentEditObjIndex, 
      JobAttachmentEditObj: this.JobAttachmentEditObj   
     }
    this.matDialog.open(JobDescriptionModalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        this.initJobAttachmentEditObj();
        return false
      }else{
        console.log(res);
        let newAttachment = new HrPersonJobAttachmentsDto();
        newAttachment.jobAttachmentName = this.JobAttachmentEditObj.jobAttachmentName;
        newAttachment.filePath = this.JobAttachmentEditObj.filePath;
        newAttachment.tenantId = Number(localStorage.getItem("tenantId"));
        if(!newAttachment.id){
          newAttachment.rowStatus = 'Updated';
          let attachment = this.userData.hrPersonJobAttachments[this.JobAttachmentEditObjIndex];
          attachment.jobAttachmentName = newAttachment.jobAttachmentName;
          attachment.filePath = newAttachment.filePath;
          attachment.tenantId = Number(localStorage.getItem("tenantId"));
          attachment.rowStatus = newAttachment.rowStatus;
        }else{
          let attachment = this.userData.hrPersonJobAttachments[this.JobAttachmentEditObjIndex];
          attachment.jobAttachmentName = newAttachment.jobAttachmentName;
          attachment.filePath = newAttachment.filePath;
          attachment.tenantId = Number(localStorage.getItem("tenantId"));
        }
        this.initJobAttachmentEditObj();
      }
    });
  }

  

  deleteJobAttachment(row){
    let attachment = row;
    if (attachment.id) {
      attachment.rowStatus = 'Deleted';
    }else{
      this.userData.hrPersonJobAttachments.splice(row.id, 1);
    }
    const filteredData = this.userData.hrPersonJobAttachments.filter(item => item.rowStatus !== 'Deleted');
    this.JobDescriptiondata = new MatTableDataSource(filteredData);
        setTimeout(() => this.JobDescriptiondata.paginator = this.JobDescriptionpaginator);
        setTimeout(() => this.JobDescriptiondata.sort = this.JobDescriptionsort);
  }
 sumbitForm(){
    console.log(this.userData);
  //   if(this.validate()){
    // this.loadingOverlay = true;
    let updateData = new HrPersonsEditDto();
      
    updateData.fullName=this.userData.fullName;
    updateData.phoneNumber=this.userData.phoneNumber;
    updateData.region=this.userData.region;
    updateData.residencePlace=this.userData.residencePlace;
    updateData.employeeNumber=this.userData.employeeNumber;
    updateData.firstName=this.userData.firstName;
    updateData.fatherName=this.userData.fatherName;
    updateData.lastName=this.userData.lastName;
    updateData.placeOfBirth=this.userData.placeOfBirth;
    updateData.emailAddress=this.userData.emailAddress;
    updateData.personPhoto=this.userData.personPhoto;
    updateData.accountNumber=this.userData.accountNumber;
    updateData.hireDate= this.datePipe.transform(this.userData.hireDate,"dd/MM/yyyy");//this.userData.hireDate;
    updateData.birthDate= this.datePipe.transform(this.userData.birthDate,"dd/MM/yyyy");//this.userData.birthDate;
    updateData.probationEndDate= this.datePipe.transform(this.userData.probationEndDate,"dd/MM/yyyy");//this.userData.probationEndDate;
    updateData.probationLength=this.userData.probationLength;
    updateData.noOfTickets=this.userData.noOfTickets;
    updateData.ticketAfterYears=this.userData.ticketAfterYears;
    updateData.ticketAmount=this.userData.ticketAmount;
    updateData.noticeLength=this.userData.noticeLength;
    updateData.hrOrganizationsDeptId=this.userData.hrOrganizationsDeptId;
    updateData.hrOrganizationsBranchId=this.userData.hrOrganizationsBranchId;
    updateData.hrPersonSupervisorId=this.userData.hrPersonSupervisorId;
    updateData.pyPayrollTypeId=this.userData.pyPayrollTypeId;
    updateData.genderLkpId=this.userData.genderLkpId; 
    updateData.personTypeLkpId=this.userData.personTypeLkpId;   
    updateData.nationalityLkpId=this.userData.nationalityLkpId;   
    updateData.maritalStatusLkpId=this.userData.maritalStatusLkpId;   
    updateData.statusLkpId=this.userData.statusLkpId;   
    updateData.jobGradeLkpId=this.userData.jobGradeLkpId;   
    updateData.jobLkpId=this.userData.jobLkpId;   
    updateData.personCategoryLkpId=this.userData.personCategoryLkpId;   
    updateData.firstTitleLkpId=this.userData.firstTitleLkpId;   
    updateData.sponserLkpId=this.userData.sponserLkpId;   
    updateData.countryOfBrithLkpId=this.userData.countryOfBrithLkpId;   
    updateData.probationUnitLkpId=this.userData.probationUnitLkpId;   
    updateData.destinationCountryLkpId=this.userData.destinationCountryLkpId;   
    updateData.ticketClassLkpId=this.userData.ticketClassLkpId;   
    updateData.noticeUnitLkpId=this.userData.noticeUnitLkpId;   
    updateData.paymentTypeLkpId=this.userData.paymentTypeLkpId;   
    updateData.bankLkpId=this.userData.bankLkpId; 
    updateData.destinationCountryLkpId=this.userData.destinationCountryLkpId;
    updateData.employeeAddress=this.userData.hrPersonAddressDetails;
    updateData.allowSelfService = this.userData.allowSelfService;
    updateData.annualLeaveBalance = this.userData.annualLeaveBalance;
    
   
    
      updateData.id = this.userData.id;
      updateData.passportDetails=[];
       this.userData.hrPersonPassportDetails.forEach(element => {
         updateData.passportDetails.push(element);
       });
       
       updateData.visaDetails=[];
        this.userData.hrPersonVisaDetails.forEach(element => {
          updateData.visaDetails.push(element);
        });
        updateData.identityCards=[];
        this.userData.hrPersonIdentityCard.forEach(element => {
          updateData.identityCards.push(element);
        });
        updateData.employeeAddress=[];
        this.userData.hrPersonAddressDetails.forEach(element => {
          updateData.employeeAddress.push(element);
        });
        
       updateData.attachments=[];
       this.userData.hrPersonAttachments.forEach(element => {
         updateData.attachments.push(element);
       });

       updateData.employeeHealthCards=[];
       this.userData.hrPersonHealthCardDetails.forEach(element =>{
        updateData.employeeHealthCards.push(element);
       });

       updateData.jobAttachments =[];
       this.userData.hrPersonJobAttachments.forEach(element =>{
        updateData.jobAttachments.push(element);
       })

    console.log(updateData);
      this.ProfileService.UpdatePersonProfileData(updateData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data=>{
        this.toastr.success(this.toastrMsgs.editProfile);
        this.loadingOverlay = false;
        
      },error=>{
        this.toastr.error(error.error.error.message);
        this.loadingOverlay = false;
      })

  //   }
  }


  
}
