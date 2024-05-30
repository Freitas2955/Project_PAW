import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EntidadesComponent } from './navbar/instituicoes/entidades/entidades.component';
import { DoarComponent } from './navbar/doar/doar.component';
import { LojaComponent } from './navbar/loja/loja.component';
import { DoacoesComponent } from './navbar/donations/doacoes/doacoes.component';
import { RegistoEntidadesComponent } from './navbar/instituicoes/registo-entidades/registo-entidades.component';
import { PagInicialComponent } from './pag-inicial/pag-inicial.component';
import { EntidadeComponent } from './navbar/instituicoes/entidade/entidade.component';
import { EditarentidadesComponent } from './navbar/instituicoes/editarentidades/editarentidades.component';
import { EditardoadorComponent } from './navbar/doadores/editardoador/editardoador.component';
import { RegistardoadorComponent } from './navbar/doadores/registardoador/registardoador.component';

import { EditarparceiroComponent } from './navbar/parceiros/editarparceiro/editarparceiro.component';
import { ParceiroComponent } from './navbar/parceiros/parceiro/parceiro.component';
import { ParceirosComponent } from './navbar/parceiros/parceiros/parceiros.component';
import { RegistarparceiroComponent } from './navbar/parceiros/registarparceiro/registarparceiro.component';
import { DoacaoComponent } from './navbar/donations/doacao/doacao.component';

export const routes: Routes = [
  { path: '', component: PagInicialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'entidades', component: EntidadesComponent },
  { path: 'entidades/show/:id', component: EntidadeComponent },
  { path: 'doar', component: DoarComponent },
  { path: 'loja', component: LojaComponent },
  { path: 'doacoes/entidade/:idEntidade', component: DoacoesComponent },
  { path: 'doacoes/doador/:idDoador', component: DoacoesComponent },
  { path: 'doacao/:idDoacao', component: DoacaoComponent },
  { path: 'registoEntidades', component: RegistoEntidadesComponent },
  { path: 'editarentidades/:id', component: EditarentidadesComponent },

  { path: 'editardoador/:id', component: EditardoadorComponent },
  { path: 'registardoador', component: RegistardoadorComponent },

  { path: 'parceiros', component: ParceirosComponent },
  { path: 'parceiros/show/:id', component: ParceiroComponent },
  { path: 'editarparceiro/:id', component: EditarparceiroComponent},
  { path: 'registarparceiro', component: RegistarparceiroComponent},
];
