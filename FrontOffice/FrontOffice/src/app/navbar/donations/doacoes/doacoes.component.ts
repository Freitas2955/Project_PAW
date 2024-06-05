import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Supondo que você esteja usando HttpClient para fazer pedidos HTTP
import { RestService } from '../../../services/rest.service';
import { Donation } from '../../../model/donation';
import { CommonModule } from '@angular/common';
import { DonationsService } from '../../../services/donations.service';
import { BarComponent } from '../../../bar/bar.component';

@Component({
  selector: 'app-doacao',
  standalone: true,
  imports: [NavbarComponent, CommonModule,RouterModule,BarComponent],
  templateUrl: './doacoes.component.html',
  styleUrl: './doacoes.component.css',
})
export class DoacoesComponent {
  donations: Donation[] = [];
  isDoador: boolean;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public rest: DonationsService
  ) {
    this.isDoador = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idEntidade = params.get('idEntidade');
      const idDoador = params.get('idDoador');

      if (idEntidade) {
        console.log('entidade');
        this.fazerPedidoPorEntidade(idEntidade);
      } else if (idDoador) {
        console.log('doador');
        this.fazerPedidoPorDoador(idDoador);
      }
    });
  }

  fazerPedidoPorEntidade(idEntidade: string) {
    this.rest.getEntityDonations(idEntidade).subscribe(
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

          this.donations[i].entityName = date.toLocaleDateString(
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

  aprovarDoacao(idDoacao:String|undefined){
    this.rest.approveDonation(idDoacao).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
      },
      (error) => {
        console.error('Erro ao procurar doacoes', error);
      }
    )
    location.reload();
  }

  fazerPedidoPorDoador(idDoador: string) {
    this.rest.getDonatorDonations(idDoador).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.donations = response.donations;
        this.isDoador = true;
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
