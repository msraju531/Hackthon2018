import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRedirect} from '../../services/login-redirect.service';
import { AddCustomerProductComponent} from '../add-customer-product/add-customer-product.component';
import { HomeComponent} from '../home/home.component';

const routes: Routes = [
  {path:'addCustomerProduct',component:AddCustomerProductComponent,canActivate:[LoginRedirect]},
  {path:'userManagement',component:HomeComponent,canActivate:[LoginRedirect]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers:[LoginRedirect]
})
export class UserManagementRoutingModule { }
