import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormsModule, FormGroup, Validators } from '@angular/forms';


import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
