import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitlebarService } from '../../titlebar/titlebar.service';
import { BatchsService } from './batchs.service';
import { Subscription } from 'rxjs';
import { Batch } from '../../../models/batch.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoadingService } from '../../../shared/loading/loading.service';
import { AlertDialogService } from '../../../shared/alert-dialog/alert-dialog.service';
import { Router } from '@angular/router';
import { downloadTxt } from './downloadTxt';
import { AuthService } from '../../../login/auth.service';
import { take } from 'rxjs/operators';

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
  loginUserLevel: string = 'admin';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private auth: AuthService,
    private titlebarService: TitlebarService,
    private batchService: BatchsService,
    private loadingService: LoadingService,
    private alertDialogService: AlertDialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titlebarService.title = "Listado de lotes creados";
    this.titlebarService.back = false;

    // Se busca el nivel de privilegio del usuario logueado
    this.auth.user.pipe(
      take(1)
    ).subscribe(loginUser => {
      this.loginUserLevel = loginUser.level;
    })

    this.batchServiceSub = this.batchService.batchList.subscribe(batchList => {
      this.batchList = batchList;
      this.dataSource = new MatTableDataSource(batchList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loadingService.hideLoading();
    });

    // Se pide el listado de batchs
    this.loadingService.showLoading();
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
    downloadTxt(batch);
  }

  deleteBatchClick(batch: Batch) {
    this.alertDialogService.showDialog({
      message: `¿Estás seguro que querés eliminar el lote ${batch.origin.identifier} ${batch.from}-${batch.to}?`,
      data: batch,
      yesText: "Eliminar",
      yesStyle: "filled",
      yesColor: "warn",
      noEnable: true,
      noText: "Cancelar",
      noStyle: "basic",
      noColor: "primary",
      yesClick: this.yesDeleteBatch.bind(this),
      noClick: this.noDeleteBatch.bind(this)
    })
  }

  yesDeleteBatch(batch) {
    this.alertDialogService.hideDialog();

    this.loadingService.showLoading();
    this.batchService.deleteBatch(batch.id).subscribe(() => {
      this.batchService.getBatchs().subscribe(() => {});
    },
    () => {
      this.loadingService.hideLoading();
      console.log ("Error al eliminar el batch: " + batch.id)
    })
  }

  noDeleteBatch(batch) {
    this.alertDialogService.hideDialog();
  }
}
