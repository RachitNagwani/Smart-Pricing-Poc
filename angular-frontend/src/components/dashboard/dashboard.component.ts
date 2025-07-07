import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user: any;
  market: any;
  foodItems:any = [];
  marketId: any;

  constructor(public service: ServiceService, private router: Router) {}

  ngOnInit() {
    this.user = {name:'Rachit', email:'rachit@gmail.com'}
    const market = localStorage.getItem('market');
    const marketName = market ? JSON.parse(market)?.name : null;
    const marketId = market ? JSON.parse(market)?.id : null;
    this.market = marketName;
    this.marketId = marketId;
    this.getItemDetails();
  }

  logout() {
    localStorage.clear(); // or sessionStorage.clear() if you use that
    this.router.navigate(['/']); // navigate to login or home
  }

  getItemDetails(){
    this.service.getItemDetail().subscribe({
      next:(response:any)=>{
        this.foodItems = response;
      },
      error:(response:any)=>{
        if(response.status == 401){
          this.logout();
        }
      }
    })
  }
}
