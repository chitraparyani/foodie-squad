import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-rest-list',
  templateUrl: './rest-list.component.html',
  styleUrls: ['./rest-list.component.scss']
})
export class RestListComponent implements OnInit {

  // restaurant list array- need to make model class plus

  restaurants = '';
  restDelivery = '';
  restTakeout = '';
  restOrder = '';


  apiKey: string;


  isAlphabetical = false;
  isDelivery = false;
  isTakeout = false;

  isSearch = true;


  constructor(private httpClient: HttpClient, public restService: RestService, private route: ActivatedRoute, private router: Router) { }


delivery() {
 // var x = document.getElementById("delButton").value;
  this.isDelivery = true;
  this.isSearch = false;
  this.isTakeout = false;
  this.isAlphabetical = false;
  // this.restDelivery = this.restaurants.filter(
  //   restaurants => restaurants.offersDelivery === true);
  // console.log('Delivery Restaurants');
  // console.log(this.restDelivery);
}

takeout() {
  this.isTakeout = true;

  this.isSearch = false;
  this.isDelivery = false;
  this.isAlphabetical = false;

 // alert('hello');
  // this.restTakeout = this.restaurants.filter(
  //   restaurants => restaurants.offersPickup === true);
  // console.log('Takeout Restaurants');
  // console.log(this.restTakeout);
}


order() {
  // var x = document.getElementById("delButton").value;
   this.isAlphabetical = true;

   this.isSearch = false;
   this.isTakeout = false;
   this.isDelivery = false;

   // alert('hello');
   //this.restOrder = this.transform(this.restaurants, 'streetAddress');
   console.log('Alphabetical Restaurants');
   console.log(this.restOrder);


 }

 transform(array: any, field: string): any[] {
  if (!array) {
      return array;
  }
  array.sort((a: any, b: any) => {
      if ((a[field] || '').toLowerCase() < (b[field] || '').toLowerCase()) {
          return -1;
      } else if ((a[field] || '').toLowerCase() > (b[field] || '').toLowerCase()) {
          return 1;
      } else {
          return 0;
      }
  });
  return array;
}


  ngOnInit() {
    this.isSearch = true;
    // this.searchText = this.restService.getRestList();
    this.route.params.subscribe(params => {
      this.httpClient.get('http://localhost:3000/restList?searchText=' + params.searchText)
        .subscribe(data => {
         this.restaurants = JSON.parse(JSON.stringify(data)).restaurants;
         console.log(this.restaurants);
        });
    });


  }

  restaurantDetails(apiKey) {
   //  alert('restaurant details');
   // alert(apiKey);
   // this.restService.onSearch(apiKey);
    this.router.navigate(['/restDetail', apiKey]);
  }
}

