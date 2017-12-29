import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuario } from '../model/usuario.model';


@Injectable()
export class UsuarioService {

  usuarios: AngularFirestoreCollection<Usuario>;

  constructor(

    private db: AngularFirestore
  ) {

    this.usuarios = this.db.collection<Usuario>("usuarios");
  }

  getUsuarios() {
    return this.usuarios.valueChanges();
  }


  createUsuario(usuario) {

    console.log("usuario", usuario);

    return this.usuarios.add(usuario);
  }

}
