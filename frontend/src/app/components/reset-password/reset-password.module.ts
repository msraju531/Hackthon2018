 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { AuthService } from '../../services/auth.service';
import { LoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule,
    LoadingModule,
    ReactiveFormsModule
  ],
  declarations: [ResetPasswordComponent],
  providers: [AuthService]
})
export class ResetPasswordModule { }
