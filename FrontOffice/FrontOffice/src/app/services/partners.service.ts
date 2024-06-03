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

  constructor(private http: HttpClient) {}

  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(endpoint + 'RestPartners/get');
  }

  getPartner(id: String | null): Observable<Partner> {
    return this.http.get<Partner>(endpoint + 'RestPartners/show/' + id);
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
      formData
    );
  }

  
}
