import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

interface MyFile extends File {
  lastModified: any;
}

declare var jQuery:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {


  showDropdown:Boolean=false;
  userName:any='';
  userRoleId:any='';
  userId:any='';
  uploadedfile:any='';
  showUploadError:any='';
  showMadatoryError:any='';
  successMessage:any='';
  uploader:any='';
  avoidOverLap:Boolean=false;
  customerDivisions:any='';
  showLoading:Boolean=false;
  showMenu:Boolean=true;
  customers:Array<Object>=[];
  products:Array<Object>=[];
  planningCycles:Array<Object>=[];
  versions:Array<Object>=[];

  model: any = {
    options: ""
  };
  constructor( private router:Router,private authService: AuthService,private fb: FormBuilder) { }

  ngOnInit() {
    this.showMenu=true;
    if (sessionStorage.getItem('currentUser')!== null) {
      this.showMenu=true;
      this.userName = JSON.parse(sessionStorage.getItem('currentUser')).name;
      this.userRoleId = JSON.parse(sessionStorage.getItem('currentUser')).roleId;
      this.userId = JSON.parse(sessionStorage.getItem('currentUser')).userId;
    }
  
  }

  showSideDropdown(){
    if(this.showDropdown == false){
      this.showDropdown = true;
    } else{
      this.showDropdown = false;
    }
  }
 
  uploadFile(xlsxFile){
    this.showLoading = true;
    this.showMadatoryError="";
    this.successMessage = "";
    this.showUploadError = "";
    // let fileList: FileList = xlsxFile.target.files[0];  
    // let file: File = fileList;  
    let myFile = <MyFile>xlsxFile.target.files[0];
    if(xlsxFile.target.value){
      xlsxFile.target.value= null;
    }

    let file = myFile.lastModified;
    
    //TO upload the file
    this.authService.uploadFileAPI(myFile).subscribe(res=>{
      if(res['error'] === true){
        this.showUploadError = res['message'];
        this.showLoading = false;
        this.showMadatoryError="";
        this.successMessage = "";
        this.setTimeOutFuntion();

      }else {
        this.successMessage = res['message'];
        this.showLoading = false;
        this.showMadatoryError="";
        this.showUploadError = "";
        // this.setTimeOutFuntion();
      }
    },error => { 
      //for session expire
      if(error.status == 500){
        this.router.navigate(['login']);
      }
      // let errorMes = JSON.parse(error["_body"]);
      // this.showUploadError = errorMes["message"];
      this.showUploadError =error.error.message;
      this.showLoading = false;
      this.setTimeOutFuntion();
    })
     
  }

  getAllDropdowns(){
    //To download the file
    this.authService.getAllDropdownsAPI().subscribe(res=>{
      if(res['error'] === true){
        this.showUploadError = res['message'];
        this.showLoading = false;
        //Flag to avoid overlapping
        // this.avoidOverLap = false;
      }else {
        this.customerDivisions= res["divisions"];
        this.customers= res["customers"];
        this.planningCycles = res["planningCycles"];
        this.products=res["products"];
        this.versions= res["versions"];
        //To avoid overlapping of the modal
        jQuery('#myModal').modal('show');
        var d2= document.getElementById("modalDialog")
        d2.style['display']='block';
        
      }
    },error => { 
      console.log("==========errordashboard",error)
      //for session expire
      if(error.status == 500){
        this.router.navigate(['login']);
      }
    })
  }
  
  setTimeOutFuntion(){
    setTimeout( ()=> {
      this.showMadatoryError="";
      this.successMessage = "";
      this.showUploadError = "";
    },4000);
  }

  radioBtn=null;
  selectedOpt = {
    customerName:'',
    productName:'',
    planningCycle:'',
    forecastCategory:'',
    forecastType:'',
    division:''
  };

  downloadFile(){
    // this.showLoading  = true;
    this.successMessage = "";
    this.showUploadError = "";
    if((this.selectedOpt['customerName'] =='' || this.selectedOpt['planningCycle'] =='' || this.selectedOpt['forecastCategory']=='' || this.selectedOpt['division']=='') && 
     (this.selectedOpt['productName'] =='' || this.selectedOpt['planningCycle'] =='' || this.selectedOpt['forecastCategory']==''))
    {
      // this.showLoading  = false;
      this.showMadatoryError = "*Please select all the mandatory fields.";
      this.successMessage = "";
      this.showUploadError = "";
      this.setTimeOutFuntion();
    }else{
      this.authService.downloadFileAPI(this.selectedOpt).subscribe((res)=>{
        if(res['error'] == false){
          // this.showLoading = false;
          this.showMadatoryError="";
          this.successMessage = "";
          this.showUploadError = "";
          window.open(
            res['downloadURL'],
            '_self'
          );
        }else{
          this.showUploadError = res['message'];
          // this.showLoading = false;
        }
      },error => { 
        //for session expire
        if(error.status == 500){
          this.router.navigate(['login']);
        }else{

          let errorMes = JSON.parse(error["_body"]);
          this.showUploadError = errorMes["message"];
        }
        // this.showLoading = false;
      })
    }
 
    this.removeSelectedFilter();
  }

  removeSelectedFilter(){
    this.radioBtn=null;
    this.selectedOpt['customerName']='';
    this.selectedOpt['productName']='';
    this.selectedOpt['planningCycle']='';
    this.selectedOpt['forecastCategory']='';
    this.selectedOpt['division']='';
    this.selectedOpt['forecastType']='';
  }
 
}
