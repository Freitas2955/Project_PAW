import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntidadesComponent } from '../navbar/instituicoes/entidades/entidades.component';
import { Entity } from '../model/entity';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [EntidadesComponent,CommonModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  
  entities?: Entity[];
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  selecionarInstituicao(instituicao: string): void {
    this.dialogRef.close(instituicao);
  }


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
}
