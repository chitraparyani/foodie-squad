import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {Image} from '../models/Image';
import { ImageService } from '../services/image.service';
import { mimeType } from './mime-type.validator';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  user: User;
  image: Image;
  isLoading = false;
  form: FormGroup;
  imagePreview: string | ArrayBuffer;
  imagePath = 'none';
  isPreview = false;


  constructor(private userService: UserService, private router: Router, public imageService: ImageService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.userService.getLoggedInUser();
    if (this.user == null) {
      this.router.navigate(['/login']);
    }

    // this is the part where we get the image of the user from the server
    // it will get he image path and will show the image
    this.imageService.getImage(this.user._id).subscribe((res) => {
      if (res.length > 0) {
      this.image = res[0];
      this.imagePath = this.image.imagePath;
      }
      console.log(res);
      console.log(this.imagePath);
    });

    // initializing the form object and also using validator- mime type to validate the image
    this.form = new FormGroup({
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });

    // if the image is not present for then it will show a dummy image
    if (this.imagePath === 'none') {
      this.imagePath = 'https://www.w3schools.com/howto/img_avatar.png';
    }


  }

  // on saving the image it will be checked if the user is uploading the image for the first time
  // or updating the image.
  // Depending on that create and update function will be called

  onSavePost() {
    this.isLoading = true;

    if (this.form.invalid) {return; }
    if (this.imagePath === 'https://www.w3schools.com/howto/img_avatar.png') {
      this.imageService.addImages(this.user._id, this.form.value.image);
      this.snackBar.open("Image successfully Upload!", "Cancel", {
        duration: 2000,
      });
    } else {
      this.imageService.updateImage(this.image._id, this.user._id, this.form.value.image);
      this.snackBar.open("Image successfully Updated!", "Cancel", {
        duration: 2000,
      });

    }
    this.form.reset();
    this.isLoading = false;

    this.ngOnInit();
    this.isPreview = false;
  }

  // the image picked function will read the image uploaded by user and will validate it first
  // after upload it will save it in the file object and will be later on used to save in the DB
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
    this.isPreview = true;
  }



  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
      };
    }
  }

}
