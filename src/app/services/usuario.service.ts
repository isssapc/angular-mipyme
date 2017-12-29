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


  getSnapshotUsuarios() {
    return this.usuarios.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data } as Usuario;
      });
    });
  }


  getSnapshotUsuario(id: string) {
    return this.usuarios.doc(id).snapshotChanges().map(action => {
      const data = action.payload.data();
      const id = action.payload.id;
      return { id, ...data } as Usuario;
    });
  }


  createUsuario(usuario) {

    console.log("usuario", usuario);

    return this.usuarios.add(usuario);
  }

  delUsuario(id: string) {

    // let usuario: AngularFirestoreDocument<any>;

    const usuario = this.usuarios.doc(id);
    return usuario.delete();
  }


  updateUsuario(usuario) {
    const id = usuario.id;
    delete usuario.id;
    const usuarioRef = this.usuarios.doc(id);
    return usuarioRef.update(usuario);
  }

}
