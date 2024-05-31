import { Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Donator } from '../../../model/donator';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doadores',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './doadores.component.html',
  styleUrl: './doadores.component.css'
})
export class DoadoresComponent  implements OnInit{
  donators?: Donator[];

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDonators();
  }

  getDonators(): void {
    console.log('getDonators chamado');
    this.rest.getDonators().subscribe((response: any) => {  
      console.log('Resposta recebida:', response);
      this.donators = response.donators;  
    }, error => {
      console.error('Erro ao procurar doador', error);
    });
  }

  seeListOfDonators() {
    this.router.navigate(['/doadores']);
  }
}
