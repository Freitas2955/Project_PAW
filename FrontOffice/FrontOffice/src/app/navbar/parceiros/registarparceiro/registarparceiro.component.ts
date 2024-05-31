import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { RestService } from '../../../rest.service';
import { Partner } from '../../../model/partner';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-registarparceiro',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './registarparceiro.component.html',
  styleUrl: './registarparceiro.component.css'
})

export class RegistarparceiroComponent {
  partner: Partner;
  confpassword?: String;
  /////////////////////////////////
  selectedFile: File;

  imagePreview: string | ArrayBuffer | null = null;
  ///////////////////////////////

  constructor(private restService: RestService,private builder: FormBuilder) {
    this.partner = new Partner();
    const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
    this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
    
  }
  ///////////////////////////////
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
    if (this.partner.password === this.confpassword) {
      console.log(this.partner);
      this.restService.registerPartner(this.partner, this.selectedFile).subscribe(
        (response) => {
          console.log('Parceiro registado com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao registar parceiro:', error);
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
