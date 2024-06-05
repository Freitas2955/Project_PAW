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
  constructor(private http: HttpClient) {}


  getCampaignImage(id: String|undefined): Observable<Blob> {
    return this.http.get(endpoint + 'images/campaigns/' + id + '.jpg', { responseType: 'blob' });
  }

  getPartnerImage(id: String|undefined): Observable<Blob> {
    return this.http.get(endpoint + 'images/partners/' + id + '.jpg', { responseType: 'blob' });
  }

  getEntityImage(id: String|undefined): Observable<Blob> {
    return this.http.get(endpoint + 'images/entities/' + id + '.jpg', { responseType: 'blob' });
  }

  getDonatorImage(id: String|undefined): Observable<Blob> {
    return this.http.get(endpoint + 'images/donators/' + id + '.jpg', { responseType: 'blob' });
  }
}
