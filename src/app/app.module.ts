import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; 


import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MatDialogRef, MAT_DIALOG_DATA, MatSortModule } from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { MatDialogModule } from "@angular/material";
import { MatExpansionModule } from "@angular/material/expansion"; 

import {
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatBadgeModule,
  MatCardModule,
  MatSelectModule,
  MatRadioModule,
  MatInputModule,
  MatChipsModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatCheckboxModule,
  MAT_DATE_LOCALE,
} from "@angular/material";
import { UserService } from "./services/user.service";
import { SelectdropdownService } from "./services/selectdropdown.service";
import { MainpageService } from "./services/mainpage.service";
import { BoardService } from "./services/board.service";
import { AuthService } from "./services/auth.service";
import { ProfileService } from "./services/profile.service";
import { AddrequestService } from "./services/addrequest.service";
import { ChangepasswordService } from "./services/changepassword.service";
import { ForgertpasswordService } from "./services/forgertpassword.service";
import { Interceptor } from "./services/interceptor";
import { AuthGuard } from "./guards/auth.guard";
import { HomeauthGuard } from "./guards/homeauth.guard";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgxMaskModule, IConfig } from "ngx-mask";
import {
  FontAwesomeModule,
  FaIconLibrary,
} from "@fortawesome/angular-fontawesome";
import { HomeComponent } from "./components/home/home.component";
import { BoardComponent } from "./components/board/board.component";
import { MainComponent } from "./components/main/main.component";

import { LoadingComponent } from "./components/loading/loading.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { InsideloaderComponent } from "./components/insideloader/insideloader.component";
import { DeletemodalComponent } from "./components/deletemodal/deletemodal.component";
import { ChangepasswordComponent } from "./components/changepassword/changepassword.component";
import { RequestmodalComponent } from "./components/requestmodal/requestmodal.component";
import { ForgetpasswordmodalComponent } from "./components/forgetpasswordmodal/forgetpasswordmodal.component";
import { ResetpasswordComponent } from "./components/resetpassword/resetpassword.component";
import { IncomemodalComponent } from "./components/incomemodal/incomemodal.component";
import { DutymodalComponent } from "./components/dutymodal/dutymodal.component";
import { FamilymembersmodalComponent } from "./components/familymembersmodal/familymembersmodal.component";
import { MatTabsModule } from "@angular/material/tabs";
import { RequestmodalValidationComponent } from "./components/requestmodal-validation/requestmodal-validation.component";
import { AttachmentsmodalComponent } from "./components/attachmentsmodal/attachmentsmodal.component";
import { SignInDialogComponentComponent } from "./components/sign-in-dialog-component/sign-in-dialog-component.component";
import { Dialog1Component } from "./components/dialog1/dialog1.component";
import { Dialog2Component } from "./components/dialog2/dialog2.component";
import { Dialog3Component } from "./components/dialog3/dialog3.component";
import { SafePipe } from "./safe.pipe";
import { DialogService } from "./services/dialog.service";
import { VisaModalComponent } from "./components/visa-modal/visa-modal.component";
import { PassportModalComponent } from "./components/passport-modal/passport-modal.component";
import { IdentityCardModalComponent } from "./components/identity-card-modal/identity-card-modal.component";
import { HrVacationsTypesComponent } from "./components/hr-vacations-types/hr-vacations-types.component";

