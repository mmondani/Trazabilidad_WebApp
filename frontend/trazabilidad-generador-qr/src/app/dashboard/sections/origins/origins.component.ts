import { Component } from '@angular/core';
import { TitlebarService } from '../../titlebar/titlebar.service';

@Component({
  selector: 'app-origins',
  templateUrl: './origins.component.html',
  styleUrl: './origins.component.css'
})
export class OriginsComponent {
  constructor(private titlebarService: TitlebarService) {}

  ngOnInit(): void {
    this.titlebarService.title = "Listado de orígenes";
    this.titlebarService.back = false;
  }
}
