import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, tap, of, map, catchError } from 'rxjs';

import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class PhoneBookService {

  private baseUrl = environments.baseUrl;

  constructor(private http: HttpClient) { }

  saveContact(body:any){
    return this.http.post(`${ this.baseUrl }/api/v1/Contacts`, body);
  }
  deleteContact(id:any){
    return this.http.delete(`${ this.baseUrl }/api/v1/Contacts/${id}`);
  }
  getContact(id:any){
    return this.http.get(`${ this.baseUrl }/api/v1/Contacts/${id}`);
  }
  updateContact(id:number, body:any){
    return this.http.put(`${ this.baseUrl }/api/v1/Contacts/${id}`, body);
  }
  getAllContacts(){
    return this.http.get(`${ this.baseUrl }/api/v1/Contacts`).
    pipe(
        tap(users => console.log(users))
    )
  }


}
