import { Component, OnInit } from '@angular/core';
import { TitlebarService } from '../../titlebar/titlebar.service';

@Component({
  selector: 'app-batchs',
  templateUrl: './batchs.component.html',
  styleUrl: './batchs.component.css'
})
export class BatchsComponent implements OnInit {

  constructor(private titlebarService: TitlebarService) {}

  ngOnInit(): void {
    this.titlebarService.title = "Listado de lotes creados";
    this.titlebarService.back = false;
  }
}
