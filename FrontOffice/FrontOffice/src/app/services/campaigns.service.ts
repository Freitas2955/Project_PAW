import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaign } from '../model/campaign';

const endpoint = 'http://127.0.0.1:3000/';

const httpOptions = {
 
};

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
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
      'type': String(this.type)
    });
  }

  private getHttpOptions() {
    return { headers: this.headers };
  }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(endpoint + 'RestCampaigns/get', this.getHttpOptions());
  }

  getPartnerCampaigns(partnerId:String): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(endpoint + 'RestCampaigns/get/'+partnerId, this.getHttpOptions());
  }


  getCampaign(id: String | null): Observable<Campaign> {
    return this.http.get<Campaign>(endpoint + 'RestCampaigns/show/' + id, this.getHttpOptions());
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

  buyCampaign(campaignId: String|undefined|null,donatorId:String){
    return this.http.get<any>(endpoint + 'RestDonators/buy/'+campaignId+'/'+donatorId, this.getHttpOptions());
  }

  deleteCampaign(campaignId: String|undefined|null){
    return this.http.get<any>(endpoint + 'RestCampaigns/delete/'+campaignId, this.getHttpOptions());
  }
}
