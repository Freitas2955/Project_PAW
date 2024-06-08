import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Entity } from '../../../model/entity';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { EntitiesService } from '../../../services/entities.service';
import { BarComponent } from '../../../bar/bar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entidades',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule,BarComponent,FormsModule],
  templateUrl: './entidades.component.html',
  styleUrl: './entidades.component.css',
})
export class EntidadesComponent implements OnInit {
  searchName: string = '';
  searchCity: string = '';
  searchPhone: string = '';
  entities: Entity[]=[new Entity()];
  username: String | null;
  userId:String;
  type:String|null;
  filteredEntities: any[] = [];
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
        this.filteredEntities=this.entities;
      })
    }, error => {
      console.error('Erro ao procurar entidade', error);
    });

  }

  seeListOfEntities() {
    this.router.navigate(['/entidades']);
  }

  filterEntities(): void {
    this.filteredEntities = this.entities.filter(entity => {
      const matchesName = entity.name.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesAddress = entity.city.toLowerCase().includes(this.searchCity.toLowerCase());
      const matchesDescription = entity.phone.toString().toLowerCase().includes(this.searchPhone.toLowerCase());
      return matchesName && matchesAddress && matchesDescription;
    });
  }

  onSearchChange(): void {
    this.filterEntities();
  }

}
