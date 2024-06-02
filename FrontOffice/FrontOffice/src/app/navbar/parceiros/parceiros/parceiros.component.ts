import { Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Partner } from '../../../model/partner';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-parceiros',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule],
  templateUrl: './parceiros.component.html',
  styleUrl: './parceiros.component.css'
})
export class ParceirosComponent implements OnInit{
  partners: Partner[]=[new Partner()];

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router,private sanitizer: DomSanitizer
  ) {}


  ngOnInit(): void {
    this.getPartners();
  }

  getPartners(): void {
    console.log('getPartners chamado');
    this.rest.getPartners().subscribe((response: any) => {  
      console.log('Resposta recebida:', response);
      this.partners = response.partners;  
      this.partners.forEach(partner=>{
        let imageObservable;
        imageObservable = this.rest.getPartnerImage(partner._id);
        imageObservable.subscribe((imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          partner.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      })
    }, error => {
      console.error('Erro ao procurar parceiro', error);
    });
  }

  seeListOfPartners() {
    this.router.navigate(['/parceiros']);
  }
}
