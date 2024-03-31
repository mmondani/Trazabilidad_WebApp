import { Component, OnInit } from '@angular/core';
import { TitlebarService } from '../../../../titlebar/titlebar.service';
import { HttpClient } from '@angular/common/http';
import { OriginsService } from '../../../origins/origins.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Origin } from '../../../../../models/origin.model';
import { LoadingService } from '../../../../../shared/loading/loading.service';
import { Location } from '@angular/common';
import { getCurrentWeekNumber } from '../../../../../shared/utilities';
import { BatchsService } from '../../batchs.service';
import { Batch } from '../../../../../models/batch.model';
import { AlertDialogService } from '../../../../../shared/alert-dialog/alert-dialog.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { downloadTxt } from '../../downloadTxt';

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrl: './batch-detail.component.css'
})
export class BatchDetailComponent implements OnInit {
  newBatchForm: FormGroup;
  origins: Origin[];
  loading = false;


  constructor(
    private titlebarService: TitlebarService,
    private http: HttpClient,
    private location: Location,
    private originsService: OriginsService,
    private batchsService: BatchsService,
    private alertDialogService: AlertDialogService,
    private loadingService: LoadingService,
  ){
    this.loadingService.showLoading();
    this.originsService.getOrigins().subscribe(origins => {
      this.loadingService.hideLoading();
      this.origins = origins;
    },
    () => {
      // No se pudo obtener la lista de orígenes
      // TODO: mostrar un dialog indicando que hubo un problema
      this.loadingService.hideLoading();
    });


    // Carga los campos de semana y año con la actual
    let currentWeek = getCurrentWeekNumber();
    let currentYear = new Date().getFullYear();

    this.newBatchForm = new FormGroup({
      'originFormControl': new FormControl(null,[Validators.required]),
      'weekFormControl': new FormControl(currentWeek, [Validators.required, Validators.min(1), Validators.max(60)]),
      'yearFormControl': new FormControl(currentYear, [Validators.required, Validators.min(2024), Validators.max(2099)]),
      'fromFormControl': new FormControl(1, [Validators.required, Validators.min(0), Validators.max(99999)]),
      'toFormControl': new FormControl(1, [Validators.required, Validators.min(0), Validators.max(99999)]),
      'quantityFormControl': new FormControl(1, [Validators.required, Validators.min(0), Validators.max(99999)])
    })

    this.newBatchForm.controls.fromFormControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.newBatchForm.controls.quantityFormControl.setValue(this.newBatchForm.value.toFormControl - this.newBatchForm.value.fromFormControl + 1)
    })

    this.newBatchForm.controls.toFormControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.newBatchForm.controls.quantityFormControl.setValue(this.newBatchForm.value.toFormControl - this.newBatchForm.value.fromFormControl + 1)
    })

    this.newBatchForm.controls.quantityFormControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.newBatchForm.controls.toFormControl.setValue(this.newBatchForm.value.fromFormControl + this.newBatchForm.value.quantityFormControl - 1)
    })

    this.newBatchForm.controls.originFormControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(this.needToGetNextFrom.bind(this))

    this.newBatchForm.controls.weekFormControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(this.needToGetNextFrom.bind(this))

    this.newBatchForm.controls.yearFormControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(this.needToGetNextFrom.bind(this))
  }

  private needToGetNextFrom(originId: string) {
    if(this.newBatchForm.value.originFormControl && this.newBatchForm.value.weekFormControl && this.newBatchForm.value.yearFormControl) {
      this.loadingService.showLoading();

      this.batchsService.getNextFrom(
        this.newBatchForm.value.originFormControl,
        this.newBatchForm.value.weekFormControl,
        this.newBatchForm.value.yearFormControl
      ).subscribe(nextFrom => {
        this.loadingService.hideLoading();
        this.newBatchForm.controls.fromFormControl.setValue(nextFrom);
        this.newBatchForm.controls.toFormControl.setValue(nextFrom);
      },
      () => {
        this.loadingService.hideLoading();
      })
    }
  }

  ngOnInit(): void {
    this.titlebarService.title = "Crear nuevo lote";
    this.titlebarService.back = true;
  }

  onSubmit() {
    this.loading = true;

    this.batchsService.newBatch(
      new Batch(
        this.newBatchForm.value.originFormControl,
        this.newBatchForm.value.weekFormControl,
        this.newBatchForm.value.yearFormControl,
        this.newBatchForm.value.fromFormControl,
        this.newBatchForm.value.toFormControl
      )).subscribe((batch: Batch) => {
        this.loading = false;

        // Se completa con origin correspondiente al originId
        batch.origin = this.origins.find(origin => origin.id === batch.originId);

        this.alertDialogService.showDialog({
          message: `Se creó exitósamente el lote de IDs desde ${batch.from} hasta ${batch.to}`,
          noEnable: true,
          noText: "Finalizar",
          noStyle: "basic",
          noColor: "primary",
          noClick: this.onCreateOkDialogFinishClick.bind(this),
          yesText: "Descargar txt",
          yesStyle: "filled",
          yesColor: "primary",
          yesClick: this.onCreateOkDialogDownloadClick.bind(this),
          data: batch
        });

        this.newBatchForm.reset();
      },
      (errorMessage) => {
        this.loading = false;

        this.alertDialogService.showDialog({
          message: errorMessage,
          yesText: "Aceptar",
          yesStyle: "outline",
          yesColor: "primary",
          noEnable: false,
          yesClick: this.onCreateErrorDialogClose.bind(this),
        });
      
        this.newBatchForm.reset();
      })
  }

  onCancelClick() {
    this.location.back();
  }

  onCreateOkDialogFinishClick() {
    this.alertDialogService.hideDialog();
    this.location.back();
  }

  onCreateOkDialogDownloadClick(batch: Batch) {
    this.alertDialogService.hideDialog();
    downloadTxt(batch);
    this.location.back();
  }

  onCreateErrorDialogClose() {
    this.alertDialogService.hideDialog();
  }
}
