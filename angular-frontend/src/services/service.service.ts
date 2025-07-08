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

  currencySymbol:any ={
    1:'₹',
    2:'$',
    3: '£'
  }

  getCurrencySymbol(currency: string): string {
    switch (currency.toLowerCase()) {
      case 'rupees':
        return '₹';
      case 'euro':
        return '€';
      case 'dollar':
        return '$';
      default:
       return '€'; 
  }
}

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

  verifyToken(){
    return this.http.get(this.api_url + 'api')
  }

  getToken(user:any){
    return this.http.post(this.api_url + 'getToken', {user:user})
  }

  getItemDetail(){
    return this.http.get(this.api_url + 'api/item')
  }
}
