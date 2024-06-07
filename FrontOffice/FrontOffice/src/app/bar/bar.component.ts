import { Component } from '@angular/core';
import { AuthRestServiceService } from '../services/auth-rest-service.service';
import { Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css',
})
export class BarComponent {
  type: String | null;
  userId: String;
  constructor(
    private router: Router,
    private auth: AuthRestServiceService,
    private rest: RestService,
    private sanitizer: DomSanitizer
  ) {
    const localStorageData = localStorage.getItem('currentUser');
    if (localStorageData) {
      const userData = JSON.parse(localStorageData);
      this.userId = userData.userId;
      this.type = userData.userType;
    } else {
      this.type = '';
      this.userId = '';
    }
  }

  dashBoard() {
    this.router.navigate(['/dashboard/' + this.userId]);
  }

  doar() {
    this.router.navigate(['/doar/']);
  }

  instituicoes() {
    this.router.navigate(['/entidades/']);
  }

  parceiros() {
    this.router.navigate(['/parceiros/']);
  }

  campanhas() {
    this.router.navigate(['/campanhas/']);
  }

  compras() {
    this.router.navigate(['/compras/']);
  }

  doacoes() {
    this.router.navigate(['/doacoes/']);
  }

  doadores(){
    this.router.navigate(['/doadores/']);
  }
}
