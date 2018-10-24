
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoadingModule } from 'ngx-loading';
import { HttpModule,XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from './services/http.service';
import { httpFactory } from './services/http.factory';
import { LoaderService } from './services/loader.service';

import  {DashboardRoutingModule} from './components/dashboard/dashboard-routing.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginRedirect } from './services/login-redirect.service';
import { ForgotPasswordModule } from './components/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './components/reset-password/reset-password.module';
import { LoaderModule } from './components/loader/loader.module';

import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { HomeModule} from './components/home/home.module';
import { EditUserModule} from './components/edit-user/edit-user.module';
import { HomeComponent } from './components/home/home.component';
import { AddCustomerProductModule} from './components/add-customer-product/add-customer-product.module';
// import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  
  declarations: [
    AppComponent,
    UserManagementComponent,
    HomeComponent,
    // AddCustomerProductComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    HttpClientModule,
    AppBootstrapModule,
    AppRoutingModule,
    LoginModule,
    ForgotPasswordModule,
    ResetPasswordModule,   
    LoadingModule,
    SharedModule,
    DashboardModule,
    DashboardRoutingModule,
    EditUserModule,
    HomeModule,
    AddCustomerProductModule,
    LoaderModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ LoginRedirect,
    {
      provide: HttpService,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions,LoaderService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
