import { Component, OnInit } from '@angular/core';
import { AgregarUsuarioDialogoComponent } from '../../dialogos/agregar-usuario-dialogo/agregar-usuario-dialogo.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EditarUsuarioDialogoComponent } from '../../dialogos/editar-usuario-dialogo/editar-usuario-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from '../../dialogos/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { Usuario } from '../../model/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  loading: boolean;
  usuarios: Usuario[];
  roles: any[];

  constructor(
    private usuarioSrv: UsuarioService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.usuarioSrv.getUsuarios()
      .subscribe(res => {
        this.usuarios = res;
        this.loading = false;
      },
      (error: any) => { },
      () => { console.log("finally") });
  }

  agregarUsuario(): void {

    let dialogRef = this.dialog.open(AgregarUsuarioDialogoComponent, {
      data: {
        usuarios: this.usuarios,
        roles: this.roles
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


  editarUsuario(usuario) {


    let dialogRef = this.dialog.open(EditarUsuarioDialogoComponent, {
      data: {
        usuario: usuario,
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.loading = true;
      }
    });
  }

  delUsuario() {


    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar usuario",
        content: `¿Desea eliminar al usuario?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {


      }

    });

  }

}
