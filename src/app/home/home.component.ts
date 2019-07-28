import { Component, OnInit,Inject } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';
import { Subject, Observable } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { IgxOverlayService } from "igniteui-angular";
import {OverlayCardComponent} from "../overlay-card/overlay-card.component"
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { ReviewService } from '../services/review.service';
import { Review } from '../models/Review';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

// Imported all necessary models and services

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private destroy$ = new Subject<boolean>();
  private _overlayId: string;
  private allReviews: Array<Review>;
  private top5RestaurantsArray: Array<any> = new Array();
  private top5UsersArray:Array<User> = new Array();

  // Constructor for injecting all Services and Dailogs
  constructor(private httpClient: HttpClient,public dailog:MatDialog, private userService: UserService, private reviewService:ReviewService, public restService: RestService, private router : Router, @Inject(IgxOverlayService) public overlayService: IgxOverlayService ) {
    this.overlayService
    .onClosed
    .pipe(
        filter((x) => x.id === this._overlayId),
        takeUntil(this.destroy$))
    .subscribe(() => delete this._overlayId);
  }

  searchText:string;

  ngOnInit() {
    // retrieves the top5 users and restaurants
    this.top5Common();
  }
  onSearch(searchText) {
      // On searching redirects to another page with all data
       this.restService.onSearch(searchText);
    //  this.router.navigate(['/searchRest',searchText])
  }

  // This helper method sorts the restaurants and users based on the number of ratings
  helper(array, filter){
    let y={};
    for(const x in array){
      const currentReview=array[x];
      if(y[currentReview[filter]]==null){
        y[currentReview[filter]]=1;
      }else{
        y[currentReview[filter]]=y[currentReview[filter]]+1;
      }
    }
    var sortable=[];
    for(var curr in y){
      sortable.push([curr, y[curr]]);
    }
    sortable.sort((a, b)=>{
      return b[1]-a[1];
    });

    var finalArr=[];
    // Extracts only top 5 Users or Restaurants
    if(sortable.length>3){
      for(var i=0;i<3;i++){
        finalArr.push(sortable[i]);
      }
      return finalArr;
    }

    return sortable;
  }
  top5Common(){
    // A common Method to extract Top 5 Users and Restaurants based on the number of reviews recieved and sent
    let reviews:Observable<Object>=this.reviewService.getAllReviews();
    this.top5UsersArray=new Array();
    this.top5RestaurantsArray=new Array();
    reviews.subscribe((data)=>{
      this.allReviews=data["reviews"];
      const top5Rest=this.helper(this.allReviews,"restId");
      const top5Users=this.helper(this.allReviews,"userId");

      // console.log(top5Users);
      Object.keys(top5Users).forEach((curr)=>{
        this.userService.getUserById(top5Users[curr][0]).subscribe((data)=>{
          this.top5UsersArray.push(data);
        });
      })
      // console.log(top5Rest);
      Object.keys(top5Rest).forEach((curr)=>{
        this.getRestaurant(top5Rest[curr][0]);
      })
    })
  }

  // Gets the restaurant and adds it into an array to bind to UI
  getRestaurant(apiKey){

    this.httpClient.get('http://localhost:3000/restaurant?apiKey=' + apiKey)
      .subscribe(data => {
        const restaurant = JSON.parse(JSON.stringify(data)).restaurant;
        // console.log(restaurant);
        this.top5RestaurantsArray.push(restaurant);
      });
  }

  // On clicking of Restaurant displays an Overlay
  public showOverlay(item) {
    const dataModal=item;
    this.dailog.open(OverlayDailog,{
      data: dataModal,
      width: "500px"
    });
  }
}

// This extra component is for displaying the Dailog
@Component({
  selector: 'details-dialog',
  template: '<div><agm-map id="map" [zoom]="15.0" [latitude]="data.latitude" [longitude]="data.longitude"><agm-marker [latitude]="data.latitude" [longitude]="data.longitude"></agm-marker></agm-map><p>{{data.streetAddress}}</p><p>{{data.city}}</p></div>',
  styles:['agm-map{height: 300px;margin: 10 10 10 10;} p{text-align:center; margin: 0; margin-top:10px;}']
})
export class OverlayDailog {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}
}
