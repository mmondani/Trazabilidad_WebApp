import { Component } from '@angular/core';
import { TitlebarService } from '../../titlebar/titlebar.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent {
  constructor(private titlebarService: TitlebarService) {}

  ngOnInit(): void {
    this.titlebarService.title = "Listado de logs";
    this.titlebarService.back = false;
  }
}
