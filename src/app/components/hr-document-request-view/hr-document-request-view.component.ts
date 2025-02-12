import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HrDocumentRequestDto } from 'src/app/models/HrDocumentRequestDto';
import { SelectdropdownResultResults } from 'src/app/models/selectdropdown';
import { ProfileService } from 'src/app/services/profile.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-hr-document-request-view',
  templateUrl: './hr-document-request-view.component.html',
  styleUrls: ['./hr-document-request-view.component.css'],
  providers :[ DatePipe]

})
export class HrDocumentRequestViewComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  private ProfileService:ProfileService
  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: any,
  private ViewModal:MatDialogRef<HrDocumentRequestViewComponent>,
  private datePipe: DatePipe,) { }

  DocumentEditObj = new HrDocumentRequestDto();

  strid:any;
  userData:any;
  supervisorname:string;
  ngOnInit() {
    
    this.DocumentEditObj = this.injectedData.DocumentEditObj;
    this.DocumentEditObj.supervisorSubmitDate = this.datePipe.transform(this.fromStringToDate(this.DocumentEditObj.supervisorSubmitDate));
    this.DocumentEditObj.lastmodificationDate = this.datePipe.transform(this.fromStringToDate(this.DocumentEditObj.lastmodificationDate));
    console.log("result")
    console.log(this.DocumentEditObj)
  
    
  }

  btnclose(){
   this.ViewModal.close()
  }

  
  getTextFromSelect(id:number,list:SelectdropdownResultResults[]){
    let obj =  list.find(x=>x.id == id);
    if (obj) {
      return obj.text
    }
  }
  fromStringToDate(str):any{
    if(str != null){
    let parts = str.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0])
    }
  }

}
