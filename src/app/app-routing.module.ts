import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestListComponent } from './rest-list/rest-list.component';
import { RestDetailComponent } from './rest-detail/rest-detail.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserViewComponent } from './user-view/user-view.component';
import { ReviewCreateComponent } from './review/review-create/review-create.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'restDetail/:apiKey', component: RestDetailComponent},
  {path: 'restList/:searchText', component: RestListComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutComponent},
  {path: 'review', component: ReviewCreateComponent},
  { path: 'edit/:reviewId', component: ReviewCreateComponent },
  {path: 'login', component: UserLoginComponent},
  {path: 'userView', component : UserViewComponent},
  {path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
