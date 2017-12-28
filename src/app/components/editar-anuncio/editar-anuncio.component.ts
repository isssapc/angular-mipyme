import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AgregarImagenDialogoComponent } from '../../dialogos/agregar-imagen-dialogo/agregar-imagen-dialogo.component';

@Component({
  selector: 'app-editar-anuncio',
  templateUrl: './editar-anuncio.component.html',
  styleUrls: ['./editar-anuncio.component.scss']
})
export class EditarAnuncioComponent implements OnInit {

  anuncio: any = {};
  selectedOption: string;


  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    let utc = new Date().toJSON().slice(0, 10);

    this.anuncio.fecha_publicacion = utc;
  }

  createAnuncio(form: NgForm) {
    console.log("createAnuncio");
    console.log("form.value", form.value);
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


}