import { MatTableModule,MatTableDataSource } from "@angular/material/table";
import { MatPaginator,MatPaginatorModule } from "@angular/material/paginator";
import { HrPersonDialogComponent } from "./components/hr-person-dialog/hr-person-dialog.component";
import { HrPyPayrollOperationsComponent } from "./components/hr-py-payroll-operations/hr-py-payroll-operations.component";
import { HrPyPayrollOperationsPersonComponent } from "./components/hr-py-payroll-operations-person/hr-py-payroll-operations-person.component";
import { HrPyPayrolDetalDialogComponent } from "./components/hr-py-payrol-detal-dialog/hr-py-payrol-detal-dialog.component";
import { VacationRequestsComponent } from "./components/vacation-requests/vacation-requests.component";
import { HrDocumentRequestComponent } from "./components/hr-document-request/hr-document-request.component";
import { HrDocumentRequestDialogComponent } from "./components/hr-document-request-dialog/hr-document-request-dialog.component";
import { HrDocumentRequestApproveComponent } from "./components/hr-document-request-approve/hr-document-request-approve.component";
import { HrDocumentRequestApproveDialogComponent } from "./components/hr-document-request-approve-dialog/hr-document-request-approve-dialog.component";
import { HrEmployeeResignationComponent } from './components/hr-employee-resignation/hr-employee-resignation.component';
import { HrEmployeeResignationDialogComponent } from './components/hr-employee-resignation-dialog/hr-employee-resignation-dialog.component';
import { HrEmployeeResignationApproveComponent } from './components/hr-employee-resignation-approve/hr-employee-resignation-approve.component';
import { HealthModalComponent } from './components/health-modal/health-modal.component';
import { AddressDetailsModalComponent } from './components/address-details-modal/address-details-modal.component';
import { JobDescriptionModalComponent } from './components/job-description-modal/job-description-modal.component';
import { Chart1Component } from './components/chart1/chart1.component';
import { Chart2Component } from './components/chart2/chart2.component';
import { Chart3Component } from './components/chart3/chart3.component';
import { Chart4Component } from "./components/chart4/chart4.component";
import { Chart5Component } from "./components/chart5/chart5.component";
import { HrDocumentRequestViewComponent } from './components/hr-document-request-view/hr-document-request-view.component';
import { HrViewVacationComponent } from "./components/hr-view-vacation/hr-view-vacation.component";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ImagePreviewComponent } from "./components/image-preview/image-preview.component";
import { DocumentRequestViewComponent } from './components/document-request-view/document-request-view.component';
import { VacationRequestViewComponent } from './components/vacation-request-view/vacation-request-view.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
 

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    MainComponent,

    LoadingComponent,
    HrVacationsTypesComponent,
    ProfileComponent,
    InsideloaderComponent,
    DeletemodalComponent,
    ChangepasswordComponent,
    RequestmodalComponent,
    ForgetpasswordmodalComponent,
    ResetpasswordComponent,
    IncomemodalComponent,
    DutymodalComponent,
    FamilymembersmodalComponent,
    RequestmodalValidationComponent,
    AttachmentsmodalComponent,
    SignInDialogComponentComponent,
    Dialog1Component,
    Dialog2Component,
    Dialog3Component,
    SafePipe,
    VisaModalComponent,
    PassportModalComponent,
    IdentityCardModalComponent,
    HrVacationsTypesComponent,
    HrPersonDialogComponent,
    HrViewVacationComponent,
    HrPyPayrollOperationsComponent,
    HrPyPayrollOperationsPersonComponent,
    HrPyPayrolDetalDialogComponent,
    VacationRequestsComponent,
    HrDocumentRequestComponent,
    HrDocumentRequestDialogComponent,
    HrDocumentRequestApproveComponent,
    HrDocumentRequestApproveDialogComponent,
    HrEmployeeResignationComponent,
    HrEmployeeResignationDialogComponent,
    HrEmployeeResignationApproveComponent,
    HealthModalComponent,
    AddressDetailsModalComponent,
    JobDescriptionModalComponent,
    Chart1Component,
    Chart2Component,
    Chart3Component,
    Chart4Component,
    Chart5Component,
    HrDocumentRequestViewComponent,
    ImagePreviewComponent,
    DocumentRequestViewComponent,
    VacationRequestViewComponent,
    LeaveRequestComponent,
  ],

  imports: [
   
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatExpansionModule,
    CarouselModule,
    MatTabsModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(options),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: "ar",
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatBadgeModule,
    MatSelectModule,
    NgxMatSelectSearchModule

  
 
  ],
  providers: [
    // Guards
    AuthGuard,
    HomeauthGuard,
    // Services
    MatDatepickerModule,
    SelectdropdownService,
    UserService,
    MainpageService,
    BoardService,
    ChangepasswordService,
    ForgertpasswordService,
    DialogService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    ProfileService,
    AddrequestService,
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    {provide: Window, useValue: window},
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DeletemodalComponent,
    RequestmodalComponent,
    ForgetpasswordmodalComponent,
    VisaModalComponent,
    PassportModalComponent,
    IdentityCardModalComponent,
    HrPersonDialogComponent,
    HrViewVacationComponent,
    HrPyPayrolDetalDialogComponent,
    IncomemodalComponent,
    DutymodalComponent,
    FamilymembersmodalComponent,
    RequestmodalValidationComponent,
    VacationRequestsComponent,
    HrDocumentRequestComponent,
    HrDocumentRequestDialogComponent,
    HrDocumentRequestApproveComponent,
    IncomemodalComponent,
    DutymodalComponent,
    FamilymembersmodalComponent,
    AttachmentsmodalComponent,
    SignInDialogComponentComponent,
    Dialog1Component,
    Dialog2Component,
    Dialog3Component,
    HrDocumentRequestApproveDialogComponent,
    HrEmployeeResignationComponent,
    HrEmployeeResignationDialogComponent,
    HrEmployeeResignationApproveComponent,
    HealthModalComponent,
    AddressDetailsModalComponent,
    JobDescriptionModalComponent,
    HrDocumentRequestViewComponent,
    VacationRequestViewComponent,
    DocumentRequestViewComponent,
    ImagePreviewComponent ,
    LeaveRequestComponent,

  ],
})

export class AppModule {}

