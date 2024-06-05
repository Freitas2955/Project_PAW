import { Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../../navbar.component';
import { Partner } from '../../../model/partner';
import { RestService } from '../../../services/rest.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { PartnersService } from '../../../services/partners.service';
import { BarComponent } from '../../../bar/bar.component';

@Component({
  selector: 'app-parceiros',
  standalone: true,
  imports: [NavbarComponent,CommonModule,RouterModule,BarComponent],
  templateUrl: './parceiros.component.html',
  styleUrl: './parceiros.component.css'
})
export class ParceirosComponent implements OnInit{
  partners: Partner[]=[new Partner()];
  username: String | null;
  userId:String;
  type:String|null;

  constructor(
    public rest: PartnersService,
    private router: Router,private sanitizer: DomSanitizer,public rest2: RestService,
  ) {
    const localStorageData = localStorage.getItem('currentUser');
    if (localStorageData) {
      const userData = JSON.parse(localStorageData);
      this.username = userData.username;
      this.userId=userData.userId;
      this.type=userData.userType;
    }else{
      this.username="";
      this.userId="";
      this.type="";
    }
  }


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
        imageObservable = this.rest2.getPartnerImage(partner._id);
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
