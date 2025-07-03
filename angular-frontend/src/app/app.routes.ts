import { Routes } from '@angular/router';
import { RegionSelectionComponent } from '../components/region-selection/region-selection.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
    {
        path: '',
        component: RegionSelectionComponent
    }, 
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [MsalGuard]
    }
];
