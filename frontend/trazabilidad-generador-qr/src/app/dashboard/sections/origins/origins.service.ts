import { Injectable } from '@angular/core';
import { Origin } from '../../../models/origin.model';
import { AuthService } from '../../../login/auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

interface GetOriginsResponse {
  data: Origin[]
}

@Injectable({
  providedIn: 'root'
})
export class OriginsService {
  private _originList = new BehaviorSubject<Origin[]> ([]);

  constructor(private auth: AuthService, private http: HttpClient) { }

  get originList() {
    return this._originList.pipe(
      map(originList => {
        if (originList)
          return originList;
        else
          return [];
      })
    );
  }

  getOrigins() {
    return this.auth.user.pipe(
      take(1),
      switchMap(user => {
        return this.http.get<GetOriginsResponse>(environment.api_url + "/origins", {
          headers: new HttpHeaders( {
            Authorization: `Bearer ${user.token}`
          })
        })
      }),
      map(getOriginsResponse => {
        const originList = getOriginsResponse.data;

        this._originList.next(originList);

        return originList;
      })
    )
  }

  newOrigin (origin: Origin) {
    return this.auth.user.pipe(
      take(1),
      switchMap(user => {
        return this.http.post<Origin>(environment.api_url + "/origins", {
          identifier: origin.identifier,
          description: origin.description
        },{
          headers: new HttpHeaders({
            Authorization: `Bearer ${user.token}`
          })
        })
      }),
      catchError((error: HttpErrorResponse) => {
        let message = "Error desconocido";

        if (error.status == 409)
          message = "El origen ya existe";
        else
          message = "Error del servidor";

        return throwError(message);
      })
    )
  }

  deleteOrigin (id: string) {
    return this.auth.user.pipe(
      take(1),
      switchMap(user => {
        return this.http.delete(environment.api_url + "/origins/" + id, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${user.token}`
          })
        })
      })
    )
  }
}
