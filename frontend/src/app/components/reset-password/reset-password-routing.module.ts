import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent  } from './reset-password.component';
// import { EnsureAuthenticated } from '../../services/ensure-authenticated.service';
import { LoginRedirect } from '../../services/login-redirect.service';


const routes: Routes = [
  { path: 'resetPassword/:id', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    LoginRedirect
  ]
})
export class ResetPasswordRoutingModule { }