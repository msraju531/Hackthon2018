import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-customer-product',
  templateUrl: './add-customer-product.component.html',
  styleUrls: ['./add-customer-product.component.scss']
})
export class AddCustomerProductComponent implements OnInit {
  radioBtn = null;
  customers: any = FormGroup;
  products: any = FormGroup;
  addUserResponseMessage: any = '';
  addUserErrorMessage: any = '';
  postData:any='';
  custName : Boolean= false;
  addUserResponseStatus: Boolean = false;

  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    private router:Router,
    private fb: FormBuilder) { }


  ngOnInit() {
    this.customers = this.fb.group({
      customer: new FormControl('',[Validators.required,this.trimValidator]),
      divisions: new FormArray([])
    });
    this.products = this.fb.group({
      product: new FormControl('',[Validators.required,this.trimValidator])
    });
    this.addDivision();
  }
 
  trimValidator (control: FormControl): { [s: string]: boolean }{ 
    let re = / /;
    if (control.value && control.value.trim() == '') {
      return { nospace: true };
    }
  }

  get formData() {
    return <FormArray>this.customers.get('divisions');
  }

  removeCusProd(index) {
    let divisionsArray = this.customers.controls['divisions'] as FormArray;
    divisionsArray.removeAt(index);
  }

  addDivision() {
    let divisionsArray = this.customers.controls['divisions'] as FormArray;
    divisionsArray.push(this.fb.group({
      customerProjName: new FormControl('',[Validators.required,this.trimValidator])
    }));
    this.custName=true;

  }

  noWhiteSpaceBegin(value, name){
    if(name == 'customer'){
      if(value.trim() === '') {
        this.customers.controls[name].setValue(value.trim());
      }
    }
    if(name == 'product'){
      if(value.trim() === '') {
        this.products.controls[name].setValue(value.trim());
      }
    }
  }


  noWhiteSpaceBeginDiv(value, name,id){
    if(value.trim() === '') {
      let divisionsArray = this.customers.controls['divisions'].controls as FormArray;
      divisionsArray[id].controls[name].setValue(value.trim());
    }
  }

  timeOutFunction(){
    setTimeout(() => {
      this.addUserErrorMessage = '';
      this.addUserResponseMessage = '';
      this.router.navigate(['/userManagement']);
    }, 3000);
  }



  addCusDivBtn(data) {
    if(data == 'customers'){
      this.postData =this.customers.value;
    }
    if(data == 'products'){
      this.postData =this.products.value;
    }
    this.authService.addCustomerProductAPI(this.postData).subscribe((res) => {
      if (res['error'] == false) {
        this.addUserErrorMessage = '';
        this.addUserResponseMessage = res["message"];
        this.addUserResponseStatus = true;
        this.timeOutFunction();
        
      } else {
        this.addUserErrorMessage = res["message"];
        this.addUserResponseStatus = false;
        this.timeOutFunction();
      }
    }, error => {
      if(error.status == 500){
        this.router.navigate(['login']);
      }else{
        this.addUserResponseMessage = '';
        let errorMes = JSON.parse(error["_body"]);
        this.addUserErrorMessage = errorMes["message"];
        this.addUserResponseStatus = false;
        //Remove all forms added
        let divisionsArray = this.customers.controls['divisions'] as FormArray;
        let formLength = divisionsArray.value.length;
        var index
        for (index = formLength; index >= 0; index--) {
          // Remove all but one occurrence and then add back only what the model dictates.
          this.removeCusProd(index);
        }
      }
    })
    
  }


  clearExistingMsgs(){
    this.addUserErrorMessage = '';
    this.addUserResponseMessage = '';
  }

  cancel(){
    this.addUserResponseMessage = '';
    this.addUserErrorMessage=''
    this.addUserResponseStatus = false;
    this.customers.reset();
    this.products.reset();
    this.radioBtn=null;
    this.router.navigate(['/userManagement']);
    //Remove all forms added
    let divisionsArray = this.customers.controls['divisions'] as FormArray;
    let formLength = divisionsArray.value.length;
    var index
    for (index = formLength ; index >= 0; index--) {
      // Remove all but one occurrence and then add back only what the model dictates.
      this.removeCusProd(index);
    }
  }
}
