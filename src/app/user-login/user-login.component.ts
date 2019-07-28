import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
// Importing necessary modules and Services to the Component

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  // Each field has its own Form Control handling Errors
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('',[
    Validators.required
  ])

  fnameFormControl = new FormControl('',[
    Validators.required
  ])

  lnameFormControl = new FormControl('',[
    Validators.required
  ])

  signInpasswordFormControl = new FormControl('',[
    Validators.required
  ])

  signInemailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);


  phoneFormControl = new FormControl('',[
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('[0-9]+')
    //Phone validation to be added
  ])

  matcher = new MyErrorStateMatcher();

  isSignUp = false;
  public loginEmail:string;
  public loginPassword:string;
  public signUpFName:string;
  public signUpLName:string;
  public signUpEmail:string;
  public signUpPassword:string;
  public signUpPhone:string;

  signUpButtonClick(){
  this.isSignUp = true;

  }

  signInButtonClick(){
    this.isSignUp = false;
  }
  signInUser(){
    if(this.signInemailFormControl.invalid || this.signInpasswordFormControl.invalid){
      console.log("Sign In Error");
      return;
    }
    const email:string=this.loginEmail;
    const password:string=this.loginPassword;
    const user:Observable<User> =this.userService.findUser(email,password);
    user.subscribe((data)=>{
      console.log(data);
      if(data==null){
        this.signInemailFormControl.setErrors({'incorrect':true});
        this.signInpasswordFormControl.setErrors({'incorrect':true});
      }else{
        this.userService.saveUserInSession(data);
        this.router.navigate(["/userView"]);
      }

    })
  }

  signUpUser(){

    if(this.fnameFormControl.invalid || this.lnameFormControl.invalid || this.emailFormControl.invalid || this.passwordFormControl.invalid || this.phoneFormControl.invalid){
      console.log("Error !!");
      return;
    }
    const fname:string=this.signUpFName;
    const lname:string=this.signUpLName;
    const email:string=this.signUpEmail;
    const password:string=this.signUpPassword;
    const phone:Number=parseInt(this.signUpPhone);
    const u:User=new User(fname,lname,password,phone,email);

    const userCreated:Observable<User>=this.userService.createUsers(u);
    userCreated.subscribe((data)=>{
      if(data!=null){
        this.isSignUp=false;
        this.loginEmail="";
        this.loginPassword="";

        this.dialog.open(SignUpFormDailog);
        console.log(data);
      }

    })
  }
    constructor(private userService:UserService,private router: Router,public dialog: MatDialog) { }

    ngOnInit() {
    }

}

@Component({
  selector: 'sign-up-form-dialog',
  template: '<p>User Created Succesfully ! Kindly Login Again</p>',
})
export class SignUpFormDailog {
  constructor() {}
}
