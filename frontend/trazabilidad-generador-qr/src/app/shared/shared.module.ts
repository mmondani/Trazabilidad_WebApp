import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    AlertDialogComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    AlertDialogComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
