import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-registo-entidades',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './registo-entidades.component.html',
  styleUrl: './registo-entidades.component.css'
})
export class RegistoEntidadesComponent {

  constructor() { }

  onSubmit(form: any): void {
    console.log('Form data:', form);
    // Aqui você pode adicionar a lógica para enviar os dados para um servidor
  }

}
