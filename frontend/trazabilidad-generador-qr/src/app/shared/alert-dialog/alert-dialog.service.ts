import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertDialogConfig {
  title?: string,
  message?: string,
  noText?: string,
  yesText?: string,
  noEnable?: boolean,
  noStyle?: "basic" | "outline" | "filled",
  yesStyle?: "basic" | "outline" | "filled",
  noColor?: "" | "primary" | "accent" | "warn",
  yesColor?: "" | "primary" | "accent" | "warn",
  data?: any,
  noClick?: (data: any) => void,
  yesClick?: (data: any) => void,
  show?: boolean
}


@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {
  private _dialogConfig = new Subject<AlertDialogConfig>();

  constructor() { }

  get dialogConfig () {
    return this._dialogConfig;
  }

  showDialog (config: AlertDialogConfig) {
    this._dialogConfig.next({...config, show: true});
  }

  hideDialog () {
    this._dialogConfig.next({show: false});
  }
}
