import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Anuncio } from '../../model/anuncio.model';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-anuncio-dialogo',
  templateUrl: './editar-anuncio-dialogo.component.html',
  styleUrls: ['./editar-anuncio-dialogo.component.scss']
})
export class EditarAnuncioDialogoComponent implements OnInit {
  anuncio: Anuncio;
  fecha_publicacion: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarAnuncioDialogoComponent>
  ) { }

  ngOnInit() {
    this.anuncio = this.data.anuncio;
    this.fecha_publicacion = moment(this.anuncio.fecha_publicacion);

  }

  onFechaChange() {
    console.log("fecha change");
    this.anuncio.fecha_publicacion = this.fecha_publicacion.format();
  }

}
