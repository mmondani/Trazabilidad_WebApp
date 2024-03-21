import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css'
})
export class AlertDialogComponent {
  @Input() title = "";
  @Input() message = "";
  @Input() buttonText = "";
  @Output() close = new EventEmitter();

  constructor() {}

  onActionButtonClick() {
    this.close.emit();
  }
}
