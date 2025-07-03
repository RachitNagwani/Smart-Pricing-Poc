import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-region-selection',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './region-selection.component.html',
  styleUrl: './region-selection.component.scss'
})
export class RegionSelectionComponent implements OnInit {
  markets:any = [];
  selectedMarket: any = 'USA';
  message:any ;
  jwtTokenMarket:any = 'Logged Out';

  constructor(
    private service: ServiceService,
    private msalService: MsalService,
    private http: HttpClient
  ) {
    this.msalService.initialize().subscribe()
  }

  ngOnInit() {
    this.getMarkets();
    this.service.setAccount();
  }

  getToken(){
    this.service.getToken().subscribe({
      next:(response:any)=>{
        this.service.token = response.token;
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
    this.service.market = market;
    // const accounts = this.msalService.instance.getAllAccounts();
    // if (accounts.length === 0) {
    //   this.msalService.loginRedirect();
    // }
    // else{
    //   this.getUser();
    // }
    if(!this.service.token) this.getToken();
    else this.getUser()
  }

  getUser() {
    this.service.getMarketInfo().subscribe({
      next:(response)=>{
        this.message = response
      },
      error:(error:any)=>{
        this.message = error.error.error
        console.log(error)
      }
    })
  }

  logout(){
    this.service.token = undefined;
    this.jwtTokenMarket = 'Logged Out';
    this.message = undefined
  }
}
