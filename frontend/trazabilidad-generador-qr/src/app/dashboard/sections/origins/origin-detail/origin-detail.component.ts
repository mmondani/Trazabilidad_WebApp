import { Component, Input, OnInit } from '@angular/core';
import { TitlebarService } from '../../../titlebar/titlebar.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OriginsService } from '../origins.service';
import { AlertDialogService } from '../../../../shared/alert-dialog/alert-dialog.service';
import { LoadingService } from '../../../../shared/loading/loading.service';
import { Origin } from '../../../../models/origin.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-origin-detail',
  templateUrl: './origin-detail.component.html',
  styleUrl: './origin-detail.component.css'
})
export class OriginDetailComponent implements OnInit {
  originToEdit: Origin = null;
  newOriginForm: FormGroup;
  loading = false;

  constructor(
    private titlebarService: TitlebarService,
    private location: Location,
    private originService: OriginsService,
    private alertDialogService: AlertDialogService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) {
    // Obtiene de la ruta si hay un origin para editar. Si no lo hay, significa que se llamó
    // a este componente para crear un origin nuevo
    if (this.route.snapshot.queryParams['origin'])
      this.originToEdit = JSON.parse(this.route.snapshot.queryParams['origin']);

    this.newOriginForm = new FormGroup({
      'identifierFormControl': new FormControl(this.originToEdit?.identifier, [Validators.required]),
      'descriptionFormControl': new FormControl(this.originToEdit?.description, [Validators.required]),
    })

    this.newOriginForm.controls.identifierFormControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value: string) => {
      this.newOriginForm.controls.identifierFormControl.setValue(value.toUpperCase())
    })
  }

  ngOnInit(): void {
    if (this.originToEdit)
      this.titlebarService.title = "Editar origen";
    else
      this.titlebarService.title = "Crear nuevo origen";

    this.titlebarService.back = true;
  }

  onSubmit() {
    this.loading = true;

    // Si originToEdit es true se llama a editOrigin, si no, se llama a newOrigin
    if (this.originToEdit) {
      this.originService.editOrigin(
        new Origin(
          this.newOriginForm.value.identifierFormControl,
          this.newOriginForm.value.descriptionFormControl,
          this.originToEdit.id
        )).subscribe((origin: Origin) => {
          this.loading = false;
  
          this.alertDialogService.showDialog({
            message: `Se modificó exitósamente el origen ${this.originToEdit.identifier} - ${this.originToEdit.description} a ${origin.identifier} - ${origin.description}`,
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
    else {
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
