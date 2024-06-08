import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { RestService } from '../../../services/rest.service';
import { Donator } from '../../../model/donator';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EntitiesService } from '../../../services/entities.service';
import { DonatorsService } from '../../../services/donators.service';

@Component({
  selector: 'app-registardoador',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './registardoador.component.html',
  styleUrl: './registardoador.component.css'
})
export class RegistardoadorComponent {
  donator: Donator;
  confpassword?: String;
  selectedFile: File;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private restService: DonatorsService,private builder: FormBuilder) {
    this.donator = new Donator();
    const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
    this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
    
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.selectedFile=file;
    }
  }


  submitForm(): void {
    if (this.donator.password === this.confpassword) {
      console.log(this.donator);
      this.restService.registerDonator(this.donator, this.selectedFile).subscribe(
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
