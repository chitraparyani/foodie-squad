import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormControl, Validators } from "@angular/forms";
import { EmailService } from '../services/email-service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;

  loading = false;
  buttionText = "Submit";
//Default String for mail, name and message
  email:String;
  name: String;
  message: String;

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);

  messageFormControl = new FormControl("",[
    Validators.required,
    Validators.minLength(10)
  ]);


  constructor(public http: EmailService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  //registering the information
  register() {
    this.loading = true;
    this.buttionText = "Submiting...";
    let user = {
      email:this.email,
      name: this.name,
      message: this.message
    }
    //Sending data to api from where the mail is dispactched.
    let emailTo = "foodiesquads@gmail.com";
    this.http.sendEmail("http://localhost:3000/api/sendMail", user).subscribe(
      data => {
        let res:any = data; 
        const message=`Email has been sent to 
        ${emailTo} succesfully. They will contact you soon.`;
        //Toast Generated
        this.snackBar.open(message, "Cancel", {
          duration: 2000,
        });
        console.log(message);
      },
      //Submit button
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      },() => {
        this.loading = false;
        this.buttionText = "Submit";
      }
    );
  }
}
