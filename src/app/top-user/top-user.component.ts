import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-top-user',
  templateUrl: './top-user.component.html',
  styleUrls: ['./top-user.component.scss']
})
export class TopUserComponent implements OnInit {
  @Input('user') private currUser:User;
  constructor() { }

  ngOnInit() {
  }

}
