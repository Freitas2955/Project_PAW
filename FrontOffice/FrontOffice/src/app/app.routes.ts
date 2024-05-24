import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EntidadesComponent } from './navbar/entidades/entidades.component';
import { DoarComponent } from './navbar/doar/doar.component';
import { LojaComponent } from './navbar/loja/loja.component';
import { DoacoesComponent } from './navbar/doacoes/doacoes.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'entidades', component: EntidadesComponent },
  { path: 'doar', component: DoarComponent },
  { path: 'loja', component: LojaComponent },
  { path: 'doacoes', component: DoacoesComponent }
];
