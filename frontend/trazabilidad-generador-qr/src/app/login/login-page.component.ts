import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
  loginForm: FormGroup;
  hide = true;
  loginError = false;
  error = "";
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

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
        this.error = "";

        this.loginForm.reset();

        this.router.navigate(['/dashboard']);
      }, (errorMessage) => {
        this.loading = false;
        this.error = errorMessage;
      
        this.loginForm.reset();
      });
  }

  onDialogClose() {
    this.error = "";
  }
}
