import { Component, OnInit , Inject} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { takeUntil } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HrPersonPassportDetailsDto } from 'src/app/models/HrPersonsDto';
import { SelectdropdownResultResults } from 'src/app/models/selectdropdown';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-passport-modal',
  templateUrl: './passport-modal.component.html',
  styleUrls: ['./passport-modal.component.css']
})
export class PassportModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public injectedData:any,
  private passModal:MatDialogRef<PassportModalComponent>,
  private dropdownsService:SelectdropdownService,) 
  { }
  destroy$: Subject<boolean> = new Subject<boolean>();
  dataPassList:any=[];
  placeOfIssueList:any=[];
  issuedByCountryList:any=[];
  issuedByCityList:any=[];
  lang:string;
      PassEditObj = new HrPersonPassportDetailsDto();

   public passtypeCtrl: FormControl = new FormControl();
   public passtypeFilterCtrl: FormControl = new FormControl();
   public filteredpasstype: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

   public CountryOfIssuecrtl : FormControl = new FormControl();
   public CountryOfIssueFilterCtrl: FormControl = new FormControl();
   public filteredCountryOfIssue: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

   protected _onDestroy = new Subject<void>();

  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.PassEditObj = this.injectedData.PassEditObj;
    this.GetDataPass();

    this.passtypeFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterpasstype();
    });

    this.CountryOfIssueFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterCountryOfIssue();
    });
  }
  cancel(){
    this.passModal.close(null);
  }

  save(){
    this.validatePasss();
  }

  validatePasss(){
    
    if(!this.PassEditObj.countryOfIssueLkpId || !this.PassEditObj.passportNumber){
      return false;
    }else{
      this.passModal.close(this.PassEditObj);
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

  

  GetDataPass(){
    
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
  this.dropdownsService.GetCitiesList()
  .pipe(takeUntil(this.destroy$))
  .subscribe(data=>{   
    this.issuedByCityList = data;
  })

  }

  protected filterpasstype() {
    if (!this.dataPassList) {
      return;
    }
    let search = this.passtypeFilterCtrl.value;
    if (!search) {
      this.filteredpasstype.next(this.dataPassList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredpasstype.next(
      this.dataPassList.filter(i => i.text.toLowerCase().indexOf(search) > -1)
    );
  }


  protected filterCountryOfIssue() {
    if (!this.issuedByCountryList) {
      return;
    }
    let search = this.CountryOfIssueFilterCtrl.value;
    if (!search) {
      this.filteredCountryOfIssue.next(this.issuedByCountryList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCountryOfIssue.next(
      this.issuedByCountryList.filter(i => i.text.toLowerCase().indexOf(search) > -1)
    );
  }

  passtypeOpenedChange(isOpened: boolean) {
    if (isOpened) {
      this.filteredpasstype.next(this.dataPassList.slice());
    }
  }

  CountryofissueOpenedChange(isOpened: boolean) {
    if (isOpened) {
      this.filteredCountryOfIssue.next(this.issuedByCountryList.slice());
    }
  }

}
