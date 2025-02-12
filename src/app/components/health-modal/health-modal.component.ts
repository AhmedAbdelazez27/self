import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { HrPersonHealthCardDetailsEditDto } from 'src/app/models/HrPersonHealthCardDetailsEditDto';
import { HrPersonHealthCardDetailsDto } from 'src/app/models/HrPersonsDto';
import { SelectdropdownResultResults } from 'src/app/models/selectdropdown';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';

@Component({
  selector: 'app-health-modal',
  templateUrl: './health-modal.component.html',
  styleUrls: ['./health-modal.component.css']
})
export class HealthModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public injectedData:any,
  private HealthModal:MatDialogRef<HealthModalComponent>,
  private dropdownsService: SelectdropdownService,) 
  { 

  }
  destroy$: Subject<boolean> = new Subject<boolean>();
  HealthCardList:any=[];
  HealthCardEditObj = new HrPersonHealthCardDetailsDto();
  lang:string;

  public HealthCardCtrl: FormControl = new FormControl();
   public HealthCardFilterCtrl: FormControl = new FormControl();
   public filteredHealthCard: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

   protected _onDestroy = new Subject<void>();

  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.HealthCardEditObj = this.injectedData.HealthCardEditObj;
    console.log("Health-card-data")
    this.GetDataHealth();

    this.HealthCardFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterHealthCard();
    });
  }
  
  cancel(){
    this.HealthModal.close(null);
  }

  save(){
    this.validateHealth();
  }

  validateHealth(){
    
    if(!this.HealthCardEditObj.healthCardTypeLkpId || !this.HealthCardEditObj.healthCardNumber){
      return false;
    }else{
      this.HealthModal.close(this.HealthCardEditObj);
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

  GetDataHealth() {

    this.dropdownsService.GetHeathCardList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.HealthCardList = data;
      })

  }
  protected filterHealthCard() {
    if (!this.HealthCardList) {
      return;
    }
    let search = this.HealthCardFilterCtrl.value;
    if (!search) {
      this.filteredHealthCard.next(this.HealthCardList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredHealthCard.next(
      this.HealthCardList.filter(i => i.text.toLowerCase().indexOf(search) > -1)
    );
  }


  HealthCardOpenedChange(isOpened: boolean) {
    if (isOpened) {
      this.filteredHealthCard.next(this.HealthCardList.slice());
    }
  }

}
