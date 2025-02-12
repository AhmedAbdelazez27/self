import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { take, takeUntil } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelect } from '@angular/material';
import { HrPersonVisaDetailsDto } from 'src/app/models/HrPersonsDto';
import { SelectdropdownResultResults } from 'src/app/models/selectdropdown';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-visa-modal',
  templateUrl: './visa-modal.component.html',
  styleUrls: ['./visa-modal.component.css']
})
export class VisaModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public injectedData:any,
  private visaModal:MatDialogRef<VisaModalComponent>,
  private dropdownsService:SelectdropdownService,) {
    
   }
   destroy$: Subject<boolean> = new Subject<boolean>();
   dataVisaList:any=[];
   placeOfIssueList:any=[];
   issuedByList:any=[];
   lang:string;
   VisaEditObj = new HrPersonVisaDetailsDto();


   public issueCtrl: FormControl = new FormControl();
   public issueFilterCtrl: FormControl = new FormControl();
   public filteredissue: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

   public placeOfIssuecrtl : FormControl = new FormControl();
   public placeOfIssueFilterCtrl: FormControl = new FormControl();
   public filteredplaceOfIssue: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

   public visatypecrtl : FormControl = new FormControl();
   public visatypeFilterCtrl: FormControl = new FormControl();
   public filteredvisatype: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
 
   protected _onDestroy = new Subject<void>();
   

  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.VisaEditObj = this.injectedData.VisaEditObj;
    this.GetDataVisa();

    this.issueFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterissue();
    });

    this.placeOfIssueFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterplaceOfIssue();
    });

    this.visatypeFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filtervisatype();
    });

  }

  cancel(){
    this.visaModal.close(null);
  }

  save(){
    this.validateVisas();
  }

  validateVisas(){
    
    if(!this.VisaEditObj.issuedByLkpId || !this.VisaEditObj.visaNumber){
      return false;
    }else{
      this.visaModal.close(this.VisaEditObj);
    }
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

  

  GetDataVisa(){
    
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

  }  

  protected filterissue() {
    if (!this.issuedByList) {
      return;
    }
    let search = this.issueFilterCtrl.value;
    if (!search) {
      this.filteredissue.next(this.issuedByList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredissue.next(
      this.issuedByList.filter(i => i.text.toLowerCase().indexOf(search) > -1)
    );
  }


  protected filterplaceOfIssue() {
    if (!this.placeOfIssueList) {
      return;
    }
    let search = this.placeOfIssueFilterCtrl.value;
    if (!search) {
      this.filteredplaceOfIssue.next(this.placeOfIssueList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredplaceOfIssue.next(
      this.placeOfIssueList.filter(i => i.text.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filtervisatype() {
    if (!this.dataVisaList) {
      return;
    }
    let search = this.visatypeFilterCtrl.value;
    if (!search) {
      this.filteredvisatype.next(this.dataVisaList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredvisatype.next(
      this.dataVisaList.filter(i => i.text.toLowerCase().indexOf(search) > -1)
    );
  }


  issueOpenedChange(isOpened: boolean) {
    if (isOpened) {
      this.filteredissue.next(this.issuedByList.slice());
    }
  }

  placeofissueOpenedChange(isOpened: boolean) {
    if (isOpened) {
      this.filteredplaceOfIssue.next(this.placeOfIssueList.slice());
    }
  }

  visatypeOpenedChange(isOpened: boolean) {
    if (isOpened) {
      this.filteredvisatype.next(this.dataVisaList.slice());
    }
  }

}
