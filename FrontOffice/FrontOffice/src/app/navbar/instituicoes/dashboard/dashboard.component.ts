import { Component } from '@angular/core';
import { BarComponent } from '../../../bar/bar.component';
import { NavbarComponent } from '../../navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,BarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
