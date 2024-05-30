import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Supondo que você esteja usando HttpClient para fazer pedidos HTTP
import { RestService } from '../../../rest.service';
import { Donation } from '../../../model/donation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doacoes',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './doacao.component.html',
  styleUrl: './doacao.component.css',
})
export class DoacaoComponent {
  donation: Donation;
  requested:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public rest: RestService
  ) {this.donation=new Donation()}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let idDoacao = params.get('idDoacao');
      console.log('entidade');
      this.fazerPedido(idDoacao);
    });
  }

  fazerPedido(idDoacao: string | null) {
    this.rest.getDonation(idDoacao).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.donation = response.donation;
        this.requested=response.requested;
      },
      (error) => {
        console.error('Erro ao procurar doacao', error);
      }
    );
  }
}
