import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pag-inicial',
  standalone: true,
  imports: [],
  templateUrl: './pag-inicial.component.html',
  styleUrl: './pag-inicial.component.css'
})
export class PagInicialComponent {
  constructor(private router: Router){}
  loadLogin(){
    this.router.navigate(['/login']);
  }
}
