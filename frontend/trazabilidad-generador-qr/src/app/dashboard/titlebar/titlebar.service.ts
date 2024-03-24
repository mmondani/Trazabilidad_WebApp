import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitlebarService {
  private _title = new BehaviorSubject<string> ("");
  private _back = new BehaviorSubject<boolean> (false);

  constructor() { }

  set title (title:string) {
    this._title.next(title);
  }

  get title (): BehaviorSubject<string> {
    return this._title;
  }

  set back (back: boolean) {
    this._back.next(back);
  }

  get back (): BehaviorSubject<boolean> {
    return this._back;
  }
}
