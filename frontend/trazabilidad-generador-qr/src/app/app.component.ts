import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';
import { Subscription } from 'rxjs';
import { LoadingService } from './shared/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  loadingEventsSubs: Subscription;
  showLoading = false;

  constructor(private auth: AuthService, private loadingService: LoadingService) {
    this.loadingService.loadingEvents.subscribe(show => {
      this.showLoading = show;
    })
  };

  ngOnInit(): void {
    this.auth.autoLogin();
  }

  ngOnDestroy(): void {
    this.loadingEventsSubs.unsubscribe();
  }

}
