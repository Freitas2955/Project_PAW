import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar.component';
import { BarComponent } from '../../bar/bar.component';
import { Purchase } from '../../model/purchase';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PurchasesService } from '../../services/purchases.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [NavbarComponent, BarComponent,RouterModule,CommonModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css',
})
export class ComprasComponent {
  purchases: Purchase[] = [new Purchase()];
  username: String | null;
  userId: String;
  type: String | null;
  partnerId?: String | null;

  constructor(
    public rest: PurchasesService,
    private route: ActivatedRoute,
    private router: Router
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

  ngOnInit(): void {
    this.getPurchases();
  }

  getPurchases(): void {
    if (this.userId && this.type == 'Partner') {
      this.rest.getPartnerPurchases(this.userId).subscribe(
        (response: any) => {
          console.log('Resposta recebida:', response);
          this.purchases = response.purchases;
          for (let i = 0; i < this.purchases.length; i++) {
            let isoDate = this.purchases[i].updated_at;
            let date = new Date(isoDate);
  
            let options: Intl.DateTimeFormatOptions = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
  
            this.purchases[i].partnerName = date.toLocaleDateString(
              'pt-pt',
              options
            );
          }
        },
        (error) => {
          console.error('Erro ao procurar campanha', error);
        }
      );
    } else if (this.userId && this.type == 'Donator') {
      this.rest.getDonatorPurchases(this.userId).subscribe(
        (response: any) => {
          console.log('Resposta recebida:', response);
          this.purchases = response.purchases;
          for (let i = 0; i < this.purchases.length; i++) {
            let isoDate = this.purchases[i].updated_at;
            let date = new Date(isoDate);
  
            let options: Intl.DateTimeFormatOptions = {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            };
  
            this.purchases[i].donatorName = date.toLocaleDateString(
              'pt-pt',
              options
            );
          }
        },
        (error) => {
          console.error('Erro ao procurar campanha', error);
        }
      );
    }
  }
}
