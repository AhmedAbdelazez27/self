import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SafeHtml, SafeStyle } from '@angular/platform-browser';
import { ProfileService } from 'src/app/services/profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HrDocumentRequestDto } from 'src/app/models/HrDocumentRequestDto';
import { SelectdropdownService } from 'src/app/services/selectdropdown.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-hr-document-request-dialog',
  templateUrl: './hr-document-request-dialog.component.html',
  styleUrls: ['./hr-document-request-dialog.component.css']
})
export class HrDocumentRequestDialogComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private documentModal:MatDialogRef<HrDocumentRequestDialogComponent>,
    private ProfileService:ProfileService,
    private dropdownsService:SelectdropdownService,
    public translate: TranslateService,
    private sanitizer: DomSanitizer,
  ) { }
  hrPersonList:any=[];
  documentlist:any=[];
  lang:string;
  strid:any;
  DocumentEditObj =new HrDocumentRequestDto();

  public hrPersonCtrl: FormControl = new FormControl();
  public hrPersonFilterCtrl: FormControl = new FormControl();
  public filteredhrPerson: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  public documentcrtl : FormControl = new FormControl();
  public documentFilterCtrl: FormControl = new FormControl();
  public filtereddocument: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  protected _onDestroy = new Subject<void>();
  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.strid=localStorage.getItem('user_id')
    this.DocumentEditObj = this.injectedData.DocumentEditObj;
    this.GetData();

    this.hrPersonFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterhrPerson();
    });

    this.documentFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterdocument();
    });
  }
   
  cancel(){
    this.documentModal.close(null);
  }

  save(){
    
    this.validateAttachment();
   
    
  }
  validateAttachment(){
    if(!this.DocumentEditObj.hrPersonId ||!this.DocumentEditObj.documentLkpId ){
      return false;
    }else{
      this.documentModal.close(this.DocumentEditObj);
    }
  }
  GetData(){
    this.strid=localStorage.getItem('user_id')
    this.dropdownsService.GetHrPersonList(this.strid)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{   
      this.hrPersonList = data;
    })
    
    this.dropdownsService.GetDocumentTypeList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{   
      this.documentlist = data;
    })
  
    }

    onFileChange(event,id){
        if (event.target.files.length > 0) {
          let file = event.target.files[0];
          this.ProfileService.UploadDocumentRequest(file)
          .subscribe(data =>{
            console.log(data);
            this.DocumentEditObj.filePath = data.result;
             
          })
          
        
      }
    }

    protected filterhrPerson() {
      if (!this.hrPersonList) {
        return;
      }
      let search = this.hrPersonFilterCtrl.value;
      if (!search) {
        this.filteredhrPerson.next(this.hrPersonList.slice());
        return;
      } else {
        search = search.toLowerCase();
      }
      this.filteredhrPerson.next(
        this.hrPersonList.filter(i => i.text.toLowerCase().indexOf(search) > -1)
      );
    }
  
    protected filterdocument() {
      if (!this.documentlist) {
        return;
      }
      let search = this.documentFilterCtrl.value;
      if (!search) {
        this.filtereddocument.next(this.documentlist.slice());
        return;
      } else {
        search = search.toLowerCase();
      }
      this.filtereddocument.next(
        this.documentlist.filter(i => i.text.toLowerCase().indexOf(search) > -1)
      );
    }
  
  
    hrPersonOpenedChange(isOpened: boolean) {
      if (isOpened) {
        this.filteredhrPerson.next(this.hrPersonList.slice());
      }
    }
  
    documentOpenedChange(isOpened: boolean) {
      if (isOpened) {
        this.filtereddocument.next(this.documentlist.slice());
      }
    }
}
