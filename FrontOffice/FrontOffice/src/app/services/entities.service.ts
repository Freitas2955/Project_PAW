import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity } from '../model/entity';
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
export class EntitiesService {

  constructor(private http: HttpClient) {}

  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(endpoint + 'entities/get');
  }

  getEntity(id: String | null): Observable<Entity> {
    return this.http.get<Entity>(endpoint + 'RestEntities/show/' + id);
  }


  registerEntity(entity: Entity, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const entityAny: any = entity;

    Object.keys(entityAny).forEach((key) => {
      if (entityAny[key] !== undefined) {
        formData.append(key, entityAny[key]);
      }
    });

    return this.http.post<any>(endpoint + 'RestEntities/save', formData);
  }

  updateEntity(entity: Entity, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const entityAny: any = entity;

    Object.keys(entityAny).forEach((key) => {
      if (entityAny[key] !== undefined) {
        formData.append(key, entityAny[key]);
      }
    });

    return this.http.post<any>(
      endpoint + 'RestEntities/update/' + entity._id,
      formData
    );
  }



}