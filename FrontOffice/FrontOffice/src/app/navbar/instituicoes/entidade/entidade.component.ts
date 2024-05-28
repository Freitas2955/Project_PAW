import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Entity } from '../../../model/entity';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.entity = new Entity();
  }

  ngOnInit(): void {
    this.entidadeId = this.route.snapshot.paramMap.get('id');
    this.getEntity();
  }

  getEntity(): void {
    this.rest.getEntity(this.entidadeId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.entity = response.entity;
      },
      (error) => {
        console.error('Erro ao procurar entidade', error);
      }
    );
  }
}
