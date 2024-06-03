import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { RestService } from '../../../services/rest.service';
import { Entity } from '../../../model/entity';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';
import { EntitiesService } from '../../../services/entities.service';
@Component({
  selector: 'app-editarentidades',
  standalone: true,
  imports: [NavbarComponent,FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './editarentidades.component.html',
  styleUrl: './editarentidades.component.css'
})
export class EditarentidadesComponent {
  entity: Entity;
  entidadeId :String|null=null;
  confpassword?: String;
  /////////////////////////////////
  selectedFile: File;

  imagePreview: string | ArrayBuffer | null = null;
  ///////////////////////////////

  constructor(private rest: EntitiesService,private builder: FormBuilder,private route: ActivatedRoute) {
    this.entity = new Entity();
    const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
    this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
  }

  ngOnInit(): void {
    this.entidadeId = this.route.snapshot.paramMap.get('id');
    this.getEntity();
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

  getEntity(): void {
    this.rest.getEntity(this.entidadeId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.entity = response.entity;
      },
      (error) => {
        console.error('Erro ao procurar entidade', error);
      }
    );
  }


  submitForm(): void {
      console.log(this.entity);
      this.rest.updateEntity(this.entity, this.selectedFile).subscribe(
        (response) => {
          console.log('Instituição registada com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao registar instituição:', error);
        }
      );
  }
}
