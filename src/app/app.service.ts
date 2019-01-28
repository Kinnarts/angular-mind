import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, EMPTY } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const applicationToken =
  'MxVAgdV6spo2FvaXSjNUe9x9ALaflqnXjvw_ricTkNpxJ3p8wuWmpdhdQgg2bboE3ixnLbFLL9nZJtUxrhszesXCLlXrNhNQUGsF8YDTxNf5nCpPSF5M_Q0DBXX1SM1AO26yhE8vXF5Zzih8ZBy3OvDcnMU2UKojHmN_xPyhyLLBZADE0TSmgWlTqrJYYxFG2t61HPlvfXwynA-IAJ4rPrhi_KRoZ2B66blUGE47Mz6OJuDzxF2tuB5TDzOg1QRwCLkf4NOQfsisva_AY78LRVDH3vpXg7mnCO0VG9BMC16LT-1pUOlR3A3sVmnvzsJVU3jL3xT2YK5OD5Hgspo2fUw2s9Sx2udeADvHHtGe5jrq-VwwjldcLcAL5oFrzoQFuVtirOCdgifW86hi_oxvmJFqGKSoZMofIg0SCu45TtAyA_CGKRsII_mHBG8mV_SMlTk8HrUD7wjIVMLV9kfwiqj5k_IVX5Zhq0oVFSCzOoW4SQn0dnwve_NYur3wpZuV';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${applicationToken}`
  })
};

@Injectable({ providedIn: 'root' })
export class AppService {
  private url = 'https://api.mind.com'; // URL to web api

  constructor(private http: HttpClient) {}

  createConference(app_id: string): Observable<any> {
    return this.http
      .post(
        this.url + '/' + app_id,
        { name: 'any', profile: 'low', recordingLayout: 'mosaic' },
        httpOptions
      )
      .pipe(
        tap(response => {
          return response;
        }),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }

  createParticipant(app_id: string, conferenceId: string): Observable<any> {
    return this.http
      .post(
        this.url + '/' + app_id + '/' + conferenceId + '/participants',
        { name: 'name of participant', role: 'moderator' },
        httpOptions
      )
      .pipe(
        tap(response => {
          return response;
        }),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }
}
