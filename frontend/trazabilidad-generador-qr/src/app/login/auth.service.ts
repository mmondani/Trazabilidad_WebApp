import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginUser } from '../models/login-user.model';
import { Router } from '@angular/router';


export interface LoginResponseData {
  token: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<LoginUser>(null);

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<LoginResponseData>(
        environment.api_url + "/api/users/login",
        {
          email: email,
          password: password
        }
      ).pipe(
        catchError(error => {
          let message = "Error desconocido";

          if (error.status === 401)
            message = "Email o password incorrecto";
          else
            message = "Error del servidor";

          return throwError(message);
        }),
        tap(resData => {
          const user = new LoginUser(email, resData.token);
          this.user.next(user);

          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  autoLogin() {
    const userData: {email: string, _token: string} = JSON.parse(localStorage.getItem('userData'));

    if (!userData)
      return;

    const loadedUser = new LoginUser(userData.email, userData._token);

    // Se chequea si el token no está vencido
    if (loadedUser.token)
      this.user.next(loadedUser);
  }


  logout () {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }
}
