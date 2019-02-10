import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, EMPTY } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AppService {
  private url = environment.APIEndpoint;
  private app_id = environment.app_id;

  constructor(private http: HttpClient) {}

  createConference(name: string): Observable<any> {
    return this.http
      .post(this.url + '/' + this.app_id, {
        name: name,
        profile: 'low',
        recordingLayout: 'mosaic'
      })
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

  createParticipant(conferenceId: string, name: string): Observable<any> {
    return this.http
      .post(
        this.url + '/' + this.app_id + '/' + conferenceId + '/participants',
        { name: name, role: 'moderator' }
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

  getConference(conferenceId: string): Observable<any> {
    return this.http
      .get(
        this.url + '/' + this.app_id + '/' + conferenceId + '/?detailed=true'
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

  subscribeToMedia(conferenceId: string): Observable<any> {
    return this.http
      .post(this.url + '/' + this.app_id + '/' + conferenceId + '/media', {
        name: name,
        role: 'moderator'
      })
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
