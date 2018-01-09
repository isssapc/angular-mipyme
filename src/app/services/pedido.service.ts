import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class PedidoService {

  constructor(private db: AngularFirestore) { }


  getPedidos() {
    return this.db.collection<any>("pedidos").valueChanges();
  }

}
