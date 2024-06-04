import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EntidadesComponent } from './navbar/instituicoes/entidades/entidades.component';
import { DoarComponent } from './navbar/doar/doar.component';
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
import { DoadorComponent } from './navbar/doadores/doador/doador.component';
import { DoadoresComponent } from './navbar/doadores/doadores/doadores.component';
import { DashboardComponent } from './navbar/doadores/dashboard/dashboard.component'
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { CampanhaComponent } from './navbar/campanhas/campanha/campanha.component';
import { CampanhasComponent } from './navbar/campanhas/campanhas/campanhas.component';
import { RegistarcampanhasComponent } from './navbar/campanhas/registarcampanhas/registarcampanhas.component';

export const routes: Routes = [
  { path: '', component: PagInicialComponent },
  { path: 'login', component: LoginComponent },

  { path: 'doacoes/entidade/:idEntidade', component: DoacoesComponent ,canActivate: [AuthGuardGuard]},
  { path: 'doacoes/doador/:idDoador', component: DoacoesComponent ,canActivate: [AuthGuardGuard]},
  { path: 'doacoes/show/:idDoacao', component: DoacaoComponent,canActivate: [AuthGuardGuard]},
  { path: 'doar/:donatorId', component: DoarComponent ,canActivate: [AuthGuardGuard]},

  { path: 'registarentidade', component: RegistoEntidadesComponent},
  { path: 'editarEntidade/:id', component: EditarentidadesComponent ,canActivate: [AuthGuardGuard]},
  { path: 'entidades/show/:id', component: EntidadeComponent ,canActivate: [AuthGuardGuard]},
  { path: 'entidades', component: EntidadesComponent ,canActivate: [AuthGuardGuard]},

  { path: 'parceiros', component: ParceirosComponent ,canActivate: [AuthGuardGuard]},
  { path: 'parceiros/show/:id', component: ParceiroComponent ,canActivate: [AuthGuardGuard]},
  { path: 'editarparceiro/:id', component: EditarparceiroComponent,canActivate: [AuthGuardGuard]},
  { path: 'registarparceiro', component: RegistarparceiroComponent},

  { path: 'doadores', component: DoadoresComponent ,canActivate: [AuthGuardGuard]}, //Nao sei quais devo usar??
  { path: 'doadores/show/:id', component: DoadorComponent,canActivate: [AuthGuardGuard]},
  { path: 'editardoador/:id', component: EditardoadorComponent ,canActivate: [AuthGuardGuard]},
  { path: 'registardoador', component: RegistardoadorComponent},

  {path: 'dashboard/:id', component: DashboardComponent,canActivate: [AuthGuardGuard]},
  {path: 'registarcampanha', component: RegistarcampanhasComponent, canActivate: [AuthGuardGuard]},
  {path: 'campanha', component: CampanhaComponent, canActivate: [AuthGuardGuard]},
  {path: 'campanhas', component: CampanhasComponent, canActivate: [AuthGuardGuard]},
  { path: 'campanhas/show/:id', component: CampanhasComponent ,canActivate: [AuthGuardGuard]},  //nao sei se é campanhas ou campanha /show/id
];
