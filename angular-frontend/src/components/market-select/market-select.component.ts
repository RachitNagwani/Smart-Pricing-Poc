import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-market-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './market-select.component.html',
  styleUrl: './market-select.component.scss'
})
export class MarketSelectComponent {
  markets = ['US', 'UK', 'India', 'Canada', 'Germany'];
  selectedMarket = ''
  
  constructor(private router : Router, private sevice: ServiceService){
    if(!localStorage.getItem('token'))
    {
      this.router.navigate(['/'])
    }
    else{
      const token:any = localStorage.getItem('token')
      const tokenObject:any = jwtDecode(token)
      console.log(tokenObject)
      this.markets = tokenObject.market
      if(this.markets.length == 1){
        localStorage.setItem('market', this.markets[0])
        this.router.navigate(['/scenario-list'])
      }
    }
  }

  onSubmit() {
    localStorage.setItem('market', this.selectedMarket)
    this.router.navigate(['/scenario-list'])
  }

  onLogout(){
    this.sevice.logout();
  }
}
