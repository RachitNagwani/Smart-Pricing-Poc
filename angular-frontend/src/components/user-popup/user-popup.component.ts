import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-popup',
  imports: [CommonModule],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})
export class UserPopupComponent {
  @Input() users: { name: string, id: any }[] = [];
  @Output() userSelected = new EventEmitter<any>();

  select(user: any) {
    this.userSelected.emit(user);
  }
}
