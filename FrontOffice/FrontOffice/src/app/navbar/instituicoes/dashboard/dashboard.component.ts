import { Component, OnInit } from '@angular/core';
import { BarComponent } from '../../../bar/bar.component';
import { NavbarComponent } from '../../navbar.component';
import { PlotlyService } from '../../../services/plotly.service';
import { Entity } from '../../../model/entity';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Donation } from '../../../model/donation';
import { EntitiesService } from '../../../services/entities.service';
import { DonationsService } from '../../../services/donations.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,BarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit{
  entity: Entity = {} as Entity;
  entityId: string | null = null;
  imageUrl: SafeUrl = '';
  donations: Donation [] = [];

  totalPoints: number=0;
  totalSpentPoints: number=0;
  totalDonations: number=0;

  constructor(
    private plot: PlotlyService,
    public rest: EntitiesService,
    private route: ActivatedRoute,
    private rest2: DonationsService,
    private sanitizer: DomSanitizer,
    public rest3: RestService
  ) {}

  ngOnInit(): void {
    const idTemp = this.route.snapshot.params['id'];
    this.rest2.getDonatorDonations(idTemp).subscribe((data: any) => {
      this.donations = data.donations;

      if (this.donations) {
        this.donations.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());

        const dates: string[] = [];
        const cumulativePoints: number[] = [];

        this.totalPoints = 0;
        this.totalDonations = this.donations.length;

        // Inicializa as contagens de cada tipo de peça
        let camisolasCount = 0;
        let casacosCount = 0;
        let calcasCount = 0;
        let sapatosCount = 0;
        let acessoriosCount = 0;
        let interiorCount = 0;
        let dinheiroCount = 0;

        for (const donation of this.donations) {
          const date = new Date(donation.updated_at);
          dates.push(date.toLocaleDateString());
          this.totalPoints += Number(donation.points);
          cumulativePoints.push(this.totalPoints);
          // Incrementa as contagens de cada tipo de peça
          camisolasCount += donation.camisolas || 0;
          casacosCount += donation.casacos || 0;
          calcasCount += donation.calcas || 0;
          sapatosCount += donation.sapatos || 0;
          acessoriosCount += donation.acessorios || 0;
          interiorCount += donation.interior || 0;
          dinheiroCount += donation.dinheiro || 0;
        }
        this.plot.plotLine("Evolução do número de pontos", "plot", dates, cumulativePoints);
        // Cria os dados para o gráfico de barras
        const barData = {
          x: ['Camisolas', 'Casacos', 'Calças', 'Sapatos', 'Acessórios', 'Interior', 'Dinheiro'],
          y: [camisolasCount, casacosCount, calcasCount, sapatosCount, acessoriosCount, interiorCount, dinheiroCount],
          type: 'bar'
        };
        // Plota o gráfico de barras
        this.plot.plotBar("Distribuição das Peças Doada", "barPlot", barData.x, barData.y);
      }
      this.entityId = this.route.snapshot.paramMap.get('id');
    });
  }

  getEntity(): void {
    this.rest.getEntity(this.entityId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.entity = response.entity;
        let imageObservable;
        imageObservable = this.rest3.getEntityImage(this.entity._id);
        imageObservable.subscribe((imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      },
      (error: any) => {
        console.error('Erro ao procurar doador', error);
      }
    );
  }

  fazerPedidoPorEntity() {
    this.rest2.getEntityDonations(this.entityId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.donations = response.donations;
        for (let i = 0; i < this.donations.length; i++) {
          let isoDate = this.donations[i].updated_at;
          let date = new Date(isoDate);

          let options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };

          this.donations[i].donatorName = date.toLocaleDateString(
            'pt-pt',
            options
          );
        }
      },
      (error) => {
        console.error('Erro ao procurar doacoes', error);
      }
    );
  }
}
