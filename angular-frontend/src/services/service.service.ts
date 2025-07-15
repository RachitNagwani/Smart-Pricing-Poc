import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from './../environments/environment';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  market: any;
  api_url = `${ENV.API_ENDPOINT}`;
  token: any;
  constructor( private http: HttpClient, private msalService: MsalService, private router : Router) { }

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
    return this.http.get(this.api_url + 'api/market')
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

  logout(){
    localStorage.clear(); // or sessionStorage.clear() if you use that
    this.router.navigate(['/']); // navigate to login or home
  }

  getScenario(){
    return this.http.get(this.api_url + 'api/scenarios')
  }

  deleteScenario(body:any){
    return this.http.post(this.api_url + 'api/delete_scenario', body)
  }

  createScenario(body:any){
    return this.http.post(this.api_url + 'api/create_scenario', body)
  }

  getScenarioDetails(body:any){
    return this.http.post(this.api_url + 'api/get_scenario', body)
  }

  updateScenario(body:any){
    return this.http.post(this.api_url + 'api/update_scenario', body)
  }
}
