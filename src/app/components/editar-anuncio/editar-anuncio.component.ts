import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AgregarImagenDialogoComponent } from '../../dialogos/agregar-imagen-dialogo/agregar-imagen-dialogo.component';
import { Anuncio } from '../../model/anuncio.model';
import { AnuncioService } from '../../services/anuncio.service';
import { ActivatedRoute } from '@angular/router';
import { log } from 'util';

@Component({
  selector: 'app-editar-anuncio',
  templateUrl: './editar-anuncio.component.html',
  styleUrls: ['./editar-anuncio.component.scss']
})
export class EditarAnuncioComponent implements OnInit {

  anuncio: Anuncio = {};
  selectedOption: string;


  constructor(
    public dialog: MatDialog,
    private anuncioSrv: AnuncioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //let utc = new Date().toJSON().slice(0, 10);

    //this.anuncio.fecha_publicacion = utc;

    const id = this.route.snapshot.paramMap.get('id');

    this.anuncioSrv.getSnapshotAnuncio(id)
      .subscribe(anuncio => {
        this.anuncio = anuncio;
      });
  }

  updateAnuncio(form: NgForm) {
    console.log("createAnuncio");
    console.log("form.value", form.value);

    this.anuncioSrv.updateAnuncio(this.anuncio).then((data) => {
      console.log("el anuncio se ha actualizado", data);

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
