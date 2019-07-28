import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/Review';
import { RestService } from 'src/app/services/rest.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.scss']
})
export class ReviewCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  review: Review;
  isLoading = false;
  private mode = 'create';
  private reviewId: string;
  authKey: string;
  apiKey: string;
  userLogged: User;

// tslint:disable-next-line: max-line-length
  constructor(public reviewService: ReviewService, private route: ActivatedRoute, public router: Router,  public restService: RestService, public userService: UserService) {}

  ngOnInit() {

    // getting rest id from service that will be used later on to add reviews
    this.authKey = this.restService.getRestId();
    this.userLogged = this.userService.getLoggedInUser();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('reviewId')) {
        this.mode = 'edit';
        this.reviewId = paramMap.get('reviewId');
        this.isLoading = true;
        this.reviewService.getReview(this.reviewId).subscribe(reviewData => {
       this.isLoading = false;
       this.review = {id: reviewData._id, title: reviewData.title, content: reviewData.content, userId: reviewData.userId, userName: reviewData.userName, restId: reviewData.restId, rating: reviewData.rating};
        });
      } else {
        this.mode = 'create';
        this.reviewId = null;
      }
    });
  }

  // cancel the add review panel
  cancelButton() {
    this.restService.setIsAddreview();
    this.router.navigate(['/restDetail', this.authKey]);
  }

  onSaveReview(form: NgForm) {
    // checking if the user is logged in
    // user will not be able to add review without logging in
    if (this.userLogged == undefined) {
      alert('Can not add review without logging in');
      return;
    }

    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.reviewService.addReview(form.value.title, form.value.content, this.userLogged._id, this.userLogged.fname +' '+ this.userLogged.lname, this.authKey,  form.value.rate);
    } else {
      this.reviewService.updateReview(
        this.reviewId,
        form.value.title,
        form.value.content,
        this.userLogged._id,
        this.userLogged.fname +' '+ this.userLogged.lname,
        this.authKey,
        form.value.rate
      );
    }
    form.resetForm();
    this.isLoading = false;
    if (this.mode !== 'create') {
      this.router.navigate(['/userView']);

    } else {
      this.router.navigate(['/restDetail', this.authKey]);

    }

  }

}
