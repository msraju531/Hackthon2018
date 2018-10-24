import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormsModule, FormGroup, Validators } from '@angular/forms';


// import { UserManagementComponent} from './user-management.component';
import { UserManagementRoutingModule} from './user-management-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule
  ],
  declarations: []
})
export class UserManagementModule { }
