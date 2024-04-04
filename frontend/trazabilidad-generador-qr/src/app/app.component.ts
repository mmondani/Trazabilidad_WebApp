import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';
import { Subscription } from 'rxjs';
import { LoadingService } from './shared/loading/loading.service';
import { AlertDialogConfig, AlertDialogService } from './shared/alert-dialog/alert-dialog.service';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  loadingEventsSubs: Subscription;
  showLoading = false;
  showSizeMessage = false;

  dialogConfigSubs: Subscription;
  dialogConfig: AlertDialogConfig = {message: ""};

  constructor(
    private auth: AuthService, 
    private loadingService: LoadingService, 
    private alertDialogService: AlertDialogService,
    private viewportRuler: ViewportRuler,
    private ngZone: NgZone
  ) {
    this.loadingEventsSubs = this.loadingService.loadingEvents.subscribe(show => {
      this.showLoading = show;
    });

    this.dialogConfigSubs = this.alertDialogService.dialogConfig.subscribe (config => {
      this.dialogConfig = config;
    });

    if (this.viewportRuler.getViewportRect().width < 1400)
      this.showSizeMessage = true;
    else  
      this.showSizeMessage = false;

    this.viewportRuler
        .change(300)
        .subscribe(() => {
            this.ngZone.run(() => {
              if (this.viewportRuler.getViewportRect().width < 1400)
                this.showSizeMessage = true;
              else  
                this.showSizeMessage = false;
            });
        });
  };

  ngOnInit(): void {
    this.auth.autoLogin();
  }

  ngOnDestroy(): void {
    this.loadingEventsSubs.unsubscribe();
    this.dialogConfigSubs.unsubscribe();
  }

}
