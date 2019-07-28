import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   userName: String;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

     this.userService.getLoggedInUser()==null?this.userName = 'User': this.userName=this.userService.getLoggedInUser().fname;
  }

  userButton() {
    console.log('adssad');
    const user: User = this.userService.getLoggedInUser();
    if (user != null) {
      this.userName = user.fname;
      this.router.navigate(['/userView']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  checkUser() {
    if (this.userService.getLoggedInUser() != null) { 
      this.userName = this.userService.getLoggedInUser().fname;
      return true; 
      
    }
    else {
    

    return false;
    }
  }

  logOut() {
    sessionStorage.removeItem('user');
    this.userName = 'User';
    this.router.navigate(['/login']);

  }

}
