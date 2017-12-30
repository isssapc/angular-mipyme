import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialog, MatSnackBar } from '@angular/material';
import { AgregarImagenDialogoComponent } from '../../dialogos/agregar-imagen-dialogo/agregar-imagen-dialogo.component';
import { AnuncioService } from '../../services/anuncio.service';
import { FileItem } from '../../model/file-item';
import { UploadService } from '../../services/upload.service';
import { log } from 'util';



@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.component.html',
  styleUrls: ['./crear-anuncio.component.scss']
})
export class CrearAnuncioComponent implements OnInit {

  anuncio: any = {};
  selectedOption: string;

  fileItems: FileItem[] = [];

  constructor(
    public dialog: MatDialog,
    private anuncioSrv: AnuncioService,
    public snackBar: MatSnackBar,
    private uploadSrv: UploadService
  ) { }

  ngOnInit() {
    /*     let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1; // Enero es 0
        let yyyy = now.getFullYear();
        let today = yyyy + "-" + mm + "-" + dd; */

    let utc = new Date().toJSON().slice(0, 10);

    this.anuncio.fecha_publicacion = utc;



  }

  createAnuncio(form: NgForm) {
    console.log("createAnuncio");
    console.log("form.value", form.value);
    console.log("anuncio", this.anuncio);


    this.anuncioSrv.createAnuncio(this.anuncio).then(ref => {
      console.log("createAnuncio", ref.id);
      this.anuncio = {};
      form.reset();
      this.snackBar.open("Anuncio Creado", "Cerrar", {
        duration: 2000
      });

    });


  }

  agregarImagen() {

    console.log("Imagen");
    let dialogRef = this.dialog.open(AgregarImagenDialogoComponent, {
      data: {

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  uploadImage() {

    console.log("uploadImage");

    this.uploadSrv.doUpload(this.fileItems).then(urls => {
      console.log("termina el upload", urls[0]);
      this.anuncio.img_src = urls[0];

    });


  }


  onChangeFile(event: Event, fileList: FileList, anuncio) {
    console.log("onChange");

    //console.log("onChangeFile", event, fileList);

    if (fileList && fileList[0]) {

      this.fileItems.push(new FileItem(fileList[0]));





      /*     let reader = new FileReader();
    
          reader.onload = function (e: any) {
    
            //img.src=e.target.result;
            anuncio.img_src = e.target.result;
    
          }
    
          reader.readAsDataURL(fileList[0]); */
    }

  }

}
