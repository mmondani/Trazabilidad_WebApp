import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AlertDialogService } from '../shared/alert-dialog/alert-dialog.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
  loginForm: FormGroup;
  hide = true;
  loading = false;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private alertDialogService: AlertDialogService
  ) {}

  ngOnInit(): void {
    // Si ya está autenticado y se entra a /login se redirige a /dashboard
    this.auth.user.pipe(take(1)).subscribe(user => {
      if (!!user)
        this.router.navigate(['/dashboard']);
    })

    this.loginForm = new FormGroup({
      'emailFormControl': new FormControl(null, [Validators.required, Validators.email]),
      'passwordFormControl': new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    this.loading = true;

    this.auth.login(
        this.loginForm.value.emailFormControl,
        this.loginForm.value.passwordFormControl
      ).subscribe(resData => {
        this.loading = false;
        this.alertDialogService.hideDialog();

        this.loginForm.reset();

        this.router.navigate(['/dashboard']);
      }, (errorMessage) => {
        this.loading = false;

        this.alertDialogService.showDialog({
          message: errorMessage,
          yesText: "Aceptar",
          yesStyle: "outline",
          yesColor: "primary",
          noEnable: false,
          yesClick: this.onDialogClose.bind(this),
        })
      
        this.loginForm.reset();
      });
  }

  onDialogClose() {
    this.alertDialogService.hideDialog();
  }
}
