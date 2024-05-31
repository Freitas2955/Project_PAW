import { Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Donator } from '../../../model/donator';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doador',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './doador.component.html',
  styleUrl: './doador.component.css'
})

export class DoadorComponent {
  donator: Donator;
  donatorId: string|null=null;

  selectedFile: File;

  imagePreview: string | ArrayBuffer | null = null;


  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.donator = new Donator();
    const defaultContent = new Blob(['Conteúdo inicial'], { type: 'text/plain' });
    this.selectedFile = new File([defaultContent], 'arquivoInicial.txt', { type: 'text/plain' });
  }

  ngOnInit(): void {
    this.donatorId = this.route.snapshot.paramMap.get('id');
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
    }
  }

  getDonator(): void {
    this.rest.getDonator(this.donatorId).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.donator = response.donator;
      },
      (error) => {
        console.error('Erro ao procurar doador', error);
      }
    );
  }
}
