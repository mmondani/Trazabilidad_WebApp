import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../login/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap, take } from 'rxjs/operators';
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
}
