import { Component, OnInit } from '@angular/core';
import { TitlebarService } from '../../../../titlebar/titlebar.service';

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrl: './batch-detail.component.css'
})
export class BatchDetailComponent implements OnInit {

  constructor(
    private titlebarService: TitlebarService
  ){}

    ngOnInit(): void {
      this.titlebarService.title = "Crear nuevo lote";
      this.titlebarService.back = true;
    }
}
