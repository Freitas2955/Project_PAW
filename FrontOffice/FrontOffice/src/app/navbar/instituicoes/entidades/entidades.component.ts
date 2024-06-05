import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Entity } from '../../../model/entity';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { EntitiesService } from '../../../services/entities.service';
import { BarComponent } from '../../../bar/bar.component';

@Component({
  selector: 'app-entidades',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule,BarComponent],
  templateUrl: './entidades.component.html',
  styleUrl: './entidades.component.css',
})
export class EntidadesComponent implements OnInit {
  entities: Entity[]=[new Entity()];
  username: String | null;
  userId:String;
  type:String|null;
  constructor(
    public rest: EntitiesService,
    private route: ActivatedRoute,
    private router: Router,private sanitizer: DomSanitizer,public rest2: RestService
  ) {const localStorageData = localStorage.getItem('currentUser');
  if (localStorageData) {
    const userData = JSON.parse(localStorageData);
    this.username = userData.username;
    this.userId=userData.userId;
    this.type=userData.userType;
  }else{
    this.username="";
    this.userId="";
    this.type="";
  }}

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    console.log('getEntities chamado');
    this.rest.getEntities().subscribe((response: any) => {  
      console.log('Resposta recebida:', response);
      this.entities = response.entities;  
      this.entities.forEach(entity=>{
        let imageObservable;
        imageObservable = this.rest2.getEntityImage(entity._id);
        imageObservable.subscribe((imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          entity.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      })
    }, error => {
      console.error('Erro ao procurar entidade', error);
    });
  }

  seeListOfEntities() {
    this.router.navigate(['/entidades']);
  }
}
