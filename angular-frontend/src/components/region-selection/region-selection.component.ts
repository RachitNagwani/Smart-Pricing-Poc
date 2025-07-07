import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-region-selection',
  standalone: true,
  imports: [CommonModule, HttpClientModule, UserPopupComponent],
  templateUrl: './region-selection.component.html',
  styleUrl: './region-selection.component.scss'
})
export class RegionSelectionComponent implements OnInit {
  markets:any = [];
  selectedMarket: any = 'USA';
  message:any ;
  jwtTokenMarket:any = 'Logged Out';
  users = [
    { id: 1, name: 'User 1 (India)' },
    { id: 2, name: 'User 2 (USA)' },
    { id: 3, name: 'User 3 (UK)' }
  ];
  showPopup = false;
  selecteduser:any;

  constructor(
    public service: ServiceService,
    private msalService: MsalService,
    private http: HttpClient,
    private router : Router
  ) {
    this.msalService.initialize().subscribe()
  }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigate(['/dashboard'])
    }
    else{
    this.getMarkets();
    this.service.setAccount();
    }
  }

  getToken(){
    this.service.getToken(this.selecteduser).subscribe({
      next:(response:any)=>{
        localStorage.setItem('token',response.token);
        this.jwtTokenMarket = response.assignedMarket;
        this.getUser();
      }
    })
  }

  getMarkets(){
    this.service.getMarkets().subscribe({
      next:(response:any)=>{
        this.markets = response
      }
    })
  }


  selectMarket(market: any) {
    localStorage.setItem('market', JSON.stringify(market))
    this.showPopup = true;
  }

  onUserSelected(user: any) {
    console.log('User selected:', user);
    this.selecteduser = user.id
    this.showPopup = false;
    if(!this.service.token) this.getToken();
    else this.getUser()
  }
  verify:any;
  verifyToken(){
    // this.service.verifyToken().subscribe({
    //   next:(response)=>{
    //     this.verify = response.verify
    //   }
    // })
    this.verify = true;
    if(this.verify) 
      {
        this.router.navigate(['/dashboard'])
      }
  }

  getUser() {
    this.service.getMarketInfo().subscribe({
      next:(response)=>{
        this.message = response
        this.verify = true;
        if(this.verify) 
          {
            this.router.navigate(['/dashboard'])
          }
      },
      error:(error:any)=>{
        this.message = error.error.error
        localStorage.clear()
        this.jwtTokenMarket = `Logged Out (${this.jwtTokenMarket})`;
        console.log(error)
      }
    })
  }

  logout(){
    localStorage.clear()
    this.jwtTokenMarket = 'Logged Out';
    this.message = undefined
  }

  getMarketFlag(){
    return localStorage.getItem('market')
  }

  getSelectedMarket(){
    const market = localStorage.getItem('market');
    const marketName = market ? JSON.parse(market)?.name : null;
    return marketName;
  }
}
