import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class UsuarioService {

  usuarios: AngularFirestoreCollection<any>;

  constructor(

    private db: AngularFirestore
  ) {

    this.usuarios = this.db.collection<any>("usuarios");
  }

  getUsuarios() {
    return this.usuarios.valueChanges();
  }

  createUsuario(usuario) {
    this.usuarios.add(usuario);
  }

}
