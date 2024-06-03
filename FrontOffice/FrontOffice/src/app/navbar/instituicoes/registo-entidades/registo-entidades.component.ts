import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { RestService } from '../../../services/rest.service';
import { Entity } from '../../../model/entity';
import { FormBuilder, FormControl, FormGroup, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { EntitiesService } from '../../../services/entities.service';

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
  selectedFile: File;
  imagePreview: string | ArrayBuffer | null = null;


  constructor(private restService: EntitiesService,private builder: FormBuilder, private formBuilder: FormBuilder) {
    this.entity = new Entity();
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
  /*
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }*/
  ///////////////////////



  submitForm(): void {
    if (this.entity.password === this.confpassword) {
      console.log(this.entity);
      this.restService.registerEntity(this.entity, this.selectedFile).subscribe(
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
