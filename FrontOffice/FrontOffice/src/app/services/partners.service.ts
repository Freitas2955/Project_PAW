import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partner } from '../model/partner';
import { Observable } from 'rxjs';

const endpoint = 'http://127.0.0.1:3000/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

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

  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(endpoint + 'RestPartners/get',this.getHttpOptions());
  }

  getPartner(id: String | null): Observable<Partner> {
    return this.http.get<Partner>(endpoint + 'RestPartners/show/' + id,this.getHttpOptions());
  }

  registerPartner(partner: Partner, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const partnerAny: any = partner;

    Object.keys(partnerAny).forEach((key) => {
      if (partnerAny[key] !== undefined) {
        formData.append(key, partnerAny[key]);
      }
    });

    return this.http.post<any>(endpoint + 'RestPartners/save', formData);
  }

  updatePartner(partner: Partner, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const partnerAny: any = partner;

    Object.keys(partnerAny).forEach((key) => {
      if (partnerAny[key] !== undefined) {
        formData.append(key, partnerAny[key]);
      }
    });

    return this.http.post<any>(
      endpoint + 'RestPartners/update/' + partner._id,
      formData,this.getHttpOptions()
    );
  }

  
}
