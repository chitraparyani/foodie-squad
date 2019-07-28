import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RestListComponent } from './rest-list/rest-list.component';
import { RestDetailComponent } from './rest-detail/rest-detail.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {InfiniteScrollModule} from "ngx-infinite-scroll";

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSnackBarModule
} from '@angular/material';

import {
	IgxIconModule,
	IgxOverlayService,
	IgxSwitchModule,
	IgxCardModule,
	IgxButtonDirective
 } from "igniteui-angular";

import { TopRestaurantsComponent } from './top-restaurants/top-restaurants.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { TopUserComponent } from './top-user/top-user.component';
import { ReviewCreateComponent } from './review/review-create/review-create.component';
import { ReviewListComponent } from './review/review-list/review-list.component';
import { OverlayCardComponent } from './overlay-card/overlay-card.component';
import { FooterComponent } from './footer/footer.component';
import {SignUpFormDailog} from './user-login/user-login.component';
import { EmailService } from './services/email-service';
import {OverlayDailog} from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestListComponent,
    RestDetailComponent,
    ContactComponent,
    AboutComponent,
    UserLoginComponent,
    TopRestaurantsComponent,
    UserViewComponent,
    TopUserComponent,
    ReviewCreateComponent,
    ReviewListComponent,
    OverlayCardComponent,
    FooterComponent,
    SignUpFormDailog,
    OverlayDailog
  ],
  entryComponents: [OverlayCardComponent, SignUpFormDailog, OverlayDailog],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatPaginatorModule,
    InfiniteScrollModule,
    AgmCoreModule.forRoot({
      apiKey: 'GOOGLEMAPS_API_KEY'
    }),
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [UserService,IgxOverlayService, EmailService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
