import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'region_frontend';

  constructor(private router : Router){
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.handleRoutingLogic();
    });
  }

  handleRoutingLogic() {
    const token = localStorage.getItem('token');
    const market = localStorage.getItem('market');
    const currentUrl = this.router.url;

    if (!token) {
      this.router.navigate(['/']);
    } else if (token && !market && currentUrl !== '/market-selection') {
      this.router.navigate(['/market-selection']);
    } else if (token && market && (currentUrl === '/' || currentUrl === '/market-selection')) {
      this.router.navigate(['/dashboard']);
    }
  }
}
