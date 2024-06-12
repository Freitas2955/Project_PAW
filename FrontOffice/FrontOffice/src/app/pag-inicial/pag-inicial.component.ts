import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Entity } from '../model/entity';
import { EntitiesService } from '../services/entities.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RestService } from '../services/rest.service';
import { PartnersService } from '../services/partners.service';
import { Partner } from '../model/partner';
@Component({
  selector: 'app-pag-inicial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pag-inicial.component.html',
  styleUrl: './pag-inicial.component.css',
})
export class PagInicialComponent {
  show: boolean = false;
  searchName: string = '';
  searchCity: string = '';
  searchPhone: string = '';
  entities: Entity[]=[new Entity()];
  partners: Partner[] = [new Partner()];
  filteredPartners: Partner[] = [new Partner()];
  filteredEntities: any[] = [];
  constructor(
    public rest: EntitiesService,
    private route: ActivatedRoute,
    private router: Router,private sanitizer: DomSanitizer,public rest2: RestService,public rest3:PartnersService
  ) {}
  loadLogin() {
    this.router.navigate(['/login']);
  }

  opcoes() {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  registerEntity() {
    this.router.navigate(['/registarentidade']);
  }

  registerDonator() {
    this.router.navigate(['/registardoador']);
  }

  registerPartner() {
    this.router.navigate(['/registarparceiro']);
  }

  ngOnInit(): void {
    this.getEntities();
    this.getPartners();
  }

  getEntities(): void {
    console.log('getEntities chamado');
    this.rest.getEntities().subscribe((response: any) => {  
      console.log('Resposta recebida:', response);
      this.entities = response.entities;  
      this.entities.forEach(entity=>{
        let imageObservable;
        imageObservable = this.rest2.getEntityImage(entity._id);
        imageObservable.subscribe((imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          entity.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
        this.filteredEntities=this.entities;
      })
    }, error => {
      console.error('Erro ao procurar entidade', error);
    });

  }

  getPartners(): void {
    console.log('getPartners chamado');
    this.rest3.getPartners().subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.partners = response.partners;
        this.partners.forEach((partner) => {
          let imageObservable;
          imageObservable = this.rest2.getPartnerImage(partner._id);
          imageObservable.subscribe((imageBlob) => {
            const objectURL = URL.createObjectURL(imageBlob);
            partner.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });
        });
        this.filteredPartners = this.partners;
      },
      (error) => {
        console.error('Erro ao procurar parceiro', error);
      }
    );
  }

}
