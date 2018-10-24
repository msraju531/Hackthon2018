import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  SuccessMessge: any;
  ErrorMessge: any;
  passwordMismatch:any;
  reset = {
    password: '',
    conform_password: '',
    reset_key: ''
  };

  model: any = {
    newPwd: '',
    confirmPwd:'',
    confirmKey:''
  };


  loginError:boolean = false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) { }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.reset.reset_key = params['id'];
        this.authService.loginStatusUpdate(false);
      }
    });
  }

  doReset(form) {
    if (form.valid) {
      if(this.reset.password === this.reset.conform_password){
        this.authService.resetPasswordAPI(this.reset).subscribe(res => {
          if (res.error === false) {
            this.SuccessMessge = res.message;
            setTimeout(() => {    //<<<---    using ()=> syntax
              this.router.navigate(['login']);
            }, 3000);
          }
        },(error) => {
            this.ErrorMessge = error.message;
          })
      } else {
        this.passwordMismatch = 'Confirm password mismatch!';
      }
    }
  }

  formHealthCheck() {
    this.ErrorMessge = '';
    this.SuccessMessge = '';
    this.passwordMismatch = '';
  }
}


