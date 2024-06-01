import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../popup/popup.component';
import { NavbarComponent } from '../navbar.component';
import { Entity } from '../../model/entity';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-doar',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './doar.component.html',
  styleUrl: './doar.component.css',
})
export class DoarComponent {
  instituicaoSelecionada: string = '';
  popupVisible = false;
  entities?: Entity[];
  constructor(, rest: RestService,
    ) {}

  getEntities(): void {
    console.log('getEntities chamado');
    this.rest.getEntities().subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.entities = response.entities;
      },
      (error) => {
        console.error('Erro ao procurar entidade', error);
      }
    );
  }

  abrirPopup() {
    this.popupVisible = true;
  }

  fecharPopup() {
    this.popupVisible = false;
  }

  selecionarInstituicao(instituicao: string) {
    this.instituicaoSelecionada = instituicao;
    this.fecharPopup();
  }
}
