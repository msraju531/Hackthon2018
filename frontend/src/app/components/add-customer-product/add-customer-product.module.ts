import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';



import { AddCustomerProductRoutingModule } from './add-customer-product-routing.module';
import { AddCustomerProductComponent} from './add-customer-product.component';

@NgModule({
  imports: [
    CommonModule,
    AddCustomerProductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AddCustomerProductComponent]
})
export class AddCustomerProductModule { }
