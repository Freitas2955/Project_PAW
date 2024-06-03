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
  providedIn: 'root'
})
export class DonationsService {

  constructor(private http: HttpClient) {}

  approveDonation(id: String | undefined): Observable<any> {
    return this.http.post<Donation[]>(
      endpoint + 'RestDonations/approve/' + id,
      id
    );
  }

  getEntityDonations(id: String | null): Observable<Donation[]> {
    return this.http.get<Donation[]>(
      endpoint + 'RestDonations/getEntityDonations/' + id
    );
  }

  getDonatorDonations(id: String | null): Observable<Donation[]> {
    return this.http.get<Donation[]>(
      endpoint + 'RestDonations/getDonatorDonations/' + id
    );
  }

  getDonation(id: String | null): Observable<Donation> {
    return this.http.get<Donation>(endpoint + 'RestDonations/show/' + id);
  }

  registerDonation(donation: Donation): Observable<any> {
    return this.http.post<Donation>(
      endpoint + 'RestDonations/save/' + donation.donatorId,
      donation
    );
  }

  registerRequest(donation: Donation): Observable<any> {
    return this.http.post<Donation>(
      endpoint + 'RestRequests/save/' + donation._id,
      donation
    );
  }

  getPoints(): Observable<Points> {
    return this.http.get<Points>(endpoint + 'RestPoints/get');
  }
}
