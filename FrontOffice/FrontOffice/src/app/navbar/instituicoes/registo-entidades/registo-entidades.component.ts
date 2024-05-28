import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { RestService } from '../../../rest.service';
import { Entity } from '../../../model/entity';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registo-entidades',
  standalone: true,
  imports: [NavbarComponent,FormsModule],
  templateUrl: './registo-entidades.component.html',
  styleUrl: './registo-entidades.component.css'
})
export class RegistoEntidadesComponent {
  entity: any = {}; // Supondo que 'entity' seja o objeto onde você armazena os dados do formulário
  
  constructor(private restService: RestService) {}

  submitForm(): void {
    console.log(this.entity);
    if (this.entity.password === this.entity.confpassword) {


    this.restService.registerEntity(this.entity).subscribe(response => {
      console.log('Instituição registada com sucesso:', response);
    }, error => {
      console.error('Erro ao registar instituição:', error);
    });


      // As senhas coincidem, você pode prosseguir com o envio do formulário ou qualquer outra ação necessária
      console.log('Senha e confirmação de senha coincidem');
      // Aqui você pode enviar os dados do formulário para o backend ou realizar outra operação
    } else {
      // As senhas não coincidem, você pode exibir uma mensagem de erro ou tomar outra ação
      console.log('Senha e confirmação de senha não coincidem');
      // Por exemplo, exibir uma mensagem de erro para o usuário
      alert('A senha e a confirmação de senha não coincidem. Por favor, verifique e tente novamente.');
    }
  }
}

