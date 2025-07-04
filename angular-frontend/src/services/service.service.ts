import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from './../environments/environment';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  market: any;
  api_url = `${ENV.API_ENDPOINT}`;
  token: any;
  constructor( private http: HttpClient, private msalService: MsalService,) { }



  getMarkets(){
    return this.http.get(this.api_url + 'markets')
  }

  setAccount(){
    this.msalService.instance.handleRedirectPromise().then(result => {
      if (result && result.account) {
        this.msalService.instance.setActiveAccount(result.account);
      } else {
        const accounts = this.msalService.instance.getAllAccounts();
        if (accounts.length > 0) {
          this.msalService.instance.setActiveAccount(accounts[0]);
        }
      }
    });
  }

  getUser(){
    return this.http.get(this.api_url + 'api/user')
  }

  getMarketInfo(){
    return this.http.get(this.api_url + 'api/market')
  }

  getToken(user:any){
    return this.http.post(this.api_url + 'getToken', {user:user})
  }
}
