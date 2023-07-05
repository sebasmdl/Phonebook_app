import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, tap, of, map, catchError } from 'rxjs';

import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }
  

  login( userName: any, password: any ):Observable<User> {
    return this.http.post<User>(`${ this.baseUrl }/api/v1/Users/Login`, { userName, password})
      .pipe(
        tap( user => this.user = user ),
        tap( user => console.log(user, 'console')),
        tap( user => {
          localStorage.setItem('token', user.token )
          localStorage.setItem('username', userName )
          localStorage.setItem('password', password )
        }),
      );
  }

  register(body:any){
    return this.http.post<User>(`${ this.baseUrl }/api/v1/Users/Register`, body)
    .pipe(
      tap( user => this.user = user ),
      tap( user => console.log(user, 'console')),
    );
  }
  logout() {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean> {

    if ( !localStorage.getItem('token') ) return of(false);

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    return  this.http.post<User>(`${ this.baseUrl }/api/v1/Users/Login`, { username, password})
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ),
        catchError( err => of(false) )
      );

  }


}
