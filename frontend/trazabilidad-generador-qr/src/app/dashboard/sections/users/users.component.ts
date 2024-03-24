import { Component } from '@angular/core';
import { TitlebarService } from '../../titlebar/titlebar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(private titlebarService: TitlebarService) {}

  ngOnInit(): void {
    this.titlebarService.title = "Listado de usuarios";
    this.titlebarService.back = false;
  }
}
