import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitlebarService } from '../../titlebar/titlebar.service';
import { BatchsService } from './batchs.service';
import { Subscription } from 'rxjs';
import { Batch } from '../../../models/batch.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-batchs',
  templateUrl: './batchs.component.html',
  styleUrl: './batchs.component.css'
})
export class BatchsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['origin', 'week', 'year', 'from', 'to', 'quantity', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Batch>;
  batchServiceSub: Subscription;
  batchList: Batch[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private titlebarService: TitlebarService,
    private batchService: BatchsService
  ) {}

  ngOnInit(): void {
    this.titlebarService.title = "Listado de lotes creados";
    this.titlebarService.back = false;

    this.batchServiceSub = this.batchService.batchList.subscribe(batchList => {
      this.batchList = batchList;
      this.dataSource = new MatTableDataSource(batchList);
    });

    // Se pide el listado de batchs
    this.batchService.getBatchs().subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.batchServiceSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newBatchClick() {
    
  }

  downloadTxtClick(batch: Batch) {
    console.log(batch);
  }

  deleteBatchClick(batch: Batch) {
    console.log(batch);
  }
}
