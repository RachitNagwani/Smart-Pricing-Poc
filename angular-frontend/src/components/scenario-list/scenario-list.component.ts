import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scenario-list',
  imports: [CommonModule],
  templateUrl: './scenario-list.component.html',
  styleUrl: './scenario-list.component.scss'
})
export class ScenarioListComponent {

  constructor(private service: ServiceService, private router: Router){
    this.getScenarios();
  }
  scenarios:any = [];

  onCreate() {
    this.router.navigate(['/scenario'])
  }

  onLogout() {
    this.service.logout()
  }

  getScenarios(){
    this.service.getScenario().subscribe({
      next:(response:any)=>{
        console.log(response)
        this.scenarios = response;
      }
    })
  }

  edit(id:any){
    this.router.navigate(['/scenario'],{queryParams:{scenario_id:id}})
  }

  delete(id:any){
    this.service.deleteScenario({scenario_id: id}).subscribe({
      next:()=>{
        this.getScenarios();
      }
    })
  }
}
