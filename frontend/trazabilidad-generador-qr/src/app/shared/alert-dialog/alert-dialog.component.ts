import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css'
})
export class AlertDialogComponent {
  @Input() title = "";
  @Input() message = "";
  @Input() noText = "";
  @Input() yesText = "";
  @Input() noEnable = false;
  @Input() noStyle: "basic" | "outline" | "filled" = "outline";
  @Input() yesStyle: "basic" | "outline" | "filled" = "outline";
  @Input() noColor: "" | "primary" | "accent" | "warn" = "";
  @Input() yesColor: "" | "primary" | "accent" | "warn" = "";
  @Input() data = null;
  @Output() no = new EventEmitter();
  @Output() yes = new EventEmitter();

  constructor() {}

  onNoClick() {
    this.no.emit(this.data);
  }

  onYesClick() {
    this.yes.emit(this.data);
  }
}
