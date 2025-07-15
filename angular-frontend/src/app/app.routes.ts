import { Routes } from '@angular/router';
import { RegionSelectionComponent } from '../components/region-selection/region-selection.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoginScreenComponent } from '../components/login-screen/login-screen.component';
import { MarketSelectComponent } from '../components/market-select/market-select.component';
import { ScenarioListComponent } from '../components/scenario-list/scenario-list.component';
import { CreateScenarioComponent } from '../components/create-scenario/create-scenario.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginScreenComponent
    }, 
    {
        path:'market-selection',
        component : MarketSelectComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path:'scenario-list',
        component: ScenarioListComponent
    },
    {
        path:'scenario',
        component: CreateScenarioComponent
    }
];
