import { Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Donator } from '../../../model/donator';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DonatorsService } from '../../../services/donators.service';

@Component({
  selector: 'app-doadores',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule ],
  templateUrl: './doadores.component.html',
  styleUrl: './doadores.component.css'
})
export class DoadoresComponent  implements OnInit{
  donators: Donator[]=[new Donator()];

  constructor(
    public rest: DonatorsService,
    private route: ActivatedRoute,
    private router: Router,private sanitizer: DomSanitizer,public rest2: RestService,
  ) {}

  ngOnInit(): void {
    this.getDonators();
  }

  getDonators(): void {
    console.log('getDonators chamado');
    this.rest.getDonators().subscribe((response: any) => {  
      console.log('Resposta recebida:', response);
      this.donators = response.donators;  
      this.donators.forEach(donator => {
        let imageObservable;
        imageObservable = this.rest2.getDonatorImage(donator._id);
        imageObservable.subscribe((imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          donator.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
        console.log(donator);
      });
      
    }, error => {
      console.error('Erro ao procurar doador', error);
    });
  }

  seeListOfDonators() {
    this.router.navigate(['/doadores']);
  }
}
