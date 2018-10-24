import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  ErrorMessge: any;
  SuccessMessge:any;
  forgot = {
    email: '',
  }
  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
   
  }
  doForgot(form) {
    if (form.valid) {
      this.authService.forgotPasswordAPI(this.forgot).subscribe(res => {
        if(res['error'] === true){
          this.ErrorMessge = res['message'];
          this.formHealthCheck()
        }else {
          this.SuccessMessge = res["message"];
          setTimeout(() => {    //<<<---    using ()=> syntax
            this.router.navigate(['login']);
          }, 3000);
        }
      },(error) => {
        this.ErrorMessge = error.error.message;
      })
    }
  }
  formHealthCheck() {
    this.ErrorMessge = '';
    this.SuccessMessge = '';
  }
}
