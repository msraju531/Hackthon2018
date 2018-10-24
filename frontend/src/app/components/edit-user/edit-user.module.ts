import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { EditUserComponent} from './edit-user.component';
import { EditUserRoutingModule} from './edit-user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EditUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [EditUserComponent]
})
export class EditUserModule { }
