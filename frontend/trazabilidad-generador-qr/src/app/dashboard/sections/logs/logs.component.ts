import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitlebarService } from '../../titlebar/titlebar.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Log } from '../../../models/log.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../../shared/loading/loading.service';
import { LogsService } from './logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit, OnDestroy, AfterViewInit{
  displayedColumns: string[] = ['timestamp', 'user', 'message'];
  dataSource: MatTableDataSource<Log>;
  logServiceSub: Subscription;
  logList: Log[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private titlebarService: TitlebarService,
    private loadingService: LoadingService,
    private logService: LogsService
  ) {}

  ngOnInit(): void {
    this.titlebarService.title = "Listado de logs";
    this.titlebarService.back = false;

    this.logServiceSub = this.logService.logList.subscribe(logList => {
      this.logList = logList;
      this.dataSource = new MatTableDataSource(logList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loadingService.hideLoading();
    });

    this.loadingService.showLoading();
    this.logService.getLogs().subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.logServiceSub.unsubscribe();
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
}
