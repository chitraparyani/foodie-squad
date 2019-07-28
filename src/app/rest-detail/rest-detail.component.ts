import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RestService } from '../services/rest.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Injectable, Pipe } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import {MatSnackBar} from '@angular/material';
import { AgmCoreModule } from '@agm/core';

// tslint:disable-next-line: use-pipe-transform-interface
@Pipe({
  name: 'keyobject'
})

@Component({
  selector: 'app-rest-detail',
  templateUrl: './rest-detail.component.html',
  styleUrls: ['./rest-detail.component.scss']
})
export class RestDetailComponent implements OnInit {

 // data: Array<any>;
 userLogged: User;
 isAddReview = false;
  menus: Array<any>;
  restaurant = '';
  apiKey: String;
  hours = '';
  // searchString: string;
  constructor(private httpClient: HttpClient, public restService: RestService, public router: Router, private route: ActivatedRoute, public userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
   // this.addReviewButton();
  // this.isAddReview = this.restService.getIsAddreview();
   console.log(typeof(this.menus));
   this.userLogged = this.userService.getLoggedInUser();

   this.route.params.subscribe(params => {
    // alert(params['apiKey']);
    this.restService.setRestId(params.apiKey);
    this.httpClient.get('http://localhost:3000/menu?apiKey=' + params.apiKey)
      .subscribe(data => {
      //  var res = data;
        this.menus = JSON.parse(JSON.stringify(data));
        this.restService.setMenus(this.menus);
        console.log( this.restService.getMenus());


        // this.items = this.menus.items;

      });
});

   this.route.params.subscribe(params => {
  // alert(params['apiKey']);
  this.restService.setRestId(params.apiKey);
  this.httpClient.get('http://localhost:3000/restaurant?apiKey=' + params.apiKey)
    .subscribe(data => {
    //  var res = data;
      this.restaurant = JSON.parse(JSON.stringify(data)).restaurant;
      this.restService.setRestaurant(this.restaurant);
      // console.log( this.restService.getRestaurant());
      // console.log(this.restService.getRestaurant());
      console.log(this.restaurant);
      // this.items = this.menus.items;
      this.hours = JSON.parse(JSON.stringify(data)).restaurant.hours;
      console.log(this.hours);


    });
});



// console.log( this.restService.getRestaurant());
}
addReviewButton() {
  if (this.userLogged == undefined) {
    this.snackBar.open('Can not add review without logging in', 'Cancel', {
      duration: 2000,
    });
    this.router.navigate(['/login']);
    return;
  }
  this.restService.setIsAddreview();
  this.isAddReview = this.restService.getIsAddreview();
 // this.restService.setIsAddreview();
 // this.router.navigate(['/review']);
}

open(evt, name) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(name).style.display = 'block';
  evt.currentTarget.className += ' active';
}



}
