import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { pipes } from './_pipes';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [pipes],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, pipes]
})
export class SharedModule { }

