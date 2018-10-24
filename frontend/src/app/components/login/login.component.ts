import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:any= FormGroup;
  resData:string;
  loginError:boolean = false;
  errorMessage:String = '';
  showMenu:boolean=false;
  model: any = {
    email:'',
    password:''
  };
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    // sessionStorage.clear();
    this.authService.loginStatusUpdate(false);
    this.user= this.fb.group({
      email:['', Validators.compose([Validators.required])],
      password:['', Validators.compose([Validators.required])]
    })
  }
  noWhiteSpace(){
    var ele = document.getElementById("userEmail");
    ele.addEventListener('keypress', function ( event ) {  
       var key = event.keyCode;
        if (key === 32) {
          event.preventDefault();
        }
    });
  }
  login(user){
    this.authService.userLogin(user).subscribe(data=>{
      if(data['error'] === false){
        this.authService.loginStatusUpdate(data);
        this.resData= data['data']
        let accessToken = data['data'].token;
        sessionStorage.setItem('token', accessToken);
        sessionStorage.setItem('currentUser', JSON.stringify(data['data']));
       //this.router.navigate(['/dashboard']);
       this.router.navigate(['/userManagement']);
      }else{
       this.loginError = true;
      } 
    },error => { 
      if(error.status == 500){
        this.router.navigate(['login']);
      }else{
        let errorMes = JSON.parse(error["_body"]);
        this.errorMessage = errorMes["message"];
        this.loginError = true;
      }
    })
  }
 

  clearExisitingErrors(){
    var el2 = document.getElementById("#errors");
    if(el2 !== null){
      el2.style.display = "none";
    }
    this.errorMessage='';
    this.loginError = false;
  }
}
