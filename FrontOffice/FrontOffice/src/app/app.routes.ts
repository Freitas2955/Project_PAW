import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EntidadesComponent } from './navbar/entidades/entidades.component';


export const routes: Routes = [{ path: 'login', component: LoginComponent },{ path: 'entidades', component: EntidadesComponent }];
