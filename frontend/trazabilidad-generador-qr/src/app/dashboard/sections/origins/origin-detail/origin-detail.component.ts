import { Component, OnInit } from '@angular/core';
import { TitlebarService } from '../../../titlebar/titlebar.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OriginsService } from '../origins.service';
import { AlertDialogService } from '../../../../shared/alert-dialog/alert-dialog.service';
import { LoadingService } from '../../../../shared/loading/loading.service';
import { Origin } from '../../../../models/origin.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-origin-detail',
  templateUrl: './origin-detail.component.html',
  styleUrl: './origin-detail.component.css'
})
export class OriginDetailComponent implements OnInit {
  newOriginForm: FormGroup;
  loading = false;

  constructor(
    private titlebarService: TitlebarService,
    private location: Location,
    private originService: OriginsService,
    private alertDialogService: AlertDialogService,
    private loadingService: LoadingService
  ) {
    this.newOriginForm = new FormGroup({
      'identifierFormControl': new FormControl("", [Validators.required]),
      'descriptionFormControl': new FormControl("", [Validators.required]),
    })

    this.newOriginForm.controls.identifierFormControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value: string) => {
      this.newOriginForm.controls.identifierFormControl.setValue(value.toUpperCase())
    })
  }

  ngOnInit(): void {
    this.titlebarService.title = "Crear nuevo origen";
    this.titlebarService.back = true;
  }

  onSubmit() {
    this.loading = true;

    console.log(this.newOriginForm);
    this.originService.newOrigin(
      new Origin(
        this.newOriginForm.value.identifierFormControl,
        this.newOriginForm.value.descriptionFormControl
      )).subscribe((origin: Origin) => {
        this.loading = false;

        this.alertDialogService.showDialog({
          message: `Se creó exitósamente el origen ${origin.identifier} - ${origin.description}`,
          yesText: "Finalizar",
          yesStyle: "basic",
          yesColor: "primary",
          yesClick: this.onCreateOkDialogFinishClick.bind(this),
        });

        this.newOriginForm.reset();
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
      
        this.newOriginForm.reset();
      })
  }

  onCancelClick() {
    this.location.back();
  }

  onCreateOkDialogFinishClick() {
    this.alertDialogService.hideDialog();
    this.location.back();
  }

  onCreateErrorDialogClose() {
    this.alertDialogService.hideDialog();
  }
}
