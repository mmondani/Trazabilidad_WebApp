import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../../../login/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Batch } from '../../../models/batch.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

interface GetBatchsResponse {
  data: Batch[]
}


@Injectable({
  providedIn: 'root'
})
export class BatchsService {
  private _batchList = new BehaviorSubject<Batch[]> (null);

  constructor(private auth: AuthService, private http: HttpClient) { }

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
    return this.auth.user.pipe(
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

        this._batchList.next(batchList);

        return batchList;
      })
    )
  }
}
