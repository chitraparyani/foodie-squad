import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  lastScrollTop:Number=0;
  scale=1;
  background=document.getElementById("background");

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

// Background image scrolling effect
  scroll = (event): void => {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    const background=document.getElementById("background");
    if(st>this.lastScrollTop){
    // console.log("DOWN");
    this.scale+=0.005;
    }else{
    if(this.scale<1.05) return;
    this.scale-=0.005;
    // console.log("UP");
    }
    background.style.transform=`scale(${this.scale})`;
    this.lastScrollTop=st;
    //handle your scroll here
    //notice the 'odd' function assignment to a class field
    //this is used to be able to remove the event listener
  };

  ngOnDestroy(){
    window.removeEventListener('scroll', this.scroll, true);
  }


}
