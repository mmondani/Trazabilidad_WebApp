import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitlebarService } from './titlebar.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

interface RouteData {
  title: string,
  back: boolean
}

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrl: './titlebar.component.css'
})
export class TitlebarComponent implements OnInit, OnDestroy{
  title: string = "";
  back: boolean = false;
  titleSubs: Subscription;
  backSubs: Subscription;

  constructor(
    private titlebarService: TitlebarService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.titleSubs = this.titlebarService.title.subscribe(title => {
      this.title = title;
    });

    this.backSubs = this.titlebarService.back.subscribe(back => {
      this.back = back;
    })
  }

  ngOnDestroy(): void {
    this.titleSubs.unsubscribe();
    this.backSubs.unsubscribe();
  }

  onBackClic(event: Event) {
    this.location.back();
    event.preventDefault();
  }
}
