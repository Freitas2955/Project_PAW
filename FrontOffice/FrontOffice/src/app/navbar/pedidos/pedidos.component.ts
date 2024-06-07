import { Component } from '@angular/core';
import { BarComponent } from '../../bar/bar.component';
import { NavbarComponent } from '../navbar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../../services/requests.service';
import { Request } from '../../model/request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [BarComponent,NavbarComponent,RouterModule,CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  requests: Request[] = [];
  username: String | null;
  userId:String;
  type:String|null;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public rest: RequestsService
  ) {
    const localStorageData = localStorage.getItem('currentUser');
  if (localStorageData) {
    const userData = JSON.parse(localStorageData);
    this.username = userData.username;
    this.userId=userData.userId;
    this.type=userData.userType;
  }else{
    this.username="";
    this.userId="";
    this.type="";
  }
  }

  ngOnInit() {
    if(this.type=="Entity"){
      this.fazerPedidoPorEntidade(this.userId)
    }else{
      this.fazerPedidoPorDoador(this.userId)
    }
  }

  fazerPedidoPorEntidade(idEntidade: String) {
    this.rest.getEntityRequests(idEntidade).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.requests = response.requests;
        
      },
      (error) => {
        console.error('Erro ao procurar doacoes', error);
      }
    );
  }

  aprovarPedido(idPedido:String|undefined){
    this.rest.approveRequest(idPedido).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
      },
      (error) => {
        console.error('Erro ao procurar doacoes', error);
      }
    )
    location.reload();
  }

  fazerPedidoPorDoador(idDoador: String) {
    this.rest.getDonatorRequests(idDoador).subscribe(
      (response: any) => {
        console.log('Resposta recebida:', response);
        this.requests = response.requests;
        for (let i = 0; i < this.requests.length; i++) {
          let isoDate = this.requests[i].updated_at;
          let date = new Date(isoDate);

          let options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };

          this.requests[i].entityName = date.toLocaleDateString(
            'pt-pt',
            options
          );
        }
      },
      (error) => {
        console.error('Erro ao procurar doacoes', error);
      }
    );
  }
}
