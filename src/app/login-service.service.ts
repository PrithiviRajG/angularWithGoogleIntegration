import { Injectable } from '@angular/core';
import {Headers, Http, URLSearchParams, RequestOptionsArgs, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginServiceService {

  constructor(public http : Http) { }

  googleLogin(idToken:String):Promise<any> {
    let params:URLSearchParams = new URLSearchParams();
    let headersvar = new Headers();

let faculty : string = "verbalyn";

params.set('idTokens', idToken.toString());
params.set('facultyCode',faculty.toString());

  params.set('examId','4');



  let requestOption:RequestOptionsArgs = {search: params, headers: headersvar};

  return this.http
    .get('http://www.learnvant.com/DrillWebServiceV1/googleSignIn', requestOption)
    .toPromise()
    .then(this.extractData)



}

public extractData(res:Response) {
  let body = res.json();
  
  return body;
}

}
