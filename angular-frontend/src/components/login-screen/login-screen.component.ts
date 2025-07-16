import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_encode from 'jwt-encode';

@Component({
  selector: 'app-login-screen',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent {
  email:any = '';
  password = '';
  availableMarkets = ['India', 'UK'];
  SECRET_KEY = 'my_super_secret_key';

  constructor(private router : Router){

  }

  onLogin() {
    const tokenData = this.generateToken();
    console.log(tokenData)
    localStorage.setItem('token',tokenData.token);
    this.router.navigate(['/market-selection'])
  }

  getMarketByUser() {
    // return this.availableMarkets[Math.floor(Math.random() * this.availableMarkets.length)]

    if (this.email == 'rachit.nagwani@costacoffee.com') {
      return [this.availableMarkets[0]]
    }
    if (this.email == 'gautam.paul@costacoffee.com') {
      return [this.availableMarkets[1]]
    }
    if (this.email == 'harish.arumugam@costacoffee.com') {
      return this.availableMarkets
    }

    const shuffled = [...this.availableMarkets].sort(() => 0.5 - Math.random());
    const randomCount = Math.floor(Math.random() * this.availableMarkets.length) + 1;
    return shuffled.slice(0, randomCount);
  }
  
  generateToken(): { token: string, assignedMarket: any } {
    const market = this.getMarketByUser()
    const payload = {
      userId: this.email,
      market: market,
      iss: 'angular',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // expires in 1 hour
    };
  
    const token = jwt_encode(payload, this.SECRET_KEY);
  
    return {
      token,
      assignedMarket: market
    };
  }
}
