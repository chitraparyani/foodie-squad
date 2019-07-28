import { Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Subscription
} from 'rxjs';
import {
  Review
} from 'src/app/models/Review';
import {
  ReviewService
} from 'src/app/services/review.service';
import {
  PageEvent
} from '@angular/material';
import {
  RestService
} from 'src/app/services/rest.service';
import {
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit, OnDestroy {

  reviews: Review[] = [];
  isLoading = false;
  private reviewsSub: Subscription;
  numArray;

  totalPosts = 0; // total post by user
  postsPerPage = 3; // the posts per page to show during pagination
  pageSizeOption = [1, 2, 3, 4, 5, 10]; // options available to user to show posts
  currentPage = 1; // starting page
  restId: any;
  param = '';
  userId: any;
  userLogged: User;
  isEdit = false;
  QueryUserId = '';
  QueryRestId = '';

// tslint:disable-next-line: max-line-length
  constructor(public reviewService: ReviewService, public restService: RestService, private route: ActivatedRoute, public userService: UserService) {}

  ngOnInit() {
    // to check if the user is logged in and saving the logged in user
  this.userLogged = this.userService.getLoggedInUser();
  this.route.params.subscribe(params => {
      this.param = params.apiKey;
    });
  this.isLoading = true;
  if (this.param == undefined) {
    this.isEdit = true;
    this.QueryUserId = this.userLogged._id;
    this.QueryRestId = 'none';
  } else {
    this.isEdit = false;
    this.QueryUserId = 'none';
    this.QueryRestId = this.param;

  }

  // getting all the reviews filtered by restaurant id and saving them

  this.reviewService.getReviews(this.postsPerPage, this.currentPage, this.QueryRestId, this.QueryUserId);
  this.reviewsSub = this.reviewService.getReviewUpdateListener()
      .subscribe((reviewData: {
        reviews: Review[],
        postCount: number
      }) => {
        this.isLoading = false;
        this.reviews = reviewData.reviews;
        this.totalPosts = reviewData.postCount;
      });

  console.log(this.reviews.length);

  }

  // delete review function
  onDelete(reviewId: string) {

    this.reviewService.deleteReview(reviewId).subscribe(() => {
      this.reviewService.getReviews(this.postsPerPage, this.currentPage, this.QueryRestId, this.QueryUserId);
    });
    this.ngOnInit();
  }

  // function to load next batch of reviews in pagination whenever user selects any options
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.reviewService.getReviews(this.postsPerPage, this.currentPage, this.QueryRestId, this.QueryUserId);
  }

  fillArray(length: number) {
    this.numArray = new Array<number>();
    for ( let i = 0; i < length; i++) {
      this.numArray.push(i);
    }


    return this.numArray;
  }

  ngOnDestroy() {
    this.reviewsSub.unsubscribe();
  }

}
