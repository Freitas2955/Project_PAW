import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { RestService } from '../../../rest.service';
import { Entity } from '../../../model/entity';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-registo-entidades',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './registo-entidades.component.html',
  styleUrl: './registo-entidades.component.css',
})

export class RegistoEntidadesComponent {
  entity: Entity;
  confpassword?: String;
  /////////////////////////////////
  selectedFile: File | null = null;
  ///////////////////////////////

  constructor(private restService: RestService,private builder: FormBuilder) {
    this.entity = new Entity();
    
  }
  ///////////////////////////////
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  ///////////////////////

  submitForm(): void {
    if (this.entity.password === this.confpassword) {
      console.log(this.entity);
      this.restService.registerEntity(this.entity).subscribe(
        (response) => {
          console.log('Instituição registada com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao registar instituição:', error);
        }
      );
      console.log('Senha e confirmação de senha coincidem');
    } else {
      console.log('Senha e confirmação de senha não coincidem');
      alert(
        'A senha e a confirmação de senha não coincidem. Por favor, verifique e tente novamente.'
      );
    }
  }
}
