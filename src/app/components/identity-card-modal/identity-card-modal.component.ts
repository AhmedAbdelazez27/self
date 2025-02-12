import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { HrPersonIdentityCardDto } from 'src/app/models/HrPersonsDto';

@Component({
  selector: 'app-identity-card-modal',
  templateUrl: './identity-card-modal.component.html',
  styleUrls: ['./identity-card-modal.component.css']
})
export class IdentityCardModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public injectedData :any,
  private IdCardModal:MatDialogRef<IdentityCardModalComponent>,
   
  ) { }
  destroy$: Subject<boolean> = new Subject<boolean>();
  IdCardEditObj = new HrPersonIdentityCardDto();
  lang:string;
  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.IdCardEditObj = this.injectedData.IdCardEditObj;
  }

  cancel(){
    this.IdCardModal.close(null);
  }

  save(){
    this.validateIdCards();
  }

  validateIdCards(){
    
    if(!this.IdCardEditObj.cardNo || !this.IdCardEditObj.idNumber){
      return false;
    }else{
      this.IdCardModal.close(this.IdCardEditObj);
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

}
