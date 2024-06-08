import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { RestService } from '../../../services/rest.service';
import { Campaign } from '../../../model/campaign';
import { FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CampaignsService } from '../../../services/campaigns.service';
import { BarComponent } from '../../../bar/bar.component';

@Component({
  selector: 'app-registarcampanhas',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule,ReactiveFormsModule,BarComponent],
  templateUrl: './registarcampanhas.component.html',
  styleUrl: './registarcampanhas.component.css'
})

export class RegistarcampanhasComponent {
  campaign: Campaign;
  confpassword?: String;
  selectedFile: File;
  imagePreview: string | ArrayBuffer | null = null;
  username: String | null;
  userId: String;
  type: String | null;

  constructor(private restService: CampaignsService,private builder: FormBuilder, private formBuilder: FormBuilder) {
    this.campaign = new Campaign();
    const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
    this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
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
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.selectedFile=file;
    }
  }

  submitForm(): void {
    this.campaign.partnerId=this.userId;
    if(this.username){
    this.campaign.partnerName=this.username;
    }else{
      this.campaign.partnerName=""
    }
    console.log(this.campaign);
      
      this.restService.registerCampaign(this.campaign, this.selectedFile).subscribe(
        (response) => {
          console.log('Campanha registada com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao registar campanha:', error);
        }
      );
  }
}
