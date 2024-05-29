import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service'

@Component({
  selector: 'app-uploadfile',
  standalone: true,
  imports: [],
  templateUrl: './uploadfile.component.html',
  styleUrl: './uploadfile.component.css'
})
export class UploadfileComponent implements OnInit{
  fileName = '';
  message = '';


  constructor(public rest: RestService) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;
      this.rest.uploadFile(file).subscribe((result:any) => {
        console.log(result);
        this.fileName = '';
        this.message = result.message;
      });
    }
  }

}
