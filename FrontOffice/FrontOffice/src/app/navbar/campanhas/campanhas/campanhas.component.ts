import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Campaign } from '../../../model/campaign';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CampaignsService } from '../../../services/campaigns.service';

@Component({
  selector: 'app-campanhas',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule],
  templateUrl: './campanhas.component.html',
  styleUrl: './campanhas.component.css'
})

export class CampanhasComponent {
  campaigns: Campaign[]=[new Campaign()];

  constructor(
    public rest: CampaignsService,
    private route: ActivatedRoute,
    private router: Router,private sanitizer: DomSanitizer,public rest2: RestService
  ) {}

  ngOnInit(): void {
    this.getCampaigns();
  }

  getCampaigns(): void {
    console.log('getCampaigns chamado');
    this.rest.getCampaigns().subscribe((response: any) => {  
      console.log('Resposta recebida:', response);
      this.campaigns = response.campaigns;  
      this.campaigns.forEach(campaign=>{
        let imageObservable;
        imageObservable = this.rest2.getCampaignImage(campaign._id);
        imageObservable.subscribe((imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          campaign.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      })
    }, error => {
      console.error('Erro ao procurar campanha', error);
    });
  }

  seeListOfEntities() {
    this.router.navigate(['/campanhas']);
  }
}
