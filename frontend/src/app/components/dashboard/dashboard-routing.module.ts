import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent  } from './dashboard.component';
import { UserManagementComponent} from '../user-management/user-management.component';
import { LoginRedirect } from '../../services/login-redirect.service';
import { EditUserComponent} from '../edit-user/edit-user.component';



const routes: Routes = [
  //{ path: 'dashboard', component: DashboardComponent,canActivate: [LoginRedirect]},
  { path: 'userManagement', component: UserManagementComponent,canActivate: [LoginRedirect]},
  { path: 'editUser/:userId', component: EditUserComponent,canActivate: [LoginRedirect]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    LoginRedirect
  ]
})
export class DashboardRoutingModule { }
