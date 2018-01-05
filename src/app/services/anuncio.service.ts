import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Anuncio } from '../model/anuncio.model';
import { FileItem } from '../model/file-item';
import * as firebase from "firebase";

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

  addAnuncio(anuncio) {

    return this.anuncios.add(anuncio);
  }

  setAnuncio(anuncio) {

    let id = this.db.createId();
    anuncio.id = id;
    return this.db.doc("anuncios/" + id).set(anuncio)
      .then(() => id);

  }

  createAnuncio(id: string, anuncio: any) {
    
    anuncio.id = id;
    return this.db.doc("anuncios/" + id).set(anuncio)
      .then(() => id);

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

  createAnuncioConImagenes(pic: Blob, thumb: Blob, fileItem: FileItem, anuncio: any) {

    // Get a reference to where the anuncio will be created.
    const newAnuncioKey = this.db.createId();

    // Start the pic file upload to Cloud Storage.
    const picRef = firebase.storage().ref(`full/${newAnuncioKey}/${fileItem.filename}`);
    const metadata = {
      contentType: pic.type
    };
    var picUploadTask = picRef.put(pic, metadata).then(snapshot => {
      console.log('New pic uploaded. Size:', snapshot.totalBytes, 'bytes.');
      var url = snapshot.metadata.downloadURLs[0];
      console.log('File available at', url);
      return url;
    }).catch(error => {
      console.error('Error while uploading new pic', error);
    });

    // Start the thumb file upload to Cloud Storage.
    const thumbRef = firebase.storage().ref(`thumb/${newAnuncioKey}/${fileItem.filename}`);
    var tumbUploadTask = thumbRef.put(thumb, metadata).then(snapshot => {
      console.log('New thumb uploaded. Size:', snapshot.totalBytes, 'bytes.');
      var url = snapshot.metadata.downloadURLs[0];
      console.log('File available at', url);
      return url;
    }).catch(error => {
      console.error('Error while uploading new thumb', error);
    });

    return Promise.all([picUploadTask, tumbUploadTask]).then(urls => {
      // Once both pics and thumbnails has been uploaded add a new post in the Firebase Database and
      // to its fanned out posts lists (user's posts and home post).

      let imagen = {
        full_url: urls[0],
        thumb_url: urls[1],
        //timestamp: firebase.database.ServerValue.TIMESTAMP,
        full_storage_uri: picRef.toString(),
        thumb_storage_uri: thumbRef.toString()
        /*     author: {
              uid: this.auth.currentUser.uid,
              full_name: this.auth.currentUser.displayName,
              profile_picture: this.auth.currentUser.photoURL
            } */
      };

      Object.assign(anuncio, imagen);

      

      return this.createAnuncio(newAnuncioKey,anuncio);
  
    });
  }

}
