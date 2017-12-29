import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../model/usuario.model';

@Component({
  selector: 'app-agregar-usuario-dialogo',
  templateUrl: './agregar-usuario-dialogo.component.html',
  styleUrls: ['./agregar-usuario-dialogo.component.scss']
})
export class AgregarUsuarioDialogoComponent implements OnInit {
  @ViewChild('formCreateUsuario') formCreateUsuario: NgForm;

  usuario: any = {}; //Usuario = new Usuario();

  constructor(
    private usuarioSrv: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarUsuarioDialogoComponent>
  ) { }

  ngOnInit() {

  }

  createUsuario() {
    this.usuarioSrv.createUsuario(this.usuario)
      .then(ref => {

        console.log("response", ref);
        this.formCreateUsuario.reset();
        this.dialogRef.close(ref);

      },
      (error: any) => {
        this.dialogRef.close({ error: "ERROR. Verifique sus datos o compruebe su conexión" });
      });
  }

}
