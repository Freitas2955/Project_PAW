import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from '../model/entity';
import { Donation } from '../model/donation';
import { Donator } from '../model/donator';
import { Partner } from '../model/partner';
import { Points } from '../model/points';

const endpoint = 'http://127.0.0.1:3000/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RestService {
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

  getCampaignImage(id: String | undefined): Observable<Blob> {
    const options = {
      headers: this.headers,
      responseType: 'blob' as 'json'
    };
  
    return this.http.get<Blob>(endpoint + 'images/campaigns/' + id + '.jpg', options);
  }

  getPartnerImage(id: String|undefined): Observable<Blob> {
    const options = {
      headers: this.headers,
      responseType: 'blob' as 'json'
    };

    return this.http.get<Blob>(endpoint + 'images/partners/' + id + '.jpg', options);
  }

  getEntityImage(id: String|undefined): Observable<Blob> {
    const options = {
      headers: this.headers,
      responseType: 'blob' as 'json'
    };

    return this.http.get<Blob>(endpoint + 'images/entities/' + id + '.jpg', options);
  }

  getDonatorImage(id: String|undefined): Observable<Blob> {
    const options = {
      headers: this.headers,
      responseType: 'blob' as 'json'
    };

    return this.http.get<Blob>(endpoint + 'images/donators/' + id + '.jpg', options);
  }
}
