import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    LoadingModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class LoginModule { }
