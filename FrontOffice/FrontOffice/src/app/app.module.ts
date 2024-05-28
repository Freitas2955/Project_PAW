import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EntidadesComponent } from './navbar/instituicoes/entidades/entidades.component';

const appRoutes: Routes = [
    {
        path: 'entidades',
        component: EntidadesComponent,
        data: { title: 'Product List' }
    },
    
];
@NgModule({
    declarations: [
        AppComponent,
        EntidadesComponent,
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        FormsModule,
        BrowserModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
