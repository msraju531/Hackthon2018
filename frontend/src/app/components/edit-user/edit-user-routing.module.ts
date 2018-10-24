import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EditUserComponent} from './edit-user.component';
import { LoginRedirect } from '../../services/login-redirect.service';
import {UserManagementComponent} from '../user-management/user-management.component';
import { DashboardComponent} from '../dashboard/dashboard.component';


const routes: Routes = [
  {path:'editUser/:userId', component:EditUserComponent, canActivate: [LoginRedirect]},
  {path:'userManagement',component:UserManagementComponent,canActivate: [LoginRedirect] },
  {path:'dashboard',component:DashboardComponent,canActivate: [LoginRedirect] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
    LoginRedirect
  ]
})
export class EditUserRoutingModule { }
