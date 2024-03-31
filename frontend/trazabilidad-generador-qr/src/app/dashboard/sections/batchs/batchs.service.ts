import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../../../login/auth.service';
import { BehaviorSubject, forkJoin, throwError } from 'rxjs';
import { Batch } from '../../../models/batch.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { OriginsService } from '../origins/origins.service';

interface GetBatchsResponse {
  data: Batch[]
}

interface NextFromResponse {
  originId: string,
  week: number,
  year: number,
  from: number
}


@Injectable({
  providedIn: 'root'
})
export class BatchsService {
  private _batchList = new BehaviorSubject<Batch[]> ([]);

  constructor(private auth: AuthService, private originsService: OriginsService,private http: HttpClient) { }

  get batchList() {
    return this._batchList.pipe(
      map(batchList => {
        if (batchList)
          return batchList;
        else
          return [];
      })
    );
  }

  getBatchs () {
    const obsBatchList = this.auth.user.pipe(
      take(1),
      switchMap(user => {
        return this.http.get<GetBatchsResponse>(environment.api_url + "/batchs", {
          headers: new HttpHeaders( {
            Authorization: `Bearer ${user.token}`
          })
        })
      }),
      map(getBatchResponse => {
        const batchList = getBatchResponse.data;

        batchList.forEach(batch => {
          batch.quantity = batch.to - batch.from + 1;
        })

        return batchList;
      })
    )

    const obsOriginList = this.originsService.getOrigins();

    return forkJoin({
      batchs: obsBatchList,
      origins: obsOriginList
    }).pipe(
      map(value => {
        value.batchs.forEach(batch => {
          batch.origin = value.origins.find(origin => batch.originId === origin.id);
        })

        this._batchList.next(value.batchs);

        return value.batchs;
      })
    )
  }

  getNextFrom (originId: string, week: number, year: number) {
    return this.auth.user.pipe(
      take(1),
      switchMap(user => {
        return this.http.post<NextFromResponse>(environment.api_url + "/batchs/next_from", {
          originId: originId,
          week: week,
          year: year
        },{
          headers: new HttpHeaders({
            Authorization: `Bearer ${user.token}`
          })
        })
      }),
      catchError((error: HttpErrorResponse) => {
        let message = "Error del servidor";

        return throwError(message);
      }),
      map(nextFromResponse => {
        return nextFromResponse.from;
      })
    )
  }

  newBatch (batch: Batch) {
    return this.auth.user.pipe(
      take(1),
      switchMap(user => {
        return this.http.post<Batch>(environment.api_url + "/batchs", {
          originId: batch.originId,
          week: batch.week,
          year: batch.year,
          from: batch.from,
          to: batch.to
        },{
          headers: new HttpHeaders({
            Authorization: `Bearer ${user.token}`
          })
        })
      }),
      catchError((error: HttpErrorResponse) => {
        let message = "Error desconocido";

        if (error.status == 409)
          message = "El lote ya existe";
        else
          message = "Error del servidor";

        return throwError(message);
      })
    )
  }

  deleteBatch(id: string) {
    return this.auth.user.pipe(
      take(1),
      switchMap(user => {
        return this.http.delete(environment.api_url + "/batchs/" + id, {
          headers: new HttpHeaders({
            Authorization: `Bearer ${user.token}`
          })
        })
      })
    )
  }
}
