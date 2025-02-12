import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { takeUntil } from 'rxjs/operators';
import { HrPersonAddressDetailsDto } from 'src/app/models/HrPersonsDto';
import { SelectdropdownResultResults } from 'src/app/models/selectdropdown';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-address-details-modal',
  templateUrl: './address-details-modal.component.html',
  styleUrls: ['./address-details-modal.component.css']
})
export class AddressDetailsModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public injectedData:any,
  private AddressModal:MatDialogRef<AddressDetailsModalComponent>,
  private dropdownsService:SelectdropdownService,) {
    
   }
   destroy$: Subject<boolean> = new Subject<boolean>();
   dataAddressList:any=[];
   placeOfIssueList:any=[];
   issuedByList:any=[];
   lang:string;
   AddressEditObj = new HrPersonAddressDetailsDto();
   issuedByCountryList: any=[];
   issuedByCityList: any=[];

   
   public AddressCtrl: FormControl = new FormControl();
   public AddressFilterCtrl: FormControl = new FormControl();
   public filteredAddress: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

   public CountryListcrtl : FormControl = new FormControl();
   public CountryListFilterCtrl: FormControl = new FormControl();
   public filteredCountryList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

   public CityListcrtl : FormControl = new FormControl();
   public CityListFilterCtrl: FormControl = new FormControl();
   public filteredCityList: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
 
   protected _onDestroy = new Subject<void>();
   
  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.AddressEditObj = this.injectedData.AddressEditObj;
    this.GetDataAddress();

    this.AddressFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterAddress();
    });

    this.CountryListFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterCountryList();
    });

    this.CityListFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterCityList();
    });
  }

  cancel(){
    this.AddressModal.close(null);
  }

  save(){
    this.validateAddress();
  }

  validateAddress(){
    // if(!this.AddressEditObj.addressTypekp || !this.AddressEditObj.countrykp){
    //   return false;
    // }else{
      this.AddressModal.close(this.AddressEditObj);
  
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

  

  GetDataAddress(){
    
  this.dropdownsService.GetAddressTypeList()
  .pipe(takeUntil(this.destroy$))
  .subscribe(data=>{   
    this.dataAddressList = data;
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

  protected filterAddress() {
    if (!this.dataAddressList) {
      return;
    }
    let search = this.AddressFilterCtrl.value;
    if (!search) {
      this.filteredAddress.next(this.dataAddressList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredAddress.next(
      this.dataAddressList.filter(i => i.text.toLowerCase().indexOf(search) > -1)
    );
  }


  protected filterCountryList() {
    if (!this.issuedByCountryList) {
      return;
    }
    let search = this.CountryListFilterCtrl.value;
    if (!search) {
      this.filteredCountryList.next(this.issuedByCountryList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCountryList.next(
      this.issuedByCountryList.filter(i => i.text.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterCityList() {
    if (!this.issuedByCityList) {
      return;
    }
    let search = this.CityListFilterCtrl.value;
    if (!search) {
      this.filteredCityList.next(this.issuedByCityList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCityList.next(
      this.issuedByCityList.filter(i => i.text.toLowerCase().indexOf(search) > -1)
    );
  }


  AddressOpenedChange(isOpened: boolean) {
    if (isOpened) {
      this.filteredAddress.next(this.dataAddressList.slice());
    }
  }

  CountryListOpenedChange(isOpened: boolean) {
    if (isOpened) {
      this.filteredCountryList.next(this.issuedByCountryList.slice());
    }
  }

  CityListOpenedChange(isOpened: boolean) {
    if (isOpened) {
      this.filteredCityList.next(this.issuedByCityList.slice());
    }
  }
  
}
