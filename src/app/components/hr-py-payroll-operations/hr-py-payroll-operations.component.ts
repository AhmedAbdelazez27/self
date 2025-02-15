import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ProfileService } from "src/app/services/profile.service";
import { MainpageService } from "src/app/services/mainpage.service";
import { PyPayrollOperationsPortalDto } from 'src/app/models/PyPayrollOperationsPortalDto';
import { takeUntil } from 'rxjs/operators';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms"; 
import { NgModule } from "@angular/core";
import { PyPayrollOperationPersonDetailsDto } from 'src/app/models/PyPayrollOperationPersonDetailsDto';
import { HrPyPayrolDetalDialogComponent } from '../hr-py-payrol-detal-dialog/hr-py-payrol-detal-dialog.component';
import { PyPayrollOperationPersonDto } from 'src/app/models/PyPayrollOperationPersonDto';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-hr-py-payroll-operations',
  templateUrl: './hr-py-payroll-operations.component.html',
  styleUrls: ['./hr-py-payroll-operations.component.css'],
})


export class HrPyPayrollOperationsComponent implements OnInit {
  imports: [FormsModule]
  destroy$: Subject<boolean> = new Subject<boolean>();
  VisaEditObjIndex: any;
  VisaEditObj: any;
  dataVisaList: any;
  placeOfIssueList: any;
  issuedByList: any;
  showModal = false;
  selectedRow: any = null;
  lang:string;
  payslipData: any[]; 
  get f() { return this.registerForm.controls; }
  payrolldetails: any;
  registerForm: FormGroup;
  constructor(
    private ProfileService: ProfileService,
    private router: Router,
    private toastr: ToastrService,
    private MainpageService: MainpageService,
    private matDialog: MatDialog,
    public translate: TranslateService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }
  

  // handleClick(id:any,hrPersonId:any): void {
  //   debugger
  //   // Define the parameter value
  //  // const id =this.payrolData.id; 
  // //  const hrPersonId =this.payrolData.hrPersonId; 
  //   // Navigate to the target component and pass the parameter as a query parameter
  //   this.router.navigate(['/board/HrPyPayrollOperationsPerson/${id}/${hrPersonId}'], { queryParams: { id, hrPersonId } });

  // }
  personData = new PyPayrollOperationPersonDto();
  PayrolDetailObj: PyPayrollOperationPersonDetailsDto;
  personData2 = new PyPayrollOperationPersonDetailsDto();
  PayrolDetails = new PyPayrollOperationPersonDetailsDto();
  PayrolDetailObjIndex = null;
  personDetailsList: PyPayrollOperationPersonDetailsDto[] = [];
  list2:any;

  payrolData = new PyPayrollOperationsPortalDto();
  toastrMsgs:any;
  strid:any;
  disabled=false;
  loadingOverlay = true;
  editIcon=faEye;
  ngOnInit() {
    this.strid=localStorage.getItem('user_id')
    this.disabled = true;
    this.getToastrMsgs();
    this.initPayrolEditObj();

   
    this.ProfileService.GetProfileData3(this.strid)
    
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
     //  console.log(data);
     
        this.personData = data.result;
      //  console.log(this.personData);
        this.loadingOverlay = false;
        // this.ProfileService.GetProfileData4(data.result[0].id, data.result[0].hrPersonId)
        // .pipe(takeUntil(this.destroy$))
        // .subscribe(data => {
        //   this.personData = data.result;
        //   this.loadingOverlay = false;
        //   console.log(this.personData);
        // });


  
        this.registerForm = this.formBuilder.group({
          hrPersonNumber: [''],
          hrPersonName: [''],
          pyPayrollTypeName: [''],
          periodNameAr: [''],
          startDate: [''],
          endDate:[''],
          payrollNetValue: [''],
          totalPay: [''],
          bankNameAr: [''],
          accountNumber: [''],
         
        });
       
      });
     
  }
  getToastrMsgs(){
    this.translate.get('ToastrSuccess')
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{      
      this.toastrMsgs = data;
    })
  }
  
  PayrolEditObj:PyPayrollOperationsPortalDto;
  PayrolEditObjIndex=null;
  initPersonEditObj(){
    this.PayrolEditObj= new PyPayrollOperationsPortalDto();
    this.PayrolEditObjIndex = null;
    this.PayrolEditObj.id=null;
  }
  
  initPayrolEditObj() {
    this.PayrolDetailObj = new PyPayrollOperationPersonDetailsDto();
    this.PayrolDetailObjIndex = null;
    this.PayrolDetailObj.id = null;
  }
 
  editPerson2(id) {
   
    this.ProfileService.GetProfileData5(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.personData2 = data.result;
        this.list2= data.result;
        console.log(this.list2);
        let matDialog = new MatDialogConfig();
        matDialog.disableClose = true;
        matDialog.data = { PayrolEditObjIndex: this.PayrolEditObjIndex, list2: this.list2 }
        this.matDialog.open(HrPyPayrolDetalDialogComponent, matDialog)
        this.loadingOverlay = false;
      });
      
  

  }

  openPayrollModal(id: string): void {

    this.ProfileService.Getpayrolldetails(id).subscribe(
      (data) => {
        const lastRow = Array.isArray(data.result) && data.result.length > 0 ? data.result[data.result.length - 1] : null;
         
        if (lastRow) {
          this.payrolldetails = lastRow;
          this.registerForm.patchValue({
            hrPersonNumber: lastRow.hrPersonNumber || '',
            hrPersonName: lastRow.hrPersonName || '',
            pyPayrollTypeName: lastRow.pyPayrollTypeName || '',
            periodNameAr: lastRow.periodNameAr || '',
            startDate: lastRow.startDate || '',
            endDate: lastRow.endDate || '',
            payrollNetValue: lastRow.payrollNetValue || '',
             totalPay: lastRow.totalPay || '',
            bankNameAr: lastRow.bankNameAr || '',
            accountNumber: lastRow.accountNumber || ''
          });
        }
        this.payrolldetails = data.result;
        this.selectedRow = id;
        this.showModal = true;

      }
    );
    this.registerForm.disable(); // This will make all fields non-editable
  }

  // printpayslip(id) {
  //   this.lang = localStorage.getItem('lang');

  //   const lang = this.lang; 
  //   let reportUrl = `${Globals.PayrollReportUrl}?id=${id}&lang=${lang}`;
  //         console.log(reportUrl);   
  //     window.open(reportUrl, "_blank");
  //   }
  closeModal(): void {
    this.showModal = false;
    this.selectedRow = null;
  }
  printpayslip(id: string) {
    const lang = localStorage.getItem('lang') || 'en';
    this.ProfileService.getPayslip(id, lang).subscribe(
        (result) => {
            console.log(result);
            if (result && result.success && Array.isArray(result.result) && result.result.length > 0) {
                this.personDetailsList = result.result;
                const lastRowDetails = this.personDetailsList[this.personDetailsList.length - 1];
                console.log('Last Row Details:', lastRowDetails);

                this.openPrintPreview();
            } else {
                this.toastr.error(this.toastrMsgs.NoData);
            }
        },
        (error) => {
            console.error('Error fetching payslip:', error);
            this.toastr.error(this.toastrMsgs.FetchError);
        }
    );
}

