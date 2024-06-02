import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Entity } from '../../../model/entity';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-entidades',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule],
  templateUrl: './entidades.component.html',
  styleUrl: './entidades.component.css',
})
export class EntidadesComponent implements OnInit {
  entities: Entity[]=[new Entity()];

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router,private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    console.log('getEntities chamado');
    this.rest.getEntities().subscribe((response: any) => {  
      console.log('Resposta recebida:', response);
      this.entities = response.entities;  
      this.entities.forEach(entity=>{
        let imageObservable;
        imageObservable = this.rest.getEntityImage(entity._id);
        imageObservable.subscribe((imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          entity.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      })
    }, error => {
      console.error('Erro ao procurar entidade', error);
    });
  }

  seeListOfEntities() {
    this.router.navigate(['/entidades']);
  }
}
