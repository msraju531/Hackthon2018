import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showDropdown:Boolean=false;
  userName:any='';
  userRoleId:any='';
  userId:any='';
  uploadedfile:any='';
  showUploadError:any='';
  showMadatoryError:any='';
  successMessage:any='';
  uploader:any='';
  showLoading:Boolean=false;
  showMenu:boolean = false;
  customers:Array<Object>=[];
  products:Array<Object>=[];
  planningCycles:Array<Object>=[];
  versions:Array<Object>=[];

  model: any = {
    options: ""
  };
  constructor( private router:Router, public authService: AuthService,) { 
    this.authService.LoginEventEmitter.subscribe((user: any) => {
      this.showMenu = user ? true : false;
      this.userName = user? user.data.name:'';
      if (sessionStorage.getItem('currentUser')!== null) {
        this.userRoleId = JSON.parse(sessionStorage.getItem('currentUser')).roleId;
        this.userId = JSON.parse(sessionStorage.getItem('currentUser')).userId;
      }
    });
  }

  ngOnInit() {
    this.showMenu = true;
    if (sessionStorage.getItem('currentUser')!== null) {
      this.showMenu = true;
      this.userName = JSON.parse(sessionStorage.getItem('currentUser')).name;
      this.userRoleId = JSON.parse(sessionStorage.getItem('currentUser')).roleId;
      this.userId = JSON.parse(sessionStorage.getItem('currentUser')).userId;
    }else{
      //this.router.navigate(['/']);
      this.showMenu = false;
    }

  }

  showSideDropdown(){
    if(this.showDropdown == false){
      this.showDropdown = true;
    } else{
      this.showDropdown = false;
    }
  }

  logout(){
    sessionStorage.clear();
    this.showDropdown = false;
    this.showMenu = false;
    this.authService.loginStatusUpdate(false);
    this.router.navigate(['login']);
  }


}
