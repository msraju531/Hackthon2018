import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRedirect } from '../../services/login-redirect.service';
import { HomeComponent} from './home.component';
import { UserManagementComponent} from '../user-management/user-management.component';


const routes:Routes=[
  { path: 'dashboard', component: HomeComponent,canActivate: [LoginRedirect]},
  { path: 'userManagement', component: UserManagementComponent,canActivate: [LoginRedirect]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule],
  providers:[]
})
export class HomeRoutingModule { }
