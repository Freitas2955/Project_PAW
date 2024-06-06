import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Donator } from '../../../model/donator';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DonatorsService } from '../../../services/donators.service';
import { BarComponent } from '../../../bar/bar.component';

@Component({
  selector: 'app-doadores',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, BarComponent],
  templateUrl: './doadores.component.html',
  styleUrl: './doadores.component.css',
})
export class DoadoresComponent implements OnInit {
  donators: Donator[] = [new Donator()];
  username: String | null;
  userId: String;
  type: String | null;

  constructor(
    public rest: DonatorsService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    public rest2: RestService
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
    if (this.type == 'Entity') {
      this.getEntityDonators();
    } else {
      this.getDonators();
    }
  }

  getDonators(): void {
    console.log('getDonators chamado');
    this.rest.getDonators().subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.donators = response.donators;
        this.donators.forEach((donator) => {
          let imageObservable;
          imageObservable = this.rest2.getDonatorImage(donator._id);
          imageObservable.subscribe((imageBlob) => {
            const objectURL = URL.createObjectURL(imageBlob);
            donator.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });
          console.log(donator);
        });
      },
      (error) => {
        console.error('Erro ao procurar doador', error);
      }
    );
  }

  getEntityDonators(): void {
    console.log('getDonators chamado');
    this.rest.getEntityDonators(this.userId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.donators = response.donators;
        this.donators.forEach((donator) => {
          let imageObservable;
          imageObservable = this.rest2.getDonatorImage(donator._id);
          imageObservable.subscribe((imageBlob) => {
            const objectURL = URL.createObjectURL(imageBlob);
            donator.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });
          console.log(donator);
        });
      },
      (error) => {
        console.error('Erro ao procurar doador', error);
      }
    );
  }

  seeListOfDonators() {
    this.router.navigate(['/doadores']);
  }
}
