import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// rest services for restaurant

@Injectable ({providedIn: 'root'})
export class RestService {
  private searchText: string;
  private restId: string;
  private menus: Array<any>;
  private isAddReview = false;
  private restaurant : string;
  constructor(private router: Router) {}

  onSearch(searchText: string) {
    this.searchText = searchText;
    // method to list all the restaurants
    this.router.navigate(['/restList', searchText]);
  }

  getRestList() {
    return this.searchText;
  }

  setRestId(restId: string) {
    this.restId = restId;
  }

  getRestId() {
    return this.restId;
  }

  setMenus(menus: Array<any>) {
    this.menus = menus;
}

getMenus() {
  return this.menus;
}

setIsAddreview() {
  this.isAddReview = this.isAddReview ? false:true;
}

getIsAddreview() {
  return this.isAddReview;
}

setRestaurant(restaurant : string) {
  this.restaurant = restaurant;
}

getRestaurant(){
  return this.restaurant;
}

}
