import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthService } from '../../services/auth.service';
import { LoadingModule } from 'ngx-loading';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FormsModule,
    LoadingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ForgotPasswordComponent],
  providers: [AuthService]
})
export class ForgotPasswordModule { }
