import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScPortalRequestIncome } from 'src/app/models/ScPortalRequestIncome';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';

@Component({
  selector: 'app-incomemodal',
  templateUrl: './incomemodal.component.html',
  styleUrls: ['./incomemodal.component.css']
})
export class IncomemodalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private incomeModal:MatDialogRef<IncomemodalComponent>,
    
    private dropdownsService:SelectdropdownService,
  ) { }
  IncomeEditObj = new ScPortalRequestIncome();

  destroy$: Subject<boolean> = new Subject<boolean>();
  dataIncomeList:any=[];
  lang:string;


  ngOnInit() {
    this.IncomeEditObj = this.injectedData.IncomeEditObj;
    this.lang = localStorage.getItem('lang');
    this.GetRequestIncome();
  }

  cancel(){
    this.incomeModal.close(null);
  }

  save(){
    this.validateIncomes();
  }

  validateIncomes(){
    if(!this.IncomeEditObj.scIncomeId || !this.IncomeEditObj.monthlyIncomeAmount){
      return false;
    }else{
      this.incomeModal.close(this.IncomeEditObj);
    }
  }
  GetRequestIncome(){
    this.dropdownsService.GetRequestIncome()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.dataIncomeList = data;
    })
    }
}
