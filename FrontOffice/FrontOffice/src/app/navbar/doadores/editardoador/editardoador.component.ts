import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { RestService } from '../../../services/rest.service';
import { Donator } from '../../../model/donator';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';
import { DonatorsService } from '../../../services/donators.service';

@Component({
  selector: 'app-editardoador',
  standalone: true,
  imports: [NavbarComponent,FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './editardoador.component.html',
  styleUrl: './editardoador.component.css'
})
export class EditardoadorComponent {
  donator: Donator;
  entidadeId :String|null=null;
  confpassword?: String;
  /////////////////////////////////
  selectedFile: File;

  imagePreview: string | ArrayBuffer | null = null;
  ///////////////////////////////

  constructor(private rest: DonatorsService,private builder: FormBuilder,private route: ActivatedRoute) {
    this.donator = new Donator();
    const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
    this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
  }

  ngOnInit(): void {
    this.entidadeId = this.route.snapshot.paramMap.get('id');
    this.getDonator();
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

  getDonator(): void {
    this.rest.getDonator(this.entidadeId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.donator = response.donator;
      },
      (error) => {
        console.error('Erro ao procurar entidade', error);
      }
    );
  }


  submitForm(): void {
      console.log(this.donator);
      this.rest.updateDonator(this.donator, this.selectedFile).subscribe(
        (response) => {
          console.log('Instituição registada com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao registar instituição:', error);
        }
      );
  }
}
