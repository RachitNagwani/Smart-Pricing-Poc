import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-scenario',
  imports: [CommonModule,FormsModule],
  templateUrl: './create-scenario.component.html',
  styleUrl: './create-scenario.component.scss'
})
export class CreateScenarioComponent {

  constructor(private service:ServiceService, private router: Router, private route: ActivatedRoute){
    this.route.queryParams.subscribe(params=>{
      this.scenario_id = params['scenario_id']
      if(this.scenario_id){
        this.getScenarioDetails()
      }
    })
  }
  scenario_id:any
  scenario = {
    name: '',
    description: '',
    type: ''
  };

  scenarioTypes = ['sp','opt'];

  getScenarioDetails(){
    this.service.getScenarioDetails({
      scenario_id: this.scenario_id
    }).subscribe({
      next:(response:any)=>{
        const details = response[0]
        this.scenario.name = details.name
        this.scenario.description = details.description
        this.scenario.type = details.type
      }
    })
  }

  onCreate() {
    if (this.scenario_id) this.onUpdate()
    else {
      this.service.createScenario({
        name: this.scenario.name,
        description: this.scenario.description,
        type: this.scenario.type
      }).subscribe({
        next: () => {
          this.router.navigate(['/scenario-list'])
        }
      })
    }
  }

  onUpdate(){
    this.service.updateScenario({
      scenario_id: this.scenario_id,
      name:this.scenario.name,
      description: this.scenario.description,
      type: this.scenario.type
    }).subscribe({
      next:()=>{
        this.router.navigate(['/scenario-list'])
      }
    })
  }

  onLogout() {
   this.service.logout();
  }
}
