import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import { EditUserRelativesDto } from 'src/app/models/editUserRelatives';

@Component({
  selector: 'app-familymembersmodal',
  templateUrl: './familymembersmodal.component.html',
  styleUrls: ['./familymembersmodal.component.css']
})
export class FamilymembersmodalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private familyModal:MatDialogRef<FamilymembersmodalComponent>,
  ) { }
  RelativeEditObj = new EditUserRelativesDto();
  
  genderList:any=[];
  caseCategoryList:any=[];
  nationalityList:any=[];
  qualificationsList:any=[];
  relativesTypeList:any=[];
  educationalStageList:any=[];
  maritalStatusList:any=[];

  ngOnInit() {
    this.RelativeEditObj = this.injectedData.RelativeEditObj;
    
    this.genderList = this.injectedData.genderList;
    this.caseCategoryList=this.injectedData.caseCategoryList;
    this.nationalityList = this.injectedData.nationalityList;
    this.qualificationsList = this.injectedData.qualificationsList;
    this.relativesTypeList = this.injectedData.relativesTypeList;
    this.educationalStageList=this.injectedData.educationalStageList;
    this.maritalStatusList=this.injectedData.maritalStatusList;
  }

  cancel(){
    this.familyModal.close(null);
  }

  save(){
    this.validateRelatives();
  }

  validateRelatives(){
    if(!this.RelativeEditObj.name || !this.RelativeEditObj.genderLkpId || !this.RelativeEditObj.idNumber){
      return false;
    }else{
      this.familyModal.close(this.RelativeEditObj);
    }
  }

}
