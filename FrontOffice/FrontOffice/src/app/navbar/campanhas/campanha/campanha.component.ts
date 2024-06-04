import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Campaign } from '../../../model/campaign';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CampaignsService } from '../../../services/campaigns.service';

@Component({
  selector: 'app-campanha',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './campanha.component.html',
  styleUrl: './campanha.component.css'
})
export class CampanhaComponent {
  campaign: Campaign;
  campaignId: string|null=null;

  selectedFile: File;

  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    public rest: CampaignsService,
    private route: ActivatedRoute,
    private router: Router,private sanitizer: DomSanitizer,public rest2: RestService
  ) {
    this.campaign = new Campaign();
    const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
    this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
  }

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id');
    this.getCampaign();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getCampaign(): void {
    this.rest.getCampaign(this.campaignId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.campaign = response.entity;
        let imageObservable;
        imageObservable = this.rest2.getCampaignImage(this.campaign._id);
        imageObservable.subscribe((imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          this.campaign.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });

      },
      (error) => {
        console.error('Erro ao procurar campanha', error);
      }
    );
  }
}
