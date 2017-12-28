import { Component, OnInit } from '@angular/core';
import { AgregarUsuarioDialogoComponent } from '../../dialogos/agregar-usuario-dialogo/agregar-usuario-dialogo.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EditarUsuarioDialogoComponent } from '../../dialogos/editar-usuario-dialogo/editar-usuario-dialogo.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  agregarUsuario(): void {
    //let usuario = new Usuario();

    let dialogRef = this.dialog.open(AgregarUsuarioDialogoComponent, {
      data: {
       
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

  editarUsuario(): void {

    let dialogRef = this.dialog.open(EditarUsuarioDialogoComponent, {
      data: {
       
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
