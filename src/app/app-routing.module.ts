import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BoardComponent } from './components/board/board.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
//import { AddrequestComponent } from './components/addrequest/addrequest.component';
import { AuthGuard } from './guards/auth.guard';
import { AddrequestGuard } from './guards/addrequest.guard';
import { HomeauthGuard } from './guards/homeauth.guard';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { HrVacationsTypesComponent } from './components/hr-vacations-types/hr-vacations-types.component';
import { HrPyPayrollOperationsComponent } from './components/hr-py-payroll-operations/hr-py-payroll-operations.component';
import { HrPyPayrollOperationsPersonComponent } from './components/hr-py-payroll-operations-person/hr-py-payroll-operations-person.component';
import {VacationRequestsComponent} from './components/vacation-requests/vacation-requests.component';
import { HrDocumentRequestComponent } from './components/hr-document-request/hr-document-request.component';
import { HrDocumentRequestApproveComponent } from './components/hr-document-request-approve/hr-document-request-approve.component';
import { HrEmployeeResignationComponent } from './components/hr-employee-resignation/hr-employee-resignation.component';
import { HrEmployeeResignationApproveComponent } from './components/hr-employee-resignation-approve/hr-employee-resignation-approve.component';
 import { LeaveRequestComponent } from './leave-request/leave-request.component';
const routes: Routes = [
  {path:'' , redirectTo:'board/main', pathMatch:'full' , canActivate: [AuthGuard]},
  {path:'board' , redirectTo:'board/main', pathMatch:'full'},
  {path:'home' , component:HomeComponent },
 
  {path:'reset' , component:ResetpasswordComponent },
  {path:'board' , component:BoardComponent,canActivate: [AuthGuard],children:[
    {path: 'main', component:MainComponent},
    { path: 'profile/:id', component: ProfileComponent },
  //  {path: 'addrequest', component:AddrequestComponent , canActivate: [AddrequestGuard]},
 //   { path: "addrequest/:id/:tenantId", component: AddrequestComponent },
  //  { path: "addrequest/:id/:tenantId/:view", component: AddrequestComponent},
    {path: 'profile', component:ProfileComponent},
    {path:'HrVacationsTypes' , component:HrVacationsTypesComponent },
    {path:'HrPyPayrollOperations' , component:HrPyPayrollOperationsComponent },
    {path:'VacationRequests' , component:VacationRequestsComponent },
    {path:'HrDocumentRequests' , component:HrDocumentRequestComponent },
    {path:'HrDocumentRequestApprove' , component:HrDocumentRequestApproveComponent },
    {path:'HrEmployeeResignation' , component:HrEmployeeResignationComponent },
    {path:'HrEmployeeResignationApprove' , component:HrEmployeeResignationApproveComponent },
    { path: 'HrPyPayrollOperationsPerson/:id/:hrPersonId', component: HrPyPayrollOperationsPersonComponent },

    {path: 'password', component:ChangepasswordComponent},

    {path:'LeavesRequest' , component:LeaveRequestComponent },

  ]},
  {path: 'password', component:ChangepasswordComponent},
  {path:'**' , redirectTo:'home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
