import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, FormArray,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  @ViewChild('closeDeactiveModal') closeDeactiveModal: ElementRef;
  @ViewChild('closeActiveModal') closeActiveModal: ElementRef;
  dropdownSettings = {};
  userDetails: any = [];
  addUserLoading : any = false;
  user: any = FormGroup;
  errorMessage: String = '';
  addUserError: boolean = false;
  editUserError: boolean = false;
  userDataload : boolean = true;
  editUserResponseStatus: boolean=false;
  editUserResponseMessage: string='';
  addUserResponseStatus:boolean=false;
  addUserResponseMessage:string='';
  addUserErrorMessage:string='';
  addedCusProd: any='';
  selectedAllValue:any='';
  userData:any='';
  editUserId:any='';
  //To insert the isAllcustomer flag if all selected
  isAllCustomer:boolean=false;
  customersData:Array<Object>=[];
  finalObject:Array<Object>=[];
  customersList:Array<Object>=[];
  products:Array<Object>=[];
  selectedItems:any='';
  editUserData:Array<Object>=[];
  
  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    private fb: FormBuilder,
    private router:Router

  ) { }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'productID',
      textField: 'productName',
      selectAllText: 'All',
      unSelectAllText: 'All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.route.params.subscribe(params => {
      this.editUserId=params.userId;
      this.authService.editSingleUserAPI(params).subscribe(res=>{
        this.editUserData = res['data'];
        this.isAllCustomer = res['data']['isAllCustomer'];
        this.getAllDropdowns();
      },error => { 
        //for session expire
        if(error.status == 500){
          this.router.navigate(['login']);
        }
      })
    })
    this.user = this.fb.group({
      fullName: new FormControl('',  Validators.required),
      userName: new FormControl('',  Validators.required),
      customerAndProducts: new FormArray([]),
    });
  }

 
  getAllDropdowns(){
    //Dropdowns list
    this.authService.getAllDropdownsAPI().subscribe(res=>{
      this.customersList= res["customers"];
      sessionStorage.setItem("customersList",JSON.stringify(res["customers"]));
      this.products=res["products"].filter(product=>{
        return product["productName"] !== 'All'
      });  
      this.initForm(this.editUserData)

    },error => { 
      //for session expire
      if(error.status == 500){
        this.router.navigate(['login']);
      }
    })
  }

 
  get formData() {
    return <FormArray>this.user.get('customerAndProducts'); 
  }

  removeCusProd(index){
    let customerAndProductsArray = this.user.controls['customerAndProducts'] as FormArray;
    customerAndProductsArray.removeAt(index);
  }


  noWhiteSpace(){
    var ele = document.getElementById("customerName");
    ele.addEventListener('keypress', function ( event ) {  
       var key = event.keyCode;
        if (key === 32) {
          event.preventDefault();
        }
    });
  }
  
  addSubHeader(data, id){
    let cus = [];
    //Everytime to get the whole customersList
    cus.push(JSON.parse(sessionStorage.getItem("customersList")));
    let customerAndProductsArray =this.user.controls['customerAndProducts'] as FormArray;
    //If response have All customers
    if(this.isAllCustomer && id ==0){
      customerAndProductsArray.push(this.fb.group({
        customers : new FormControl(data?data.customers:'',Validators.required),
        selectedproducts : new FormControl(data?data.selectedProducts:'',Validators.required),
        customersListArray:cus
      }));
    }else if((data ? data["customerName"] != "All" && !this.isAllCustomer : data == undefined && !this.isAllCustomer)){
     
      customerAndProductsArray.push(this.fb.group({
        customers : new FormControl(data?data.customers:'',Validators.required),
        selectedproducts : new FormControl(data?data.selectedProducts:'',Validators.required),
        customersListArray:cus
      }));
      let actualCus = customerAndProductsArray.value;
      if(actualCus.length >1){
        let selectedCustomersArr = [];
        let currentCus = actualCus.splice(actualCus.length-1, 1);
        actualCus.forEach((element,i)=>{
          selectedCustomersArr.push(element.customers.customerID)
        })
        selectedCustomersArr.forEach((customerId,id)=>{ 
          currentCus[0]["customersListArray"].forEach((current,index)=>{
            if(current["customerID"] == customerId){
              currentCus[0]["customersListArray"].splice(index,1);
            }else if(current["customerName"] == "All"){
              //All customer should not present in the list for id other than first(0)
              currentCus[0]["customersListArray"].splice(index,1);
            }
          })
        }) 
      }    
    }
  }
  noWhiteSpaceFull(value, name){
    if(value.trim() === '') {
      this.user.controls[name].setValue(value.trim());
    }
  }

  whiteSpace(){
    var ele = document.getElementById("firstName");
    ele.addEventListener('keypress', function ( event ) {  
      event.initKeyboardEvent;
    });
  }

 
  initForm(data){
    this.user = this.fb.group({
      fullName: new FormControl(data?data.fullName:'',  Validators.required),
      userName: new FormControl(data?data.userName:'',  Validators.required),
      customerAndProducts: new FormArray([]),
    });

    if(data && data.customerAndProducts && data.customerAndProducts.length) {
      data.customerAndProducts.forEach((customerAndProductObj, idx) => {
        this.addSubHeader(customerAndProductObj, idx);    
      });
    }else{
      this.addSubHeader(null, null);    
    }
  }

  onChange(newValue,id) {
    if(newValue["customerName"] != "All"){
      this.clearAllMessages();
      this.isAllCustomer=false;
    }else if(newValue["customerName"] == "All" && id==0){
      //TO remove all the added form arrays once it is selected all
      this.isAllCustomer=true;
      let customerAndProductsArray = this.user.controls['customerAndProducts'] as FormArray;
      let formLength = customerAndProductsArray.value.length;
      var index
      for (index = formLength - 1; index > 0; index--) {
        // Remove all but one occurrence and then add back only what the model dictates.
        this.removeCusProd(index);
      }
    }
  }

  cancel() {
    this.user.reset();
    //TO remove all the added form arrays once canceled
    let customerAndProductsArray = this.user.controls['customerAndProducts'] as FormArray;
    let formLength = customerAndProductsArray.value.length;
    var index
    for (index = formLength - 1; index > 0; index--) {
      // Remove all but one occurrence and then add back only what the model dictates.
      this.removeCusProd(index);
    }
    //TO remove the form array
    // this.addUserName(0)
    this.addUserResponseMessage = '';
  }

  editUserBtn(data){
    this.userData = this.user.value;
    this.userData["userId"]=this.editUserId;
    this.userData["isAllCustomer"]=this.isAllCustomer;
    this.addUserErrorMessage='';
    this.addUserResponseMessage='';
    this.authService.editUserAPI(this.userData).subscribe((res) => {
      if (res['error'] == false) {
        if(res["data"]) {
          this.userDetails.push(res["data"]);
          this.addUserLoading = false;
        }
        
        this.addUserResponseMessage = res["message"]
        this.addUserResponseStatus = true;
        this.addUserLoading = false;
        setTimeout(() => {
          this.router.navigate(['/userManagement']);
          this.addUserResponseMessage = '';
          this.addUserErrorMessage ='';
          this.addUserResponseStatus = false;          
        }, 2000);
      } else {
        this.addUserResponseMessage = res["message"];
        this.addUserResponseStatus = true;
        this.addUserLoading = false;
      }
    }, error => {
      if(error.status == 500){
        this.router.navigate(['login']);
      }else{
        let errorMes = JSON.parse(error["_body"]);
        this.addUserErrorMessage = errorMes["message"];
        this.addUserResponseStatus = false;
        this.addUserLoading = false;
      }
    })
  }

  clearAllMessages(){
    this.addUserResponseMessage = '';
    this.addUserErrorMessage ='';
    this.addUserResponseStatus = false;
  }

}
