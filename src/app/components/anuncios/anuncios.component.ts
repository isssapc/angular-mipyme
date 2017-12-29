import { Component, OnInit } from '@angular/core';
import { Anuncio } from '../../model/anuncio.model';
import { AnuncioService } from '../../services/anuncio.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmarBorradoDialogoComponent } from '../../dialogos/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {

  anuncios: Anuncio[] = []; /* [
    {
      titulo: "Pants Deportivos",
      descripcion: "Alta resistencia e ideal para deportes",
      fecha_publicacion: "2018-12-26",
      img_src: "assets/imgs/pants.jpg",
      precio: "$3,000.00",
      categoria: "Promociones",
      avatar_src: "assets/imgs/logo.png"
    },
    {
      titulo: "Short Deportivo",
      descripcion: "ideal para los que practican running",
      fecha_publicacion: "2018-12-26",
      img_src: "assets/imgs/short.jpg",
      precio: "$1,000.00",
      categoria: "Promociones",
      avatar_src: "assets/imgs/logo.png"
    },
    {
      titulo: "Conjunto Deportivo para Dama",
      descripcion: "Bonito conjunto deportivo, unitalla.",
      fecha_publicacion: "2018-12-26",
      img_src: "assets/imgs/conjunto.jpg",
      precio: "$2,000.00",
      categoria: "Promociones",
      avatar_src: "assets/imgs/logo.png"
    }
  ]; */

  constructor(
    private anuncioSrv: AnuncioService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar

  ) { }

  ngOnInit() {

    this.anuncioSrv.getSnapshotAnuncios()
      .subscribe(anuncios => {
        this.anuncios = anuncios;
        console.log("getAnuncios", anuncios);

      });

  }

  delAnuncio(anuncio: Anuncio) {
    console.log("delAnuncio", anuncio);


    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {

        title: "Eliminar Anuncio",
        content: `¿Desea eliminar el anuncio con título: ${anuncio.titulo}?`

      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.anuncioSrv.delAnuncio(anuncio.id).then(() => {

          this.snackBar.open("Anuncio Eliminado", "Cerrar", {
            duration: 2000
          });

        });




      }




    });

  }

}
