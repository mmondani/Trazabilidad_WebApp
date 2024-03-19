import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page.component';


const loginRoutes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutesModule { }
