import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../popup/popup.component'; 
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-doar',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './doar.component.html',
  styleUrl: './doar.component.css'
})
export class DoarComponent {
  instituicaoSelecionada: string='' ;
  constructor(public dialog: MatDialog) { }

  abrirPopup(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '400px', 
      data: { instituicaoSelecionada: this.instituicaoSelecionada }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.instituicaoSelecionada = result;
      }
    });
  }
}
