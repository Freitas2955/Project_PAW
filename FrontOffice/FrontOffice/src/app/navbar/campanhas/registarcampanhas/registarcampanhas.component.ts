import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { RestService } from '../../../services/rest.service';
import { Campaign } from '../../../model/campaign';
import { FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CampaignsService } from '../../../services/campaigns.service';

@Component({
  selector: 'app-registarcampanhas',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './registarcampanhas.component.html',
  styleUrl: './registarcampanhas.component.css'
})

export class RegistarcampanhasComponent {
  campaign: Campaign;
  confpassword?: String;
  selectedFile: File;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private restService: CampaignsService,private builder: FormBuilder, private formBuilder: FormBuilder) {
    this.campaign = new Campaign();
    const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
    this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
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
