import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() username: string = "";
  @Input() level: string = "";
  @Output() clickLogout = new EventEmitter();

  onLogout (event: Event) {
    event.preventDefault();
    this.clickLogout.emit();
  }
}
