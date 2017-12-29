import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class AnuncioService {

  anuncios: AngularFirestoreCollection<any>;

  constructor(
    private db:AngularFirestore

  ) { 

    this.anuncios= this.db.collection<any>("anuncios");
  }


  getAnuncios(){
    return this.anuncios.valueChanges();
  }

  createAnuncio(anuncio){
    this.anuncios.add(anuncio);
  }

}
