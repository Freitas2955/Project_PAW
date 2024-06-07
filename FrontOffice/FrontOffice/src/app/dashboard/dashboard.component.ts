import { Component, OnInit } from '@angular/core';
import { PlotlyService } from '../services/plotly.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Donator } from '../model/donator';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Donation } from '../model/donation';
import { DonatorsService } from '../services/donators.service';
import { DonationsService } from '../services/donations.service';
import { BarComponent } from '../bar/bar.component';
import { EntitiesService } from '../services/entities.service';
import { Entity } from '../model/entity';
import { PurchasesService } from '../services/purchases.service';
import { Purchase } from '../model/purchase';
@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule, BarComponent],
})
export class DashboardComponent implements OnInit {
  donator: Donator = {} as Donator;
  donatorId: string | null = null;
  imageUrl: SafeUrl = '';
  donations: Donation[] = [];
  totalPoints: number = 0;
  totalSpentPoints: number = 0;
  totalContributions: number = 0;
  username: String | null;
  userId: String;
  entityId: String | null;
  type: String | null;
  entity: Entity = new Entity();
  purchases: Purchase[] = [new Purchase()];
  constructor(
    private plot: PlotlyService,
    public rest: DonatorsService,
    private route: ActivatedRoute,
    private rest2: DonationsService,
    private sanitizer: DomSanitizer,
    public rest3: RestService,
    public rest4: EntitiesService,
    public rest5: PurchasesService
  ) {
    const localStorageData = localStorage.getItem('currentUser');
    if (localStorageData) {
      const userData = JSON.parse(localStorageData);
      this.username = userData.username;
      this.userId = userData.userId;
      this.type = userData.userType;
    } else {
      this.username = '';
      this.userId = '';
      this.type = '';
    }
    this.entityId = this.userId;
  }

  ngOnInit(): void {
    if (this.type == 'Donator') {
      this.donatorId = this.route.snapshot.paramMap.get('id');
      this.getDonator();
      this.fazerPedidoPorDoador();
      this.rest5.getDonatorPurchases(this.userId).subscribe(
        (response: any) => {
          console.log('Resposta recebida:', response);
          this.purchases = response.purchases;
        },
        (error) => {
          console.error('Erro ao procurar campanha', error);
        }
      );
      const idTemp = this.route.snapshot.params['id'];
      this.rest2.getDonatorDonations(idTemp).subscribe((data: any) => {
        this.donations = data.donations;

        if (this.donations && this.purchases) {
          // Unir doações e compras em um único array
          const allData = [...this.donations, ...this.purchases];

          // Ordenar o array combinado por data
          allData.sort(
            (a, b) =>
              new Date(a.updated_at).getTime() -
              new Date(b.updated_at).getTime()
          );

          const dates: string[] = [];
          const cumulativePoints: number[] = [];

          this.totalPoints = 0;
          this.totalContributions = allData.length;

          for (const data of allData) {
            let donationOrPurchase: Donation | Purchase;

            if ('points' in data) {
              donationOrPurchase = data as Donation;
              cumulativePoints.push(
                this.totalPoints + Number(this.totalPoints)
              );
              this.totalPoints += Number(donationOrPurchase.points);
            } else {
              donationOrPurchase = data as Purchase;
              cumulativePoints.push(
                this.totalPoints - Number(donationOrPurchase.cost)
              );
              this.totalPoints -= Number(donationOrPurchase.cost);
            }
            const date = new Date(donationOrPurchase.updated_at);
            dates.push(date.toLocaleDateString());
          }

          this.plot.plotLine(
            'Evolução do número de pontos e compras',
            'plot',
            dates,
            cumulativePoints
          );
        }
      });
    } else if (this.type == 'Entity') {
      const idTemp = this.route.snapshot.params['id'];
      this.rest2.getEntityDonations(idTemp).subscribe((data: any) => {
        this.donations = data.donations;

        if (this.donations) {
          this.donations.sort(
            (a, b) =>
              new Date(a.updated_at).getTime() -
              new Date(b.updated_at).getTime()
          );

          const dates: string[] = [];
          const cumulativePoints: number[] = [];

          this.totalPoints = 0;
          this.totalContributions = this.donations.length;

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
          console.log(camisolasCount);
          const barData = {
            x: [
              'Camisolas',
              'Casacos',
              'Calças',
              'Sapatos',
              'Acessórios',
              'Interior',
              'Dinheiro',
            ],
            y: [
              camisolasCount,
              casacosCount,
              calcasCount,
              sapatosCount,
              acessoriosCount,
              interiorCount,
              dinheiroCount,
            ],
            type: 'bar',
          };
          // Plota o gráfico de barras
          this.plot.plotBar(
            'Total de doações por tipo',
            'plot',
            barData.x,
            barData.y
          );
        }
        this.entityId = this.route.snapshot.paramMap.get('id');
      });
    }
  }

  getDonator(): void {
    this.rest.getDonator(this.donatorId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.donator = response.donator;
        let imageObservable;
        imageObservable = this.rest3.getDonatorImage(this.donator._id);
        imageObservable.subscribe((imageBlob: Blob | MediaSource) => {
          const objectURL = URL.createObjectURL(imageBlob);
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      },
      (error: any) => {
        console.error('Erro ao procurar doador', error);
      }
    );
  }

  fazerPedidoPorDoador() {
    this.rest2.getDonatorDonations(this.donatorId).subscribe(
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
      (error: any) => {
        console.error('Erro ao procurar doacoes', error);
      }
    );
  }

  getEntity(): void {
    this.rest4.getEntity(this.entityId).subscribe(
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
