import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Subject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from './../../environments/environment';
import { User } from '../models/User';


@Injectable ({providedIn: 'root'})
export class UserService {
    userResource: string;
    userResourceURL: string;
    loginResourceURL =`http://localhost:3000/api/login`;
    userLogged:User;


    constructor(private http: HttpClient){
        this.userResource ='api/users';
        this.userResourceURL=`http://localhost:3000/${this.userResource}`;
    }
    // returning user list in the form of an Array of observable
    getUsers() : Observable<Array<User>>{
        return this.http.get<Array<User>>(this.userResourceURL);
    }
    // creating user and saving into db
    createUsers(user: User) : Observable<User>{
        return this.http.post<User>(this.userResourceURL,user);
    }

    findUser(email:string, password: string) : Observable<User>{
        const options={
            email:email,
            password:password
        };
        return this.http.post<User>(this.loginResourceURL,options);
    }

    getLoggedInUser() :User{
        const user:User=JSON.parse(sessionStorage.getItem("user"));
        this.userLogged =user;
        return user;
    }

    saveUserInSession(user: User){
        sessionStorage.setItem("user",JSON.stringify(user));
    }

    getUserById(userId:string) : Observable<User>{
        return this.http.get<User>(this.userResourceURL+"/"+userId);
    }
}
