import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donation } from '../model/donation';
import { Observable } from 'rxjs';
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
export class DonationsService {
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

  approveDonation(id: String | undefined): Observable<any> {
    return this.http.post<Donation[]>(
      endpoint + 'RestDonations/approve/' + id,
      id,
      this.getHttpOptions()
    );
  }

  getEntityDonations(id: String | null): Observable<Donation[]> {
    return this.http.get<Donation[]>(
      endpoint + 'RestDonations/getEntityDonations/' + id,
      this.getHttpOptions()
    );
  }

  getDonatorDonations(id: String | null): Observable<Donation[]> {
    return this.http.get<Donation[]>(
      endpoint + 'RestDonations/getDonatorDonations/' + id,
      this.getHttpOptions()
    );
  }

  getDonation(id: String | null): Observable<Donation> {
    return this.http.get<Donation>(
      endpoint + 'RestDonations/show/' + id,
      this.getHttpOptions()
    );
  }

  registerDonation(donation: Donation): Observable<any> {
    return this.http.post<Donation>(
      endpoint + 'RestDonations/save/' + donation.donatorId,
      donation,
      this.getHttpOptions()
    );
  }

  registerRequest(donation: Donation): Observable<any> {
    return this.http.post<Donation>(
      endpoint + 'RestRequests/save/' + donation._id,
      donation,
      this.getHttpOptions()
    );
  }

  getPoints(): Observable<Points> {
    return this.http.get<Points>(
      endpoint + 'RestPoints/get',
      this.getHttpOptions()
    );
  }
}
