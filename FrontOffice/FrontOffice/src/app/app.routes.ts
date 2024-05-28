import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EntidadesComponent } from './navbar/instituicoes/entidades/entidades.component';
import { DoarComponent } from './navbar/doar/doar.component';
import { LojaComponent } from './navbar/loja/loja.component';
import { DoacoesComponent } from './navbar/doacoes/doacoes.component';
import { RegistoEntidadesComponent } from './navbar/instituicoes/registo-entidades/registo-entidades.component';
import { PagInicialComponent } from './pag-inicial/pag-inicial.component';
import { EntidadeComponent } from './navbar/instituicoes/entidade/entidade.component';

export const routes: Routes = [
  { path: '', component: PagInicialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'entidades', component: EntidadesComponent },
  { path: 'entidades/show/:id', component: EntidadeComponent },
  { path: 'doar', component: DoarComponent },
  { path: 'loja', component: LojaComponent },
  { path: 'doacoes', component: DoacoesComponent },
  { path: 'registoEntidades', component: RegistoEntidadesComponent },
];
