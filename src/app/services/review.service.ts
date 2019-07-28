import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Review } from '../models/Review';
import { RestService } from './rest.service';


@Injectable ({providedIn: 'root'})
export class ReviewService {
  private reviews: Review[] = [];
  private reviewsUpdated = new Subject<{ reviews: Review[], postCount: number}>();
  private maxPost;


  constructor(private http: HttpClient, private router: Router, public restService: RestService) {}

  getReviews(postsPerPage: number, currentPage: number, restId: string, userId: string) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}&restId=${restId}&userId=${userId}`;
    console.log(queryParams);
    this.http
    .get<{ message: string; reviews: any, maxPosts: number }>("http://localhost:3000/api/reviews" + queryParams)
    .pipe(map((reviewData) => {
      return { reviews: reviewData.reviews.map((review) => {
        return {
          title: review.title,
          content: review.content,
          id: review._id,
          userId: review.userId,
          userName:review.userName,
          restId: review.restId,
          rating: review.rating
        };
      }), maxPosts: reviewData.maxPosts
    };
  }))
    .subscribe(transformedReviewsData => {
      this.reviews = transformedReviewsData.reviews;
      this.reviewsUpdated.next({reviews: [...this.reviews], postCount: transformedReviewsData.maxPosts});
    });
  }

  getReviewUpdateListener() {
    return this.reviewsUpdated.asObservable();
  }

  getReview(id: string) {
    return this.http.get<{ _id: string; title: string; content: string, userId: string,userName: string, restId: string, rating: number }>(
      "http://localhost:3000/api/reviews/" + id
    );
  }

  addReview(title: string, content: string, userId: string,userName: string, restId: string, rating: number) {
    const review: Review = {id: null, title: title, content: content, userId:userId,userName:userName, restId: restId, rating:rating};
    this.http
    .post<{ message: string; reviewId: string}>(
      "http://localhost:3000/api/reviews",
      review
    )
    .subscribe(responseData => {
      const id = responseData.reviewId;
      review.id = id;
      this.reviews.push(review);
      this.reviewsUpdated.next({reviews: [...this.reviews], postCount: this.reviews.length});
      //this.router.navigate(["/review"]);
     // this.router.navigate(['/restDetail', this.restService.getRestList]);

    });
  }

  updateReview(id: string, title: string, content: string, userId: string,userName:string, restId: string, rating: number) {
    const review: Review = { id: id, title: title, content: content, userId: userId,userName:userName, restId: restId, rating:rating };
    this.http
      .put("http://localhost:3000/api/reviews/" + id, review)
      .subscribe(response => {
         const updatedReviews = [...this.reviews];
         const oldReviewIndex = updatedReviews.findIndex(p => p.id === review.id);
         updatedReviews[oldReviewIndex] = review;
         this.reviews = updatedReviews;
         this.reviewsUpdated.next({reviews: [...this.reviews], postCount: this.reviews.length});

      });
  }

  deleteReview(reviewId: string) {
    return this.http.delete('http://localhost:3000/api/reviews/' + reviewId);
    // this.http
    //   .delete("http://localhost:3000/api/reviews/" + reviewId)
    //   .subscribe(() => {
    //     const updatedReviews = this.reviews.filter(review => review.id !== reviewId);
    //     this.reviews = updatedReviews;
    //     this.reviewsUpdated.next([...this.reviews]);
    //   });
  }

  getAllReviews(){
    return this.http.get<Observable<Object>>("http://localhost:3000/api/reviews/");
  }
}
