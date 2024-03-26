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
    private batchService: BatchsService,
    private loadingService: LoadingService,
    private alertDialogService: AlertDialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titlebarService.title = "Listado de lotes creados";
    this.titlebarService.back = false;

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
    //this.router.navigate(["batchs/detail"])
  }

  downloadTxtClick(batch: Batch) {
    // Se genera el contenido del archivo txt
    let originIdentifier = batch.origin.identifier;
    let originDescription = batch.origin.description;
    let year = batch.year - 2000;
    let week = batch.week;
    let from = batch.from;
    let to = batch.to;
    let outputLines: string[] = [];

    for (let i = from; i <= to; i++) {
      outputLines.push(`${originIdentifier}${week.toString().padStart(2, "0")}${year.toString().padStart(2, "0")}${i.toString().padStart(5, "0")}`)
    }


    let file = new Blob([outputLines.join("\n")], {type: ".txt"});
    let a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = `${originDescription}_${week.toString().padStart(2, "0")}-${year.toString().padStart(2, "0")}_${from}-${to}`;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
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
