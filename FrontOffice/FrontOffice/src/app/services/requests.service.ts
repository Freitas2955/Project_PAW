import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../model/request';
const endpoint = 'http://127.0.0.1:3000/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class RequestsService {

  headers: HttpHeaders;
  type: string | number | (string | number)[];
  token: string | number | (string | number)[];

  constructor(private http: HttpClient) {
    const localStorageData = localStorage.getItem('currentUser');
    if (localStorageData) {
      const userData = JSON.parse(localStorageData);
      this.token = userData.token;
      this.type = userData.userType;
    } else {
      this.token = '';
      this.type = '';
    }
    this.headers = this.createHeaders();
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'login-token': String(this.token),
      type: String(this.type),
    });
  }

  private getHttpOptions() {
    return { headers: this.headers };
  }

  getEntityRequests(id: String | null): Observable<Request[]> {
    return this.http.get<Request[]>(endpoint + 'RestRequests/getEntityRequests/'+id,this.getHttpOptions());
  }

  getDonatorRequests(id: String | null): Observable<Request> {
    return this.http.get<Request>(endpoint + 'RestRequests/getDonatorRequests/' + id,this.getHttpOptions());
  }

  approveRequest(id: String | null|undefined): Observable<Request>{
    return this.http.get<Request>(endpoint + 'RestRequests/approve/' + id,this.getHttpOptions());
  }

}
