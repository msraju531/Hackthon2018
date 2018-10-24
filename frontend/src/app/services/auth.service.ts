import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { config } from '../../providers/config';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpService} from './http.service';


@Injectable()
export class AuthService {
  //For home component
  _isLoggedIn: BehaviorSubject<string> = new BehaviorSubject<string>('');
  LoginEventEmitter: Observable<string> = this._isLoggedIn.asObservable();
 
  constructor(private http:HttpClient,private httpService:HttpService) { }

  loginURL = '/login';
  forgotURL = '/forgotPassword';
  resetPasswordURL = '/resetPassword';
  uploadFileURL= '/uploadFile';
  dropdownsURL='/dropdowns';
  downloadURL = '/downloadFile';
  addUserURL = '/addUser';
  editSingleUserURL = '/editSingleUser';
  editUserURL = '/editUser';
  activateOrDeactivateURL = '/activateOrDeactivate';
  showUsersURL = '/showUsers';
  showDivisionsURL = '/showDivisions';
  addCustomerProductURL = '/addCustomerProduct';

  loginStatusUpdate(user){
    this._isLoggedIn.next(user);
  }

 

  userLogin (userDetails): Observable<any> {
    let body = {email:userDetails.email,password:userDetails.password};
    return this.httpService.post(this.loginURL, body).map((res:Response) => {
      return res.json();
    })
  }

 
  // Forgot password
  forgotPasswordAPI(postData) {
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json'})};
    let body = JSON.stringify({email:postData.email});
    return this.http.post(this.getFullURL(this.forgotURL), body, headers).map((res:Response) => {
      return res;
    })
  }

  //Resetting Password
  resetPasswordAPI(postData): Observable<any>{
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json'})};
    let body = JSON.stringify({password:postData.password, reset_key:postData.reset_key});
    return this.http.post(this.getFullURL(this.resetPasswordURL), body, headers).map((res:Response) => {
      return res;
    })
  }



  uploadFileAPI(file){
    let formData: FormData = new FormData();  
    formData.append('file', file, file.name); 
    let userObj = JSON.parse(sessionStorage.getItem('currentUser'))
    let headers =  {headers: new  HttpHeaders({'x-auth-token':userObj.token})};
    return this.http.post(this.getFullURL(this.uploadFileURL),formData,headers).map((res:Response) => {
      return res;
    })
  }

  getAllDropdownsAPI (): Observable<any> {
    return this.httpService.get(this.dropdownsURL).map((res:Response) => {
      return res.json();
    })
  }

  downloadFileAPI(selectedOpts): Observable<any> {
    return this.httpService.get(this.downloadURL+'?customerName='+selectedOpts.customerName+'&productName='+selectedOpts.productName+'&planningCycle='+selectedOpts.planningCycle+'&forecastCategory='+selectedOpts.forecastCategory+'&division='+selectedOpts.division+'&forecastType='+selectedOpts.forecastType).map((res:Response) => {
      return res.json();
    })
  }

  addUserAPI(postData): Observable<any> {
    let body = JSON.stringify({isAllCustomers:postData.isAllCustomer,fullName:postData.fullName,userName:postData.userName,customerAndProducts:postData.customerAndProducts});
    return this.httpService.post(this.addUserURL, body).map((res:Response) => {
      return res.json();
    })
  }


  editSingleUserAPI(postData): Observable<any> {
    return this.httpService.get(this.editSingleUserURL+"?userId="+postData.userId).map((res:Response) => {
      return res.json();
    })
  }


  editUserAPI(postData): Observable<any> {
    let body = JSON.stringify({isAllCustomers:postData.isAllCustomer,fullName:postData.fullName,userName:postData.userName,customerAndProducts:postData.customerAndProducts,userId:postData.userId});
    return this.httpService.post(this.editUserURL, body).map((res:Response) => {
      return res.json();
    })
  }

  
  showUsersAPI(){
    let userObj = JSON.parse(sessionStorage.getItem('currentUser'))
    let headers =  {headers: new  HttpHeaders({'x-auth-token':userObj.token})};
    return this.http.get(this.getFullURL(this.showUsersURL),headers).map((res:Response) => {
      return res;
    })
  }

  showDivisionsAPI(){
    let userObj = JSON.parse(sessionStorage.getItem('currentUser'))
    let headers =  {headers: new  HttpHeaders({'x-auth-token':userObj.token})};
    return this.http.get(this.getFullURL(this.showDivisionsURL),headers).map((res:Response) => {
      return res;
    })
  }
  activateOrDeactivateAPI(postData){
    let userObj = JSON.parse(sessionStorage.getItem('currentUser'))
    let headers =  {headers: new  HttpHeaders({'x-auth-token':userObj.token ,'Content-Type': 'application/json'})};
    let body = JSON.stringify({userId:postData.userId,isActive:postData.isActive});
    return this.http.post(this.getFullURL(this.activateOrDeactivateURL), body, headers).map((res:Response) => {
      return res;
    })
  }


  addCustomerProductAPI(postData): Observable<any> {
    let body;
    if(postData["customer"]){
      body = JSON.stringify({customersAndDivision:postData});
    }
    if(postData["product"]){
      body = JSON.stringify({products:postData});
    }
    return this.httpService.post(this.addCustomerProductURL, body).map((res:Response) => {
      return res.json();
    })
  }
  
  //To get the full api url
  private getFullURL(url: string): string {
    return config.api_url + url;
  }
  
}
