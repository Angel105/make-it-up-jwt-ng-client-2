import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:9192";

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpclient: HttpClient,
              private userAuthService: UserAuthService) { }

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + "/authenticate", loginData, { headers: this.requestHeader});
  }


  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {responseType: "text"});
  }

  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {responseType: "text"});
  }


  public roleMatch(allowedRoles: string | any[]) : boolean {
    let isMatched = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {

        for (let j = 0; j < allowedRoles.length; j++) {
            if (userRoles[i].roleName === allowedRoles[j]) {
              isMatched = true;
              return isMatched;
            }

            else { //TODO: I think it's a bull
              return isMatched;
            }
        }

      }
    }

    return isMatched; //TODO: I have added this
  }
}
