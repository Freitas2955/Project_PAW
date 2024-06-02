  import { Component, OnInit } from '@angular/core';
  import { NavbarComponent } from '../../navbar.component';
  import { Entity } from '../../../model/entity';
  import { RestService } from '../../../rest.service';
  import { ActivatedRoute, Router } from '@angular/router';
  import { CommonModule } from '@angular/common';
  import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
  
  @Component({
    selector: 'app-entidade',
    standalone: true,
    imports: [NavbarComponent, CommonModule],
    templateUrl: './entidade.component.html',
    styleUrl: './entidade.component.css',
  })
  export class EntidadeComponent {
    entity: Entity;
    entidadeId: string|null=null;

    selectedFile: File;

    imagePreview: string | ArrayBuffer | null = null;


    constructor(
      public rest: RestService,
      private route: ActivatedRoute,
      private router: Router,private sanitizer: DomSanitizer
    ) {
      this.entity = new Entity();
      const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
      this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
    }

    ngOnInit(): void {
      this.entidadeId = this.route.snapshot.paramMap.get('id');
      this.getEntity();
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

    getEntity(): void {
      this.rest.getEntity(this.entidadeId).subscribe(
        (response: any) => {
          console.log('Resposta recebida:', response);
          this.entity = response.entity;
          let imageObservable;
          imageObservable = this.rest.getEntityImage(this.entity._id);
          imageObservable.subscribe((imageBlob) => {
            const objectURL = URL.createObjectURL(imageBlob);
            this.entity.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });

        },
        (error) => {
          console.error('Erro ao procurar entidade', error);
        }
      );
    }
  }
