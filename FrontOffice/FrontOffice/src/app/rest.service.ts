import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from './model/entity';

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

  registerEntity(entity: Entity): Observable<any> {
    return this.http.post<Entity>(endpoint + 'RestEntities/save', entity);
  }
}
