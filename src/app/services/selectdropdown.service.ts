import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Globals } from 'src/app/globals';
import { HttpClient } from '@angular/common/http';
import { Selectdropdown } from "src/app/models/selectdropdown";

@Injectable({
  providedIn: 'root'
})
export class SelectdropdownService {
  constructor(private http:HttpClient){}
  CitiesList;
  CaseCategoryList;
  GenderList;
  NationalityList;
  QualificationsList;
  RelativesTypeList;
  EducationalStageList;
  MaritalStatusList;
  ScPortalRequestStatuesList;

  DataScDutiesList:any=[];
  DataIncomeList:any=[];
  AidRequestTypeList:any=[];
  AidRequestTypeListGroup:any=[];

  WifeNationality1List;
  WifeNationality2List;
  WifeNationality3List;
  WifeNationality4List;
  WifeHelthStatus1List;
  WifeHelthStatus2List;
  WifeHelthStatus3List;
  WifeHelthStatus4List;
  WifeQualification1List;
  WifeQualification2List;
  WifeQualification3List;
  WifeQualification4List;
  BankList;
  BranchList;
  FirstTitleList ;
  PersonTypeList ;
  CountryOfBrithList;

  PersonCategoryList ;
  HrOrganizationsDeptList ;
  JobList ;
  HrOrganizationsBranchList ;
  HrPersonSupervisorList ;
  PyPayrollTypeList ;
  SponserList ;
  ProbationUnitList ;
  DestinationCountryList ;
  TicketClassList ;
  NoticeUnitList ;
  PaymentTypeList ;
  StatusList ;
  JobGradeList ;
  DataVisaList;
  PlaceOfIssueList;
  IssuedByList;
  DataPassList;

  StatusList2;
  HrPersonList;
  HrVacationsTypeList;
  Documentlist;
  ResignationTypeList;
  HelthCardList;

  AddressType;



//passport
GetPassType():Observable<Selectdropdown>{
  return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonPassportDetailsPassportType&&pageSize=100&pageNumber=1').pipe(
    map(x => this.DataPassList = x.result.results)
  )
}
 

//visa
  GetdataVisa():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonVisaDetailsVisaType&&pageSize=100&pageNumber=1').pipe(
      map(x => this.DataVisaList = x.result.results)
    )
  }
  GetDataplaceOfIssue():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=City&&pageSize=100&pageNumber=1').pipe(
      map(x => this.PlaceOfIssueList = x.result.results)
    )
  }
  GetDataIssuedBy():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonVisaDetailsIssuedBy&&pageSize=100&pageNumber=1').pipe(
      map(x => this.IssuedByList = x.result.results)
    )
  }

  GetCitiesList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=City&&pageSize=100&pageNumber=1').pipe(
      map(x => this.CitiesList = x.result.results)
    )
  }
  GetCaseCategoryList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=PortalUsersCaseCategory&&pageSize=100&pageNumber=1').pipe(
      map(x => this.CaseCategoryList = x.result.results)
    )
  }
  

  GetGenderList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Gender&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.GenderList = x.result.results)
    )
  }
  
 

  GetNationalityList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Nationality&&pageSize=400&pageNumber=1').pipe(
      map((x:any) => this.NationalityList = x.result.results)
    )
  }

  GetQualificationsList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Qualification&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.QualificationsList = x.result.results)
    )
  }

  GetRelativesTypeList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=RelativesType&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.RelativesTypeList = x.result.results)
    )
  }

  GetScPortalRequestStatuesList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=ScPortalRequestStatues&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.ScPortalRequestStatuesList = x.result.results)
    )
  }

  // GetScaidRequestTypeList():Observable<Selectdropdown>{
  //   return this.http.get<any>(Globals.Url +  '/ScFndAidRequestType/GetAidRequestTypeLkpForTenant?tenantId='+ tenantId +'&').pipe(
  //     map((x:any) => this.ScPortalRequestStatuesList = x.result.results)
  //   )
  // }



  // GetAidRequestTypeLkpForTenant(tenantId:number):Observable<Selectdropdown>{
  //   return this.http.get<any>(Globals.Url + '/ScFndAidRequestType/GetAidRequestTypeLkpForTenant?tenantId='+ tenantId +'&').pipe(
  //     map((x:any) => x.result.results)
  //   )
  // }

  

// 'FndLookupValues/GetFndLookupValuesSelect2?type=FndAidRequestType&pageSize=20&pageNumber=1'
 
  GetAidRequestTypeLkp(tenantId:number):Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'ScFndPortalIntervalSetting/GetAllScPortalAidRequestTypeIntervalSettingForPortal').pipe(
      map((x:any) =>this.AidRequestTypeList= x.result.results)
      
    )
  }
