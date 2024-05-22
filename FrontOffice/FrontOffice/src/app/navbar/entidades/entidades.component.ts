import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar.component';
import { Entity } from '../../model/entity';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-entidades',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './entidades.component.html',
  styleUrl: './entidades.component.css'
})

export class EntidadesComponent implements OnInit{
   entities?:Entity[];

   constructor(public rest:RestService,private route:ActivatedRoute,private router:Router){

   }

   ngOnInit(): void {
       var idTemp=this.route.snapshot.params['id'];
       this.rest.getEntities().subscribe((data:Entity[])=>{
        this.entities=data;
       })
   }

  seeListOfEntities(){
    this.router.navigate(['/entidades']);
  }

}
