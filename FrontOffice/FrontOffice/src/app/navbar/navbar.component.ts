import { Component } from '@angular/core';
import { AuthRestServiceService } from '../services/auth-rest-service.service';
import { RestService } from '../services/rest.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  username: String | null;
  userId:String;
  type:String|null;
  imageUrl?: SafeUrl;
  constructor(private router: Router,private auth: AuthRestServiceService,private rest:RestService,private sanitizer: DomSanitizer) {
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

  ngOnInit(){
    let imageObservable;
    if(this.type=="Entity"){
      imageObservable = this.rest.getEntityImage(this.userId);
    }else if(this.type=="Partner"){
      imageObservable = this.rest.getPartnerImage(this.userId);
    }else{
      imageObservable = this.rest.getDonatorImage(this.userId);
    }
        
        imageObservable.subscribe((imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
  }

  logout() {
    this.auth.logout();
  }

  editarPerfil(){
    if(this.type=="Entity"){
      this.router.navigate(['/editarEntidade/' + this.userId]);
    }else if(this.type=="Partner"){
      this.router.navigate(['/editarparceiro/' + this.userId]);
    }else{
      this.router.navigate(['/editardoador/' + this.userId]);
    }
  }
}
