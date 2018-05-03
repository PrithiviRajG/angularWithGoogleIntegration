import { Component } from '@angular/core';
import {OAuth} from "./oauth";
import {LoginServiceService} from "./login-service.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
declare const gapi : any;
//reference - https://developers.google.com/identity/sign-in/web/build-button
//Backend Validation - https://developers.google.com/identity/sign-in/web/backend-auth
//stackoverflow reference - https://stackoverflow.com/questions/38846232/how-to-implement-signin-with-google-in-angular-2-using-typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  oauth : any;

  state : any;
  client_id  : any;
  response_type : any;
  scope : any;
  redirect_uri : any;
  access_token : any;
  token_type : any='token';
  locationURL : any;
  googleUser : any;

  constructor(public loginService : LoginServiceService, private activatedRoute: ActivatedRoute){
    this.oauth = new OAuth()
    this.activatedRoute.queryParams.subscribe(params => {
      this.state = params['state'];
      this.client_id  = params['client_id'];
      this.response_type = params['response'];
      this.scope = params['scope'];
      this.redirect_uri = params['redirect_uri'];
      
  });

  }

  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '887948310699-eo004dkpmerbq9gdh50pn81vdafj33vr.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        //YOUR CODE HERE
        this.loginService
      .googleLogin( googleUser.getAuthResponse().id_token.toString())
      .then(responseTO => {
         
          this.oauth = responseTO.oauth;
          console.log(this.oauth);
          this.access_token = this.oauth.access_token;
                   this.locationURL = `${this.redirect_uri}#state=${this.state}&access_token=${this.access_token}&token_type=${this.token_type}`;
                   console.log(`location URL is ${this.locationURL}`);
                   window.location.href=this.locationURL;
          
      })

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  

  ngAfterViewInit() {
    this.googleInit();
}

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log('Token || ' + googleUser.getAuthResponse().id_token);
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  

}
