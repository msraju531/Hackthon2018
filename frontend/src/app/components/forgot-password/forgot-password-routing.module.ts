import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent  } from './forgot-password.component';
import { LoginRedirect } from '../../services/login-redirect.service';

const routes: Routes = [
  { path: 'forgotPassword', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    LoginRedirect
  ]
})
export class ForgotPasswordRoutingModule { }