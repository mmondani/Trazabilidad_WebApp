import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
  loginForm: FormGroup;
  hide = true;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'emailFormControl': new FormControl(null, [Validators.required, Validators.email]),
      'passwordFormControl': new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    console.log(this.loginForm);
  }
}