openPrintPreview() {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
      const employee = this.personDetailsList[this.personDetailsList.length - 1];
      printWindow.document.write(`
<html>
<head>
    <style>
        @page { margin: 0; } 
        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        .header {  
            display: flex; 
            align-items: center; 
            margin-bottom: 20px; 
            color: #333333; 
            text-align: center; 
        }
        .header img {  
            height: 100px;   
        }
        .header h1 {  
            margin: 0;  
            flex-grow: 1; 
            text-align: left; 
            margin-left: 250px; 
        }
        .header-title { 
            margin-bottom: 30px;  
            text-decoration: none; 
            font-family: Arial, sans-serif;  
            font-size: 38px;  
            color: #666666;  
            text-transform: uppercase; 
        }
        .section-border { 
            border-bottom: 1px solid #ccc; 
            padding-bottom: 20px; 
            margin-bottom: 10px; 
        }
        .pay-slip-title { 
            text-align: center; 
            margin-bottom: 30px; 
            text-decoration: underline; 
        }
        .container { 
            margin: 20px;
        }
        .row { 
            display: flex; 
            margin-bottom: 15px;
        }
        .col-md-4 { 
            flex: 1; 
        }
        strong { 
            display: inline-block; 
            width: 150px; 
            font-weight: 600; 
        }
        input[type="text"] { 
            height: 30px; 
            border: 1px solid #ccc; 
            border-radius: 4px; 
            padding: 5px; 
            width: calc(100% - 10px); 
            box-sizing: border-box; 
            margin-top: 5px; 
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px; 
        }
        th, td { 
            border: 1px solid rgba(0, 0, 0, 0.2); 
            padding: 8px; 
            text-align: left; 
        }
        table th { 
            background-color: rgb(233, 235, 236); 
            color: rgb(91, 164, 223); 
            padding: 10px; 
        }
    </style>
</head>
<body>

<div class="header">
    <h1 class="header-title">${employee.tenancyname || ''}</h1>
    <img src="${employee.tenantLogoPath || ''}" alt="Logo"> 
</div>

    <h2 class="pay-slip-title">PAY SLIP</h2>
    <div class="container">
        <div class="row">
            <div class="col-md-4 section-border">
                <div><strong>Employee Number</strong><br><input type="text" value="${employee.hrPersonNumber || ''}" readonly></div><br>    
                <div><strong>Period</strong><br><input type="text" value="${employee.periodNameEn || ''}" readonly></div><br>
                <div><strong>Total Pay</strong><br><input type="text" value="${employee.totalPay || ''}" readonly></div>
            </div>
            <div class="col-md-4 section-border">
                <div><strong>Employee Name</strong><br><input type="text" value="${employee.hrPersonName || ''}" readonly></div><br>
                <div><strong>Start Date</strong><br><input type="text" value="${employee.startDate || ''}" readonly></div><br>
                <div><strong>Bank Name</strong><br><input type="text" value="${employee.bankNameEn || ''}" readonly></div><br>
            </div>
            <div class="col-md-4 section-border">
                <div><strong>Payroll Type</strong><br><input type="text" value="${employee.pyPayrollTypeName || ''}" readonly></div><br>
                <div><strong>End Date</strong><br><input type="text" value="${employee.endDate || ''}" readonly></div><br>
                <div><strong>IBAN</strong><br><input type="text" value="${employee.accountNumber || ''}" readonly></div><br>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Source Name</th>
                    <th>Earning Amount</th>
                    <th>Deduction Amount</th>
                </tr>
            </thead>
            <tbody>
                ${this.personDetailsList.map(item => `
                    <tr>
                        <td>${item.sourceName}</td>
                        <td style="text-align:center">${item.earningAmount}</td>
                        <td style="text-align:center">${item.deductionAmount}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
</body>
</html>
      `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close(); 
  }
}





  
}











