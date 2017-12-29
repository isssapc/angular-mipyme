import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { log } from 'util';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AgregarImagenDialogoComponent } from '../../dialogos/agregar-imagen-dialogo/agregar-imagen-dialogo.component';
import { AnuncioService } from '../../services/anuncio.service';

@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.component.html',
  styleUrls: ['./crear-anuncio.component.scss']
})
export class CrearAnuncioComponent implements OnInit {

  anuncio: any = {};
  selectedOption: string;

  constructor(
    public dialog: MatDialog,
    private anuncioSrv: AnuncioService,
    public snackBar: MatSnackBar
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

    this.anuncioSrv.createAnuncio(form.value).then(ref => {
      console.log("createAnuncio", ref.id);
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

}
