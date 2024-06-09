import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donator } from '../model/donator';
import { Observable } from 'rxjs';
const endpoint = 'http://127.0.0.1:3000/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DonatorsService {
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

  getDonators(): Observable<Donator[]> {
    return this.http.get<Donator[]>(
      endpoint + 'RestDonators/get',
      this.getHttpOptions()
    );
  }

  getEntityDonators(id: String | null): Observable<Donator[]> {
    return this.http.get<Donator[]>(
      endpoint + 'RestDonators/getEntityDonators/' + id,
      this.getHttpOptions()
    );
  }

  getDonator(id: String | null): Observable<Donator> {
    return this.http.get<Donator>(
      endpoint + 'RestDonators/show/' + id,
      this.getHttpOptions()
    );
  }

  registerDonator(donator: Donator, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const donatorAny: any = donator;

    Object.keys(donatorAny).forEach((key) => {
      if (donatorAny[key] !== undefined) {
        formData.append(key, donatorAny[key]);
      }
    });

    return this.http.post<any>(
      endpoint + 'RestDonators/save',
      formData
    );
  }

  updateDonator(donator: Donator, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const donatorAny: any = donator;

    Object.keys(donatorAny).forEach((key) => {
      if (donatorAny[key] !== undefined) {
        formData.append(key, donatorAny[key]);
      }
    });

    return this.http.post<any>(
      endpoint + 'RestDonators/update/' + donator._id,
      formData
    );
  }
}
