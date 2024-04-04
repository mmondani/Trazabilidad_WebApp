import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../login/auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

interface GetUsersResponse {
  data: User[]
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _userList = new BehaviorSubject<User[]>([]);

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }

  get userList() {
    return this._userList.pipe(
      map(userList => {
        if (userList)
          return userList;
        else
          return [];
      })
    );
  }

  getUsers() {
    return this.auth.user.pipe(
      take(1),
      switchMap(user => {
        return this.http.get<GetUsersResponse>(environment.api_url + "/users", {
          headers: new HttpHeaders( {
            Authorization: `Bearer ${user.token}`
          })
        })
      }),
      map(getUsersResponse => {
        const userList = getUsersResponse.data;

        this._userList.next(userList);

        return userList;
      })
    )
  }

  newUser (user: User) {
    return this.auth.user.pipe(
      take(1),
      switchMap(loginUser => {
        return this.http.post<User>(environment.api_url + "/users", {
          email: user.email,
          password: user.password,
          level: user.level
        },{
          headers: new HttpHeaders({
            Authorization: `Bearer ${loginUser.token}`
          })
        })
      }),
      catchError((error: HttpErrorResponse) => {
        let message = "Error desconocido";

        if (error.status == 409)
          message = "El usuario ya existe";
        else
          message = "Error del servidor";

        return throwError(message);
      })
    )
  }

  editOrigin (user: User) {
    return this.auth.user.pipe(
      take(1),
      switchMap(loginUser => {
        return this.http.patch<User>(environment.api_url + "/users", {
          id: user.id,
          email: user.email,
          level: user.level,
          password: user.password
        },{
          headers: new HttpHeaders({
            Authorization: `Bearer ${loginUser.token}`
          })
        })
      }),
      catchError((error: HttpErrorResponse) => {
        let message = "Error del servidor";

        return throwError(message);
      })
    )
  }

  deleteUser (id: string) {
    return this.auth.user.pipe(
      take(1),
      switchMap(user => {
        return this.http.delete(environment.api_url + "/users/" + id, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${user.token}`
          })
        })
      })
    )
  }
}
