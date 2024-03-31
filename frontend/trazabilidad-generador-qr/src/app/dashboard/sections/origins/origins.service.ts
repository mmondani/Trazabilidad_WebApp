import { Injectable } from '@angular/core';
import { Origin } from '../../../models/origin.model';
import { AuthService } from '../../../login/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
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
