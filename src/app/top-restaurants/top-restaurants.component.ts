import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-restaurants',
  templateUrl: './top-restaurants.component.html',
  styleUrls: ['./top-restaurants.component.scss']
})
export class TopRestaurantsComponent implements OnInit {
  @Input('restaurant') private currRestaurant: any;
  constructor() { }

  ngOnInit() {
    console.log(this.currRestaurant);
  }

}
