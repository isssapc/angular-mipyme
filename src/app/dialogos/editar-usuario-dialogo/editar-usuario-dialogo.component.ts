import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Usuario } from '../../model/usuario.model';

@Component({
  selector: 'app-editar-usuario-dialogo',
  templateUrl: './editar-usuario-dialogo.component.html',
  styleUrls: ['./editar-usuario-dialogo.component.scss']
})
export class EditarUsuarioDialogoComponent implements OnInit {
  usuario: Usuario;
  roles: any[];

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarUsuarioDialogoComponent>
  ) { }

  ngOnInit() {
    this.usuario = this.data.usuario;

  }

}
