import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Entity } from '../../../model/entity';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entidades',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './entidades.component.html',
  styleUrl: './entidades.component.css',
})
export class EntidadesComponent implements OnInit {
  entities?: Entity[];

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    console.log('getEntities chamado');
    this.rest.getEntities().subscribe((response: any) => {  
      console.log('Resposta recebida:', response);
      this.entities = response.entities;  
    }, error => {
      console.error('Erro ao procurar entidade', error);
    });
  }

  seeListOfEntities() {
    this.router.navigate(['/entidades']);
  }
}
