import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AddCustomerProductComponent} from './add-customer-product.component';
import { LoginRedirect } from '../../services/login-redirect.service';

const routes: Routes = [
  { path: 'addCustomerProduct', component: AddCustomerProductComponent,canActivate: [LoginRedirect]},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AddCustomerProductRoutingModule { }
