import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Supondo que você esteja usando HttpClient para fazer pedidos HTTP
import { RestService } from '../../../rest.service';
import { Donation } from '../../../model/donation';
import { CommonModule } from '@angular/common';
import { Request } from '../../../model/request';

@Component({
  selector: 'app-doacoes',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './doacao.component.html',
  styleUrl: './doacao.component.css',
})
export class DoacaoComponent {
  donation: Donation;
  requested: boolean = false;
  request: Request;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public rest: RestService
  ) {
    this.donation = new Donation();
    this.request = new Request();
  }

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
        this.requested = response.requested;
      },
      (error) => {
        console.error('Erro ao procurar doacao', error);
      }
    );
  }

  createRequest( event: Event) {
    console.log(this.donation)
    this.rest.registerRequest(this.donation).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.donation = response.donation;
        this.requested = response.requested;
      },
      (error) => {
        console.error('Erro ao criar pedido', error);
      }
    );
  }

  aprovarDoacao(idDoacao:String|undefined){
    this.rest.approveDonation(idDoacao).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
      },
      (error) => {
        console.error('Erro ao procurar doacoes', error);
      }
    )
    location.reload();
  }
}
