import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { RestService } from '../../../services/rest.service';
import { Partner } from '../../../model/partner';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';
import { PartnersService } from '../../../services/partners.service';
import { BarComponent } from '../../../bar/bar.component';

@Component({
  selector: 'app-editarparceiro',
  standalone: true,
  imports: [NavbarComponent,FormsModule, CommonModule,ReactiveFormsModule,BarComponent],
  templateUrl: './editarparceiro.component.html',
  styleUrl: './editarparceiro.component.css'
})

export class EditarparceiroComponent {
  partner: Partner;
  partnerId :String|null=null;
  confpassword?: String;
  /////////////////////////////////
  selectedFile: File;

  imagePreview: string | ArrayBuffer | null = null;
  ///////////////////////////////

  constructor(private rest: PartnersService,private builder: FormBuilder,private route: ActivatedRoute) {
    this.partner = new Partner();
    const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
    this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
  }

  ngOnInit(): void {
    this.partnerId = this.route.snapshot.paramMap.get('id');
    this.getPartner();
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

  getPartner(): void {
    this.rest.getPartner(this.partnerId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.partner = response.partner;
      },
      (error) => {
        console.error('Erro ao procurar entidade', error);
      }
    );
  }


  submitForm(): void {
      console.log(this.partner);
      this.rest.updatePartner(this.partner, this.selectedFile).subscribe(
        (response) => {
          console.log('Parceiro registado com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao registar Parceiro:', error);
        }
      );
  }
}
