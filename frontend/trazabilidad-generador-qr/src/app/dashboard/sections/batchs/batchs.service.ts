import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../../../login/auth.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { Batch } from '../../../models/batch.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { OriginsService } from '../origins/origins.service';

interface GetBatchsResponse {
  data: Batch[]
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