//'ScFndPortalIntervalSetting/GetAllScPortalAidRequestTypeIntervalSettingForAIDRequestPortal'
//'ScFndAidRequestTypeTr/GetAidRequestTypeTrLkp?pageSize=20&pageNumber=1&parentFilter='+aidRequestTypeLkpId
  GetAidRequestTypeLkpForGroup(tenantId:number,aidRequestTypeLkpId):Observable<Selectdropdown>{
    
    return this.http.get<any>(Globals.Url + 'ScFndPortalIntervalSetting/GetAllScPortalAidRequestTypeIntervalSettingForAIDRequestPortal?parentFilter='+aidRequestTypeLkpId).pipe(    
      map((x:any) => this.AidRequestTypeListGroup = x.result.results)
    )
  }

  GetEducationalStageList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=EducationalStage&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.EducationalStageList = x.result.results)
    )
  }
  GetMaritalStatusList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=MaritalStatus&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.MaritalStatusList = x.result.results)
    )
  }

  GetDataScDuties():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'ScIncomeDuties/GetDataScDutiesSelect2?pageSize=20&pageNumber=1').pipe(
      map((x:any) =>this.DataScDutiesList = x.result.results)
    )
  }

  GetRequestIncome():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'ScIncomeDuties/GetDataScIncomeSelect2?pageSize=20&pageNumber=1').pipe(
      map((x:any) => this.DataScDutiesList = x.result.results)
    )
  }

  

  GetWifeNationality1():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Nationality&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.WifeNationality1List = x.result.results)
    )
  }
  GetWifeNationality2():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Nationality&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.WifeNationality2List = x.result.results)
    )
  }
  GetWifeNationality3():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Nationality&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.WifeNationality3List = x.result.results)
    )
  }
  GetWifeNationality4():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Nationality&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.WifeNationality4List = x.result.results)
    )
  }
  GetWifeHelthStatus1():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HealthStatus&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.WifeHelthStatus1List = x.result.results)
    )
  }
  GetWifeHelthStatus2():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HealthStatus&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.WifeHelthStatus2List = x.result.results)
    )
  }
  GetWifeHelthStatus3():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HealthStatus&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.WifeHelthStatus3List = x.result.results)
    )
  }
  GetWifeHelthStatus4():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HealthStatus&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.WifeHelthStatus4List = x.result.results)
    )
  }
  GetWifeQualification1():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Qualification&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.WifeQualification1List = x.result.results)
    )
  }
  GetWifeQualification2():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Qualification&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.WifeQualification2List = x.result.results)
    )
  }
  GetWifeQualification3():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Qualification&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.WifeQualification3List = x.result.results)
    )
  }
  GetWifeQualification4():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Qualification&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.WifeQualification4List = x.result.results)
    )
  }
  GetBank():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Banks&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.BankList = x.result.results)
    )
  }
  Getbranch():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=CharityBranch&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.BranchList = x.result.results)
    )
  }
  GetFirstTitleList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrTitle&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.FirstTitleList = x.result.results)
    )
  }
  GetpersonTypeList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonsPersonType&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.PersonTypeList = x.result.results)
    )
  }

  GetcountryOfBrithList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Country&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.CountryOfBrithList = x.result.results)
    )
  }


  GetpersonCategoryList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonsPersonPersonCategory&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.PersonCategoryList = x.result.results)
    )
  }

  GethrOrganizationsDeptList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'HrOrganizations/GetHrOrganizationsSelect2?pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.HrOrganizationsDeptList = x.result.results)
    )
  }
  GetjobList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Job&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.JobList = x.result.results)
    )
  }
  GethrOrganizationsBranchList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'HrOrganizations/GetHrOrganizationsSelect2?pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.HrOrganizationsBranchList = x.result.results)
    )
  }
  GethrPersonSupervisorList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'HrPersons/GetPersonSupervisorSelect2ForPortal?pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.HrPersonSupervisorList = x.result.results)
    )
  }
  GetpyPayrollTypeList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'PyPayrollTypes/GetPyPayrollTypesSelect2?pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.PyPayrollTypeList = x.result.results)
    )
  }
  GetsponserList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonsPersonPersonSponser&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.SponserList = x.result.results)
    )
  }
  GetprobationUnitList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonsPersonProbationUnit&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.ProbationUnitList = x.result.results)
    )
  }
  GetdestinationCountryList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=Country&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.DestinationCountryList = x.result.results)
    )
  }

  GetticketClassList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonsPersonTicketClass&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.TicketClassList = x.result.results)
    )
  }
  GetnoticeUnitList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonsPersonProbationUnit&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.NoticeUnitList = x.result.results)
    )
  }
 
  GetpaymentTypeList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonsPersonPaymentType&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.PaymentTypeList = x.result.results)
    )
  }
  GetstatusList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonsPersonStatues&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.StatusList = x.result.results)
    )
  }
  GetjobGradeList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonsPersonJobGrade&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.JobGradeList = x.result.results)
    )
  }

  // GetstatusList2():Observable<Selectdropdown>{
  //   return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrPersonVacationsStatues&&pageSize=50&pageNumber=1').pipe(
  //     map((x:any) => this.StatusList2 = x.result.results)
  //   )
  // }
  GetHrPersonList(id:any):Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + '/HrPersons/GetPersonsSelect2ById?id='+id+'&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.HrPersonList = x.result.results)
    )
  }

  // GetHrAlternativePersonList():Observable<Selectdropdown>{
  //   return this.http.get<any>(Globals.Url + '/HrPersons/GetAllPersonsSelect2By?pageSize=50&pageNumber=1').pipe(
  //     map((x:any) => this.HrPersonList = x.result.results)
  //   )
  // }


  GethrVacationsTypeList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + '/HrPersonVacations/GetHrVacationsTypesSelect2ForPrtal?pageSize=50&pageNumber=1&tenantId='+localStorage.getItem("tenantId")).pipe(
      map((x:any) => this.HrVacationsTypeList = x.result.results)
    )
  }

  GetDocumentTypeList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=HrDocumentRequestType&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.Documentlist = x.result.results)
    )
  }

  //Ajith
  GetAddressTypeList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=AddressType&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.Documentlist = x.result.results)
    )
  }
  //Ajith
 
  
  GethrResignationTypeList():Observable<Selectdropdown>{
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=ResignationType&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.ResignationTypeList = x.result.results)
    )
  }

  GetHeathCardList(){
    return this.http.get<any>(Globals.Url + 'FndLookupValues/GetFndLookupValuesSelect2?type=healthCardType&&pageSize=50&pageNumber=1').pipe(
      map((x:any) => this.HelthCardList = x.result.results)
    )
  }
}
