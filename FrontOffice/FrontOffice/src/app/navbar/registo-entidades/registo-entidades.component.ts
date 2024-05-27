import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar.component';
import { RestService } from '../../rest.service';
import { Entity } from '../../model/entity';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registo-entidades',
  standalone: true,
  imports: [NavbarComponent,FormsModule],
  templateUrl: './registo-entidades.component.html',
  styleUrl: './registo-entidades.component.css'
})
export class RegistoEntidadesComponent {
  entity: Entity = {
    name: '',
    description: '',
    address: '',
    city: '',
    email: '',
    phone: 0,
    postCode: ''
  };
  
  constructor(private restService: RestService) {}

  submitForm(): void {
    this.restService.registerEntity(this.entity).subscribe(response => {
      console.log('Instituição registada com sucesso:', response);
    }, error => {
      console.error('Erro ao registar instituição:', error);
    });
  }
}

