import { Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Partner } from '../../../model/partner';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parceiros',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule],
  templateUrl: './parceiros.component.html',
  styleUrl: './parceiros.component.css'
})
export class ParceirosComponent implements OnInit{
  partners?: Partner[];

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPartners();
  }

  getPartners(): void {
    console.log('getPartners chamado');
    this.rest.getPartners().subscribe((response: any) => {  
      console.log('Resposta recebida:', response);
      this.partners = response.partners;  
    }, error => {
      console.error('Erro ao procurar parceiro', error);
    });
  }

  seeListOfPartners() {
    this.router.navigate(['/parceiros']);
  }
}
