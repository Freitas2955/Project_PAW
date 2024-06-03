import { Component, OnInit } from '@angular/core';
import { PlotlyService } from '../../../plotly.service';
import { NavbarComponent } from '../../navbar.component';
import { Donator } from '../../../model/donator';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Donation } from '../../../model/donation';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule],
})
export class DashboardComponent implements OnInit {
  donator: Donator = {} as Donator;
  donatorId: string | null = null;
  imageUrl: SafeUrl = '';
  donations: Donation [] = [];
  totalPoints: number=0;
  totalDonations: number=0;

  constructor(
    private plot: PlotlyService,
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (this.donations) {
      this.donations.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
    
      const dates: string[] = [];
      const cumulativePoints: number[] = [];
    
      this.totalDonations = this.donations.length;
      this.totalPoints = 0; // Certifique-se de redefinir totalPoints
    
      for (const donation of this.donations) {
        const date = new Date(donation.updated_at);
        dates.push(date.toLocaleDateString());
        this.totalPoints += Number(donation.points);
        cumulativePoints.push(this.totalPoints);
      }
    
      //this.plot.plotLine("Evolução do número de pontos", "plot", dates, cumulativePoints);
    }

    
    
    this.donatorId = this.route.snapshot.paramMap.get('id');
    this.getDonator();
    this.fazerPedidoPorDoador();
  }

  getDonator(): void {
    this.rest.getDonator(this.donatorId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.donator = response.donator;
        let imageObservable;
        imageObservable = this.rest.getDonatorImage(this.donator._id);
        imageObservable.subscribe((imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      },
      (error) => {
        console.error('Erro ao procurar doador', error);
      }
    );
  }

  fazerPedidoPorDoador() {
    this.rest.getDonatorDonations(this.donatorId).subscribe(
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
