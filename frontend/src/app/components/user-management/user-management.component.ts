import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, FormArray,Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';





@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

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
  isAllCustomer:boolean=false;
  showPlusSymbol:boolean=true;
  customersData:Array<Object>=[];
  finalObject:Array<Object>=[];
  customersList:Array<Object>=[];
  products:Array<Object>=[];
  selectedItems:any='';
  editUserData:Array<Object>=[];
  custName:Boolean=false;
  getClickedUser:any={
    isActive:null,
    userId:null
  };
  
  addUM: boolean = false;
  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    private fb: FormBuilder,
    private router:Router

  ) { }

  addUserManagement() {
    this.addUM = true;
    this.user.reset();
    this.addUserResponseMessage = '';
    this.addUserErrorMessage=''
    this.addUserResponseStatus = false;
    let customerAndProductsArray = this.user.controls['customerAndProducts'] as FormArray;
    let formLength = customerAndProductsArray.value.length;
    var index
    for (index = formLength; index >= 0; index--) {
      // Remove all but one occurrence and then add back only what the model dictates.
      this.removeCusProd(index);
    }
  }

  getUserId(isActive, id) {
    if(isActive == true) {
      isActive = 1
    }else {
      isActive = 0
    }
    this.getClickedUser.isActive = isActive;
    this.getClickedUser.userId = id;
  }


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
    this.getAllUsers();
    this.user = this.fb.group({
      fullName: new FormControl('',Validators.required),
      userName: new FormControl('',Validators.required),
      customerAndProducts: new FormArray([],Validators.required)
    });
    // this.addCusProd();
  }

 getAllUsers(){
  this.authService.showUsersAPI().subscribe((res) => {
    if (res["data"]) {
      this.userDetails = res["data"];
      this.userDataload = false;
    }
    this.getAllDropdowns();
  }, error => {
    //for session expire
    if(error.status == 500){
      this.router.navigate(['login']);
    }
  });
 }

  getAllDropdowns(){
    //To download the file
    this.authService.getAllDropdownsAPI().subscribe(res=>{
        this.customersList= res["customers"];
        sessionStorage.setItem("customersListAddUser",JSON.stringify(res["customers"]));
        this.products=res["products"].filter(product=>{
          return product["productName"] !== 'All'
        });  
    }, error => {
      //for session expire
      if(error.status == 500){
        this.router.navigate(['login']);
      }
    })
  }

  noWhiteSpaceFull(value, name){
    if(value.toString().trim() === '') {
      this.user.controls[name].setValue(value.toString().trim());
    }
  }

  whiteSpace(){
    var ele = document.getElementById("firstName");
    ele.addEventListener('keypress', function ( event ) {  
      event.initKeyboardEvent;
    });
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

 
  //TO add form array only after entering the username
  addUserName(enteredUserName){

    this.addUserErrorMessage ='';
    enteredUserName=enteredUserName.toString().trim()
    if(enteredUserName.length ==0 || enteredUserName.length ==undefined){
      let customerAndProductsArray = this.user.controls['customerAndProducts'] as FormArray;
      let formLength = customerAndProductsArray.value.length;
      var index
      for (index = formLength; index >= 0; index--) {
        // Remove all but one occurrence and then add back only what the model dictates.
        this.removeCusProd(index);
      }
    }
    if(!this.custName  && enteredUserName.length>0){
      //TO check the blur condition for once
      // this.custName = true;
      this.addCusProd();
    }
  }


  get formData() {
    return <FormArray>this.user.get('customerAndProducts'); 
  }

  removeCusProd(index){
    this.custName = false;
    let customerAndProductsArray = this.user.controls['customerAndProducts'] as FormArray;
    customerAndProductsArray.removeAt(index);
  }

  addCusProd(){
    let customerAndProductsArray = this.user.controls['customerAndProducts'] as FormArray;    
    let cus = [];
    if(this.showPlusSymbol && this.custName){
      //Everytime to get the whole customersList
      cus.push(JSON.parse(sessionStorage.getItem("customersListAddUser")));
      cus[0]= cus[0].filter(data=>{
        return data["customerName"] !== "All"
      })
    }else{
      //Everytime to get the whole customersList
      cus.push(JSON.parse(sessionStorage.getItem("customersListAddUser")));
    }
    this.custName=true;
    customerAndProductsArray.push(this.fb.group({
      customers : new FormControl('',Validators.required),
      selectedproducts : new FormControl('',Validators.required),
      customersListArray: cus
    }));
    let actualCus = customerAndProductsArray.value;
    let currentCus = actualCus.splice(actualCus.length - 1, 1);
    let selectedCustomersArr = [];
    actualCus.forEach((element,i)=>{
      selectedCustomersArr.push(element.customers.customerID)
    })
    //To map the previously selected customer array with customers list of current form array 
    selectedCustomersArr.forEach((customerId,id)=>{
      currentCus[0]["customersListArray"].forEach((current,index)=>{
        if(current["customerID"] == customerId){
          currentCus[0]["customersListArray"].splice(index,1);
        }
      })
    })
  }
  
  onChange(newValue,id) {
    //TO remove all the added form arrays once it is selected all
    if(newValue && newValue["customerName"] == "All" && id==0){
      this.showPlusSymbol=false
      this.isAllCustomer = true;
      let customerAndProductsArray = this.user.controls['customerAndProducts'] as FormArray;
      let formLength = customerAndProductsArray.value.length;
      var index
      //Remove all except one form when All is selected
      for (index = formLength - 1; index > 0; index--) {
        // Remove all but one occurrence and then add back only what the model dictates.
        this.removeCusProd(index);
      }
    }else if(newValue && newValue["customerName"] !== "All"){
      this.showPlusSymbol=true
    }
  }


  cancel() {
    this.noWhiteSpace();
    this.addUM = false;
    this.user.reset();
    //For cus name blur
    this.custName = false;
    this.showPlusSymbol=true;
    this.addUserName(0)
    this.addUserResponseMessage = '';
    this.addUserErrorMessage=''
    this.addUserResponseStatus = false;
  }

  // setTimeout(() => {
  //   this.getAllUsers();
  //   this.addUM = false;
  //   this.addUM = false;
  //   this.addUserResponseStatus = false;
  // }, 1000);

  addUserBtn(data) {
    //For cus name blur
    this.custName = false;
    this.userData = this.user.value;
    this.userData["isAllCustomer"]=this.isAllCustomer;
    this.addUserErrorMessage='';
    if(this.userData.fullName.toString().trim() != ''){
     this.authService.addUserAPI(this.userData).subscribe((res) => {
        if (res['error'] == false) {
          // this.userDetails.push(res["data"]);
          this.addUserLoading = false;
          this.addUserErrorMessage='';
          this.addUserResponseMessage = res["message"]
          this.addUserResponseStatus = true;
          this.addUserLoading = false;
            setTimeout(() => {
              this.addUM = false;
              //For cus name blur
              this.custName = true;
              this.getAllUsers();
              this.addUserResponseStatus = false;
              this.addUserErrorMessage='';
            }, 2000);
         
        } else {
          //For cus name blur
          this.custName = false;
          this.addUserResponseMessage = res["message"];
          this.addUserResponseStatus = true;
          this.addUserLoading = false;
        }
      }, error => {
        if(error.status == 500){
          this.router.navigate(['login']);
        }else{
          //For cus name blur
          this.custName = false;
          let errorMes = JSON.parse(error["_body"]);
          this.addUserErrorMessage = errorMes["message"];
          this.user.reset();
          //Remove all forms added
          let customerAndProductsArray = this.user.controls['customerAndProducts'] as FormArray;
          let formLength = customerAndProductsArray.value.length;
          var index
          for (index = formLength ; index >= 0; index--) {
            // Remove all but one occurrence and then add back only what the model dictates.
            this.removeCusProd(index);
          }
          this.addUserResponseStatus = false;
          this.addUserLoading = false;
        }
      })
    }else{
      this.addUserErrorMessage ="Please enter FullName."
      this.addUserResponseStatus = false;
      this.addUserLoading = false;
    }
   
  }

  

  activateUser() {
    if(this.getClickedUser.userId) {
      this.authService.activateOrDeactivateAPI(this.getClickedUser).subscribe((res) => {
          for(let index of this.userDetails) {
            if(index.userId == this.getClickedUser.userId) {
              index.isActive = !index.isActive
            }
          }
          if(this.getClickedUser.isActive == true) {
            this.closeDeactiveModal.nativeElement.click();
            this.getAllUsers();
          }else {
            this.closeActiveModal.nativeElement.click();
            this.getAllUsers();
          }
      },error => { 
        console.log("====error======",error)
        //for session expire
        if(error.status == 500){
          this.router.navigate(['login']);
        }
      });
    }
  }

  clearAllMessages(){
    this.addUserResponseMessage = '';
    this.addUserErrorMessage ='';
    this.addUserResponseStatus = false;
  }

}
