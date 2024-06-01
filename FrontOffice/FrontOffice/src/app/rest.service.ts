import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from './model/entity';
import { Donation } from './model/donation';
import { Donator } from './model/donator';
import { Partner } from './model/partner';

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

  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(endpoint + 'entities/get');
  }

  getEntity(id:String|null): Observable<Entity> {
    return this.http.get<Entity>(endpoint + 'RestEntities/show/'+id);
  }
/*
  registerEntity(entity: Entity, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('_id', entity._id);
    return this.http.post<any>(endpoint + 'RestEntities/save', entity, file);
  }*/

  registerEntity(entity: Entity, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    // Converta 'entity' para 'any' para evitar o erro de índice
    const entityAny: any = entity;

    // Adiciona cada propriedade de 'entity' ao formData
    Object.keys(entityAny).forEach(key => {
        if (entityAny[key] !== undefined) {
            formData.append(key, entityAny[key]);
        }
    });

    return this.http.post<any>(endpoint + 'RestEntities/save', formData);
}

updateEntity(entity: Entity, file: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file);

  // Converta 'entity' para 'any' para evitar o erro de índice
  const entityAny: any = entity;

  // Adiciona cada propriedade de 'entity' ao formData
  Object.keys(entityAny).forEach(key => {
      if (entityAny[key] !== undefined) {
          formData.append(key, entityAny[key]);
      }
  });

  return this.http.post<any>(endpoint + 'RestEntities/update/'+entity._id, formData);
}


  getEntityDonations(id:String|null): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + 'RestDonations/getEntityDonations/'+id);
  }

  getDonatorDonations(id:String|null): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + 'RestDonations/getDonatorDonations/'+id);
  }

  getDonation(id:String|null): Observable<Donation> {
    return this.http.get<Donation>(endpoint + 'RestDonations/show/'+id);
  }

  registerDonation(donation: Donation): Observable<any> {
    return this.http.post<Donation>(endpoint + 'RestDonations/save', donation);
  }

  registerRequest(donation:Donation):Observable<any>{
    return this.http.post<Donation>(endpoint + 'RestRequests/save/'+donation._id,donation);
  }

  /////////////////////////////////////////////////
  /*VER SE SAO PRECISOS OS DOIS*/
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(endpoint + 'file_upload', formData);
  }

  uploadFileWithData(file: File, title:string): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    return this.http.post<any>(endpoint + 'file_and_data_upload', formData);
  }

  //////////////////////////////////////////////

  getDonators(): Observable<Donator[]> {
    return this.http.get<Donator[]>(endpoint + 'RestDonators/get');
  }

  getDonator(id:String|null): Observable<Donator> {
    return this.http.get<Donator>(endpoint + 'RestDonators/show/'+id);
  }

  registerDonator(donator: Donator, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    // Converta 'doadores' para 'any' para evitar o erro de índice
    const donatorAny: any = donator;

    // Adiciona cada propriedade de 'doadores' ao formData
    Object.keys(donatorAny).forEach(key => {
        if (donatorAny[key] !== undefined) {
            formData.append(key, donatorAny[key]);
        }
    });

    return this.http.post<any>(endpoint + 'RestDonators/save', formData);
  }

  updateDonator(donator: Donator, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    // Converta 'entity' para 'any' para evitar o erro de índice
    const donatorAny: any = donator;

    // Adiciona cada propriedade de 'entity' ao formData
    Object.keys(donatorAny).forEach(key => {
      if (donatorAny[key] !== undefined) {
          formData.append(key, donatorAny[key]);
      }
    });

    return this.http.post<any>(endpoint + 'RestDonators/update/'+donator._id, formData);
  }










  /////////////////////////////////////////////
  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(endpoint + 'RestPartners/get');
  }

  getPartner(id:String|null): Observable<Partner> {
    return this.http.get<Partner>(endpoint + 'RestPartners/show/'+id);
  }

  registerPartner(partner: Partner, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    // Converta 'entity' para 'any' para evitar o erro de índice
    const partnerAny: any = partner;

    // Adiciona cada propriedade de 'entity' ao formData
    Object.keys(partnerAny).forEach(key => {
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

    Object.keys(partnerAny).forEach(key => {
      if (partnerAny[key] !== undefined) {
          formData.append(key, partnerAny[key]);
      }
    });

    return this.http.post<any>(endpoint + 'RestPartners/update/'+partner._id, formData);
  }
  
}
