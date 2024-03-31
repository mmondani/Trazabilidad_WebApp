import { Injectable } from '@angular/core';
import { Log } from '../../../models/log.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../login/auth.service';
import { map, switchMap, take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

interface GetLogsResponse {
  data: Log[]
}

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private _logList = new BehaviorSubject<Log[]> ([]);

  constructor(
    private auth: AuthService, 
    private http: HttpClient
  ) { }

  get logList() {
    return this._logList.pipe(
      map(logList => {
        if (logList)
          return logList;
        else
          return [];
      })
    );
  }

  getLogs() {
    return this.auth.user.pipe(
      take(1),
      switchMap(user => {
        return this.http.get<GetLogsResponse>(environment.api_url + "/logs", {
          headers: new HttpHeaders( {
            Authorization: `Bearer ${user.token}`
          })
        })
      }),
      map(getLogsResponse => {
        const logList = getLogsResponse.data;

        this._logList.next(logList);

        return logList;
      })
    )
  }
}
