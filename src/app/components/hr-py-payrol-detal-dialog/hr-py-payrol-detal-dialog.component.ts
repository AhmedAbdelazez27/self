import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import {  PyPayrollOperationPersonDetailsDto } from 'src/app/models/PyPayrollOperationPersonDetailsDto';
import { PyPayrollOperationPersonDto } from 'src/app/models/PyPayrollOperationPersonDto';

@Component({
  selector: 'app-hr-py-payrol-detal-dialog',
  templateUrl: './hr-py-payrol-detal-dialog.component.html',
  styleUrls: ['./hr-py-payrol-detal-dialog.component.css']
})
export class HrPyPayrolDetalDialogComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,

    private familyModal:MatDialogRef<HrPyPayrolDetalDialogComponent>,
  ) { }

  list2:PyPayrollOperationPersonDetailsDto[]; 
  total:number=0;
  deductionAmount:number=0;
  netValue:number=0;
 disabled=false;
  ngOnInit() {
    
    this.disabled=true;

   //this.total=this.list2.forEach((x)=>{return x.earningAmount+=x.earningAmount})
  

    this.list2 = this.injectedData.list2;
    this.list2.forEach(element => {
      this.total+=element.earningAmount
     });
     this.list2.forEach(element => {
      this.deductionAmount+=element.deductionAmount
     });
     this.netValue=this.total-this.deductionAmount
  }

  cancel(){
    this.familyModal.close(null);
  }

}
