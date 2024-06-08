import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Campaign } from '../../../model/campaign';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CampaignsService } from '../../../services/campaigns.service';
import { BarComponent } from '../../../bar/bar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campanhas',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    RouterModule,
    BarComponent,
    FormsModule,
  ],
  templateUrl: './campanhas.component.html',
  styleUrl: './campanhas.component.css',
})
export class CampanhasComponent {
  searchPartnerName: string = '';
  searchName: string = '';
  campaigns: Campaign[] = [new Campaign()];
  filteredCampaigns: Campaign[] = [new Campaign()];
  username: String | null;
  userId: String;
  type: String | null;
  partnerId?: String | null;

  constructor(
    public rest: CampaignsService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    public rest2: RestService
  ) {
    const localStorageData = localStorage.getItem('currentUser');
    if (localStorageData) {
      const userData = JSON.parse(localStorageData);
      this.username = userData.username;
      this.userId = userData.userId;
      this.type = userData.userType;
    } else {
      this.username = '';
      this.userId = '';
      this.type = '';
    }
    this.partnerId = this.route.snapshot.paramMap.get('idParceiro');
  }

  ngOnInit(): void {
    if (this.type == 'Partner') {
      this.getPartnerCampaigns();
    } else {
      this.getCampaigns();
    }
  }

  getCampaigns(): void {
    console.log('getCampaigns chamado');
    this.rest.getCampaigns().subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.campaigns = response.campaigns;
        this.campaigns.forEach((campaign) => {
          let imageObservable;
          imageObservable = this.rest2.getCampaignImage(campaign._id);
          imageObservable.subscribe((imageBlob) => {
            const objectURL = URL.createObjectURL(imageBlob);
            campaign.imageUrl =
              this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });
        });
        this.filteredCampaigns = this.campaigns;
      },
      (error) => {
        console.error('Erro ao procurar campanha', error);
      }
    );
  }

  getPartnerCampaigns(): void {
    console.log('getPartnerCampaigns chamado');
    this.rest.getPartnerCampaigns(this.userId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.campaigns = response.campaigns;
        this.campaigns.forEach((campaign) => {
          let imageObservable;
          imageObservable = this.rest2.getCampaignImage(campaign._id);
          imageObservable.subscribe((imageBlob) => {
            const objectURL = URL.createObjectURL(imageBlob);
            campaign.imageUrl =
              this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });
        });
        this.filteredCampaigns = this.campaigns;
      },
      (error) => {
        console.error('Erro ao procurar campanha', error);
      }
    );
  }

  comprar(campaignId: String | undefined, donatorId: String): void {
    this.rest.buyCampaign(campaignId, donatorId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
      },
      (error) => {
        console.error('Erro ao procurar campanha', error);
      }
    );
  }

  eliminar(campaignId: String | undefined): void {
    this.rest.deleteCampaign(campaignId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
      },
      (error) => {
        console.error('Erro ao procurar campanha', error);
      }
    );
    window.location.reload();
  }

  seeListOfCampaigns() {
    this.router.navigate(['/campanhas']);
  }

  filterCampaigns(): void {
    this.filteredCampaigns = this.campaigns.filter((campaign) => {
      const matchesPartnerName = campaign.partnerName
        .toLowerCase()
        .includes(this.searchPartnerName.toLowerCase());
      const matchesName = campaign.name
        .toLowerCase()
        .includes(this.searchName.toLowerCase());
      return matchesName && matchesPartnerName;
    });
  }

  onSearchChange(): void {
    this.filterCampaigns();
  }
}
