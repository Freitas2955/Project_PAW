import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaign } from '../model/campaign';

const endpoint = 'http://127.0.0.1:3000/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(endpoint + 'campaigns/get');
  }

  getCampaign(id: String | null): Observable<Campaign> {
    return this.http.get<Campaign>(endpoint + 'RestCampaigns/show/' + id);
  }


  registerCampaign(campaign: Campaign, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const campaignAny: any = campaign;

    Object.keys(campaignAny).forEach((key) => {
      if (campaignAny[key] !== undefined) {
        formData.append(key, campaignAny[key]);
      }
    });

    return this.http.post<any>(endpoint + 'RestCampaigns/save', formData);
  }
}
