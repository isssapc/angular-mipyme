import { Component, OnInit, Input } from '@angular/core';
import { Anuncio } from '../../model/anuncio.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditarAnuncioComponent } from '../editar-anuncio/editar-anuncio.component';
import { Router } from '@angular/router';
import { ConfimarBorradoDialogoComponent } from '../../dialogos/confimar-borrado-dialogo/confimar-borrado-dialogo.component';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.scss']
})
export class AnuncioComponent implements OnInit {
  @Input("anuncio") anuncio: Anuncio;
  selectedOption: string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  editarAnuncio() {
    this.router.navigate(["/editar-anuncio"]);
  }

  delAnuncio(): void {

    let dialogRef = this.dialog.open(ConfimarBorradoDialogoComponent, {
      data: {

        title: "Eliminar Anuncio",
        content: `¿Desea eliminar el anuncio?`

      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        if (result.error) {
          this.snackBar.open(result.error, "Cerrar", {
            duration: 2000
          });
        } else {
          this.snackBar.open("Usuario Creado", "Cerrar", {
            duration: 2000
          });
        }

      }


    });

  }



}
