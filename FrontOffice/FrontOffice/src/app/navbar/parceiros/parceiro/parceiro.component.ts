import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Partner } from '../../../model/partner';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { PartnersService } from '../../../services/partners.service';
import { BarComponent } from '../../../bar/bar.component';

@Component({
  selector: 'app-parceiro',
  standalone: true,
  imports: [NavbarComponent, CommonModule,BarComponent],
  templateUrl: './parceiro.component.html',
  styleUrl: './parceiro.component.css'
})

export class ParceiroComponent {
  partner: Partner;
    partnerId: string|null=null;

    selectedFile: File;

    imagePreview: string | ArrayBuffer | null = null;


    constructor(
      public rest: PartnersService,
      private route: ActivatedRoute,
      private router: Router,private sanitizer: DomSanitizer,public rest2: RestService,
    ) {
      this.partner = new Partner();
      const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
      this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
    }

    ngOnInit(): void {
      this.partnerId = this.route.snapshot.paramMap.get('id');
      this.getPartner();
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

    getPartner(): void {
      this.rest.getPartner(this.partnerId).subscribe(
        (response: any) => {
          console.log('Resposta recebida:', response);
          this.partner = response.partner;
          let imageObservable;
          imageObservable = this.rest2.getPartnerImage(this.partner._id);
          imageObservable.subscribe((imageBlob) => {
            const objectURL = URL.createObjectURL(imageBlob);
            this.partner.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });
        },
        (error) => {
          console.error('Erro ao procurar entidade', error);
        }
      );
    }
}
