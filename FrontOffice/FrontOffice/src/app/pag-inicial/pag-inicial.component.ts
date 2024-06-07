import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pag-inicial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pag-inicial.component.html',
  styleUrl: './pag-inicial.component.css',
})
export class PagInicialComponent {
  show: boolean = false;
  constructor(private router: Router) {}
  loadLogin() {
    this.router.navigate(['/login']);
  }

  opcoes() {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  registerEntity() {
    this.router.navigate(['/registarentidade']);
  }

  registerDonator() {
    this.router.navigate(['/registardoador']);
  }

  registerPartner() {
    this.router.navigate(['/registarparceiro']);
  }
}
