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
  providedIn: 'root'
})
export class DonatorsService {

  constructor(private http: HttpClient) {}

  getDonators(): Observable<Donator[]> {
    return this.http.get<Donator[]>(endpoint + 'RestDonators/get');
  }

  getEntityDonators(id:String | null): Observable<Donator[]> {
    return this.http.get<Donator[]>(endpoint + 'RestDonators/getEntityDonators/'+id);
  }

  getDonator(id: String | null): Observable<Donator> {
    return this.http.get<Donator>(endpoint + 'RestDonators/show/' + id);
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

    return this.http.post<any>(endpoint + 'RestDonators/save', formData);
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
