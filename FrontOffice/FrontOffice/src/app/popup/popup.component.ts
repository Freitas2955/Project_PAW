import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntidadesComponent } from '../navbar/instituicoes/entidades/entidades.component';
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [EntidadesComponent],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  selecionarInstituicao(instituicao: string): void {
    this.dialogRef.close(instituicao);
  }
}
