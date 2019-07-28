import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable ({providedIn: 'root'})
export class EmailService{

  test = "How r u?";
  constructor(private http: HttpClient) {}

  httpGet(url) {
    return this.http.get(url);
  }

  httpPost(url, {}) {
    return this.http.post(url, { name: "Subrat" });
  }

  sendEmail(url, data) {
    console.log("Service "+data);

    return this.http.post(url, data);
  }

}
