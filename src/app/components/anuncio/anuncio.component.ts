import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Anuncio } from '../../model/anuncio.model';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditarAnuncioDialogoComponent } from '../../dialogos/editar-anuncio-dialogo/editar-anuncio-dialogo.component';
import { AnuncioService } from '../../services/anuncio.service';


@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.scss']
})
export class AnuncioComponent implements OnInit {
  loading: boolean;
  @Input("anuncio") anuncio: Anuncio;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  selectedOption: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private anuncioSrv: AnuncioService,

  ) { }

  ngOnInit() {
  }

  editarAnuncio(anuncio) {

    let copia = Anuncio.copiar(anuncio);

    let dialogRef = this.dialog.open(EditarAnuncioDialogoComponent, {
      data: {
        anuncio: copia,      }

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.loading = true;

        this.anuncioSrv.updateAnuncio(copia)
          .then(() => {

            this.loading = false;
            this.snackBar.open("Anuncio Actualizado", "Cerrar", {
              duration: 2000
            });

          });


      }
    });
  }

  delAnuncio() {

    this.delete.emit(null);

  }



}
