import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Anuncio } from '../model/anuncio.model';

@Injectable()
export class AnuncioService {

  anuncios: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFirestore

  ) {

    this.anuncios = this.db.collection<any>("anuncios");
  }


  getAnuncios() {

    return this.anuncios.valueChanges();
  }

  getSnapshotAnuncios() {
    return this.anuncios.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data } as Anuncio;
      });
    });
  }


  getSnapshotAnuncio(id: string) {
    return this.anuncios.doc(id).snapshotChanges().map(action => {
      const data = action.payload.data();
      const id = action.payload.id;
      return { id, ...data } as Anuncio;
    });
  }

  createAnuncio(anuncio) {

    return this.anuncios.add(anuncio);
  }

  delAnuncio(id: string) {

    let anuncio: AngularFirestoreDocument<any>;

    anuncio = this.anuncios.doc(id);
    return anuncio.delete();
  }

  updateAnuncio(anuncio) {
    const id = anuncio.id;
    delete anuncio.id;
    const anuncioRef = this.anuncios.doc(id);
    return anuncioRef.update(anuncio);
  }

}
