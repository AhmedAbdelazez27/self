import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { ScPortalRequestDuties } from 'src/app/models/ScPortalRequestDuties';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-dutymodal',
  templateUrl: './dutymodal.component.html',
  styleUrls: ['./dutymodal.component.css']
})
export class DutymodalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private dutyModal:MatDialogRef<DutymodalComponent>,
    private dropdownsService:SelectdropdownService,
    
    ) { }
    destroy$: Subject<boolean> = new Subject<boolean>();
  dataScDutiesList:any=[];
  lang:string;
  DutiesEditObj = new ScPortalRequestDuties();

  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.DutiesEditObj = this.injectedData.DutiesEditObj;
    this.GetDataScDuties();

  }

  cancel(){
    this.dutyModal.close(null);
  }

  save(){
    this.validateDuties();
  }

  validateDuties(){
    
    if(!this.DutiesEditObj.scDutiesId || !this.DutiesEditObj.monthlyAmount){
      return false;
    }else{
      this.dutyModal.close(this.DutiesEditObj);
    }
  }

  GetDataScDuties(){
    
  this.dropdownsService.GetDataScDuties()
  .pipe(takeUntil(this.destroy$))
  .subscribe(data=>{   
    this.dataScDutiesList = data;
  })
  }


}




