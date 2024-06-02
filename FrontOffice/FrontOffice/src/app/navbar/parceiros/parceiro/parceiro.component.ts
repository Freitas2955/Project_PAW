import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Partner } from '../../../model/partner';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-parceiro',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './parceiro.component.html',
  styleUrl: './parceiro.component.css'
})

export class ParceiroComponent {
  partner: Partner;
    partnerId: string|null=null;

    selectedFile: File;

    imagePreview: string | ArrayBuffer | null = null;


    constructor(
      public rest: RestService,
      private route: ActivatedRoute,
      private router: Router,private sanitizer: DomSanitizer
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
          imageObservable = this.rest.getPartnerImage(this.partner._id);
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
