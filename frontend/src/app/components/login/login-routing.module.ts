import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
// import { EnsureAuthenticated } from '../../services/ensure-authenticated.service';
import { LoginRedirect } from '../../services/login-redirect.service';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full', canActivate:[LoginRedirect]},
  // { path: 'login', component: LoginComponent, canActivate:[LoginRedirect]}
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    LoginRedirect
  ]
})
export class LoginRoutingModule { }
