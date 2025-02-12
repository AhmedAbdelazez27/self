import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ProfileService } from "src/app/services/profile.service";
import { MainpageService } from "src/app/services/mainpage.service";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs/operators';
import { PyPayrollOperationPersonDto } from 'src/app/models/PyPayrollOperationPersonDto';
import { HrPyPayrolDetalDialogComponent } from '../hr-py-payrol-detal-dialog/hr-py-payrol-detal-dialog.component';
import { PyPayrollOperationPersonDetailsDto } from 'src/app/models/PyPayrollOperationPersonDetailsDto';
@Component({
  selector: 'app-hr-py-payroll-operations-person',
  templateUrl: './hr-py-payroll-operations-person.component.html',
  styleUrls: ['./hr-py-payroll-operations-person.component.css']
})
export class HrPyPayrollOperationsPersonComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private ProfileService: ProfileService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private MainpageService: MainpageService,
    private matDialog: MatDialog,
    public translate: TranslateService,

  ) { }


  personData = new PyPayrollOperationPersonDto();
  personData2 = new PyPayrollOperationPersonDetailsDto();
  toastrMsgs: any;
  disabled = false;
  loadingOverlay = true;
  showDetil = faEye;

  strid: any;
  id: any;
  id2: any;
  hrPersonId: any;
  ngOnInit() {
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

    this.id = this.route.snapshot.queryParamMap.get('id');
    this.hrPersonId = this.route.snapshot.queryParamMap.get('hrPersonId');

    console.log(this.id);
    console.log(this.hrPersonId);

    this.ProfileService.GetProfileData4(this.id, this.hrPersonId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log(data);
        this.personData = data.result;
        console.log(data.result);

        this.loadingOverlay = false;
        console.log(this.personData);
      });

    this.initPayrolEditObj();
  }
  getToastrMsgs() {
    this.translate.get('ToastrSuccess')
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.toastrMsgs = data;
      })
  }

  PayrolEditObj: PyPayrollOperationPersonDetailsDto;

  PayrolEditObjIndex = null;
  initPayrolEditObj() {
    this.PayrolEditObj = new PyPayrollOperationPersonDetailsDto();
    this.PayrolEditObjIndex = null;
    this.PayrolEditObj.id = null;
  }
  personDetailsList: PyPayrollOperationPersonDetailsDto[] = [];
  list2:any;
  editPerson2(i: number, id: number) {
   
    this.ProfileService.GetProfileData5(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
       
        this.personData2 = data.result;
        this.list2= data.result;
        console.log(this.list2);
        

        this.loadingOverlay = false;
        
      });
      
    this.PayrolEditObj.id = this.personData2[i].id;
    
   
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.data = { PayrolEditObjIndex: this.PayrolEditObjIndex, list2: this.list2 }
    this.matDialog.open(HrPyPayrolDetalDialogComponent, matDialog)

  }

}
