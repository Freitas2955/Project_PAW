import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../services/auth-rest-service.service';
import {FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string;
  password:string;

  constructor(private router: Router, private authService: AuthRestServiceService) { 
    this.password="";
    this.username="";
  }

  ngOnInit(): void {
  }


  login(): void {
    this.authService.login(this.username, this.password).pipe(
      catchError((err)=>{
        if (err.status === 401) {
          alert('Erro no login: Não autorizado!');
        } else {
          alert('Erro no login: ' + err.message);
        }
        return of(null);
      })
    ).subscribe((response: any) => {
      if (response && response.token) {
        const user = {
          token: response.token,
          userId: response.userId,
          userType: response.type,
          username: response.username
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/dashboard/' + response.userId]);
      } else if (response === null) {
      } else {
        alert('Erro no login!');
      }
    });
  }

}
