import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitlebarService } from '../../titlebar/titlebar.service';
import { MatTableDataSource } from '@angular/material/table';
import { Origin } from '../../../models/origin.model';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OriginsService } from './origins.service';
import { LoadingService } from '../../../shared/loading/loading.service';
import { AlertDialogService } from '../../../shared/alert-dialog/alert-dialog.service';

@Component({
  selector: 'app-origins',
  templateUrl: './origins.component.html',
  styleUrl: './origins.component.css'
})
export class OriginsComponent implements OnInit, OnDestroy, AfterViewInit  {
  displayedColumns: string[] = ['identifier', 'description', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Origin>;
  originServiceSub: Subscription;
  originList: Origin[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private titlebarService: TitlebarService,
    private originService: OriginsService,
    private loadingService: LoadingService,
    private alertDialogService: AlertDialogService
  ) {}

  ngOnInit(): void {
    this.titlebarService.title = "Listado de orígenes";
    this.titlebarService.back = false;

    this.originServiceSub = this.originService.originList.subscribe(originList => {
      this.originList = originList;
      this.dataSource = new MatTableDataSource(originList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loadingService.hideLoading();
    });

    // Se pide el listado de orígenes
    this.loadingService.showLoading();
    this.originService.getOrigins().subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.originServiceSub.unsubscribe();
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

  editClick (origin: Origin) {

  }

  deleteClick (origin: Origin) {
    this.alertDialogService.showDialog({
      message: `¿Estás seguro que querés eliminar el origen ${origin.identifier} - ${origin.description}?`,
      data: origin,
      yesText: "Eliminar",
      yesStyle: "filled",
      yesColor: "warn",
      noEnable: true,
      noText: "Cancelar",
      noStyle: "basic",
      noColor: "primary",
      yesClick: this.yesDeleteOrigin.bind(this),
      noClick: this.noDeleteOrigin.bind(this)
    })
  }

  yesDeleteOrigin(origin: Origin) {
    this.alertDialogService.hideDialog();

    this.loadingService.showLoading();
    this.originService.deleteOrigin(origin.id).subscribe(() => {
      this.originService.getOrigins().subscribe(() => {},);
    },
    () => {
      this .loadingService.hideLoading();
      console.log ("Error al eliminar el origen: " + origin.id)
    })
  }

  noDeleteOrigin(origin) {
    this.alertDialogService.hideDialog();
  }
}
