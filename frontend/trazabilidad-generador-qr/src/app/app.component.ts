import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';
import { Subscription } from 'rxjs';
import { LoadingService } from './shared/loading/loading.service';
import { AlertDialogConfig, AlertDialogService } from './shared/alert-dialog/alert-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  loadingEventsSubs: Subscription;
  showLoading = false;

  dialogConfigSubs: Subscription;
  dialogConfig: AlertDialogConfig = {message: ""};

  constructor(private auth: AuthService, private loadingService: LoadingService, private alertDialogService: AlertDialogService) {
    this.loadingEventsSubs = this.loadingService.loadingEvents.subscribe(show => {
      this.showLoading = show;
    })

    this.dialogConfigSubs = this.alertDialogService.dialogConfig.subscribe (config => {
      this.dialogConfig = config;
    })
  };

  ngOnInit(): void {
    this.auth.autoLogin();
  }

  ngOnDestroy(): void {
    this.loadingEventsSubs.unsubscribe();
    this.dialogConfigSubs.unsubscribe();
  }

}
