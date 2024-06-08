import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Supondo que você esteja usando HttpClient para fazer pedidos HTTP
import { RestService } from '../../../services/rest.service';
import { Donation } from '../../../model/donation';
import { CommonModule } from '@angular/common';
import { DonationsService } from '../../../services/donations.service';
import { BarComponent } from '../../../bar/bar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doacao',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, BarComponent,FormsModule],
  templateUrl: './doacoes.component.html',
  styleUrl: './doacoes.component.css',
})
export class DoacoesComponent {
  searchDonatorName: string = '';
  searchentityName: string = '';
  searchApproved: string = '';
  donations: Donation[] = [];
  filteredDonations: Donation[] = [];
  username: String | null;
  userId: String;
  type: String | null;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public rest: DonationsService
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
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idEntidade = params.get('idEntidade');
      const idDoador = params.get('idDoador');

      if (this.type == 'Entity') {
        console.log('entidade');
        this.fazerPedidoPorEntidade(this.userId);
      } else if (this.type == 'Donator') {
        console.log('doador');
        this.fazerPedidoPorDoador(this.userId);
      }
      
    });
    
  }

  fazerPedidoPorEntidade(idEntidade: String) {
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
        this.filteredDonations=this.donations;
      },
      (error) => {
        console.error('Erro ao procurar doacoes', error);
      }
    );
  }

  aprovarDoacao(idDoacao: String | undefined) {
    this.rest.approveDonation(idDoacao).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
      },
      (error) => {
        console.error('Erro ao procurar doacoes', error);
      }
    );
    location.reload();
  }

  fazerPedidoPorDoador(idDoador: String) {
    this.rest.getDonatorDonations(idDoador).subscribe(
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
        this.filteredDonations=this.donations;
      },
      (error) => {
        console.error('Erro ao procurar doacoes', error);
      }
    );
  }

  filterDonations(): void {
    this.filteredDonations = this.donations.filter((donation) => {
      const matchesDonatorName = donation.donatorName
        .toLowerCase()
        .includes(this.searchDonatorName.toLowerCase());
      const matchesEntityName = donation.entityName
        .toLowerCase()
        .includes(this.searchentityName.toLowerCase());
      const matchesApproved = donation.approved
        .toString()
        .toLowerCase()
        .includes(this.searchApproved.toLowerCase());
      return matchesDonatorName && matchesEntityName && matchesApproved;
    });
  }

  onSearchChange(): void {
    this.filterDonations();
  }
}
