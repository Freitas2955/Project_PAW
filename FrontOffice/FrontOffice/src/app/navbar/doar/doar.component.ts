import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar.component';
import { Entity } from '../../model/entity';
import { RestService } from '../../rest.service';
import { CommonModule } from '@angular/common';
import { Donation } from '../../model/donation';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Points } from '../../model/points';

@Component({
  selector: 'app-doar',
  standalone: true,
  imports: [NavbarComponent, CommonModule,FormsModule],
  templateUrl: './doar.component.html',
  styleUrl: './doar.component.css',
})

export class DoarComponent {
  instituicaoSelecionada: String | undefined;
  totalPontos:number=0;
  points:Points=new Points();
  popupVisible = false;
  simularVisible = false;
  entityId: String | undefined;
  entities?: Entity[];
  donation: Donation=new Donation();
  constructor(public rest: RestService,private restService: RestService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.donation.donatorId = this.route.snapshot.paramMap.get('donatorId');
    this.getEntities();
    this.getPoints();
  }

  getPoints(): void {
    this.rest.getPoints().subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.points = response.points;
      },
      (error) => {
        console.error('Erro ao procurar pontos', error);
      }
    );
  }

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

  abrirSimulacao() {
    this.simularVisible = true;
    this.totalPontos=this.points.camisola * this.donation.camisolas + this.points.casaco * this.donation.casacos + this.points.calcas * this.donation.calcas + this.points.sapatos * this.donation.sapatos + this.points.acessorios * this.donation.acessorios + this.points.roupainterior * this.donation.interior + this.points.dinheiro * this.donation.dinheiro;
  }

  fecharSimulacao() {
    this.simularVisible = false;
  }

  selecionarInstituicao(
    instituicao: String | undefined,
    idInstituicao: String | undefined
  ) {
    this.instituicaoSelecionada = instituicao;
    this.entityId = idInstituicao;
    this.fecharPopup();
  }

  submitForm(): void {
    this.donation.entityId=this.entityId;
    this.donation.entityName=this.instituicaoSelecionada;
    console.log(this.donation);
    this.restService.registerDonation(this.donation).subscribe(
      (response) => {
        console.log('Doação registada com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao registar Doação:', error);
      }
    );
  }
}
