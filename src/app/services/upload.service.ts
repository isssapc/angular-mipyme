import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from "firebase";
import { storage } from 'firebase/app';
import { FileItem } from '../model/file-item';


@Injectable()
export class UploadService {

  private CARPETA_IMAGENES: string = "imagenes";

  constructor(private db: AngularFirestore) { }


  doUpload(archivos: FileItem[]) {
    console.log("archivos", archivos);

    if (archivos.length > 0) {

      let promesa = new Promise((resolve, reject) => {

        let urls: any[] = [];

        let storageRef = firebase.storage().ref();

        for (let fileItem of archivos) {

          fileItem.isUploading = true;

          let metadata: firebase.storage.UploadMetadata = {
            customMetadata: {
              hola: "mundo"
            }
          };

          let uploadTask: firebase.storage.UploadTask =
            storageRef.child(this.CARPETA_IMAGENES + '/' + fileItem.filename).put(fileItem.file, metadata);

          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,

            (snapshot: firebase.storage.UploadTaskSnapshot) => fileItem.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            (error) => {
              console.log("Error al subir ", error);
              fileItem.error = error;
            },
            () => {

              fileItem.url = uploadTask.snapshot.downloadURL;
              //console.log("firebase.storage.Reference",uploadTask.snapshot.ref );
              //console.log("ref.name", uploadTask.snapshot.ref.name );
              //console.log("ref.fullPath", uploadTask.snapshot.ref.fullPath );
              //console.log("ref.bucket", uploadTask.snapshot.ref.bucket );
              //console.log("ref.storage", uploadTask.snapshot.ref.storage );
              //console.log("ref.toString()", uploadTask.snapshot.ref.toString() );


              //fileItem.isUploading = false;
              //fileItem.complete=true;

              let imagen = {
                nombre: fileItem.filename,
                url: fileItem.url,
                ref: uploadTask.snapshot.ref.toString(),
                ref_name: uploadTask.snapshot.ref.name,
                ref_fullPath: uploadTask.snapshot.ref.fullPath,
                ref_bucket: uploadTask.snapshot.ref.bucket
              };


              this.createImage(imagen)
                .then(ref => {

                  console.log("referencia", ref);
                  console.log("ref.id", ref.id);
                  console.log("ref.path", ref.path);

                  uploadTask.snapshot.ref.updateMetadata({
                    customMetadata: {
                      db: ref.path
                    }
                  });

                  ref.get().then(doc => {

                    console.log("doc", doc.data());


                    fileItem.isUploading = false;
                    fileItem.complete = true;
                    //para devolver la promesa con la url
                    //urls.push(doc.data().url);
                    urls.push(doc.data());
                    resolve(urls);

                  });


                });

            });


        }




      });

      return promesa;





    }

  }

  private createImage(imagen) {
    return this.db.collection("imagenes").add(imagen);
  }

  doUpload2(full: Blob, thumb: Blob) {
    console.log("upload2");



    let promesa = new Promise((resolve, reject) => {

      let urls: any[] = [];

      let storageRef = firebase.storage().ref();

      /* for (let fileItem of archivos) { */

      // fileItem.isUploading = true;

      let fileItem;

      let metadata: firebase.storage.UploadMetadata = {
        customMetadata: {
          hola: "mundo"
        }
      };

      let uploadTask: firebase.storage.UploadTask =
        storageRef.child(this.CARPETA_IMAGENES + '/' + fileItem.filename).put(fileItem.file, metadata);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,

        (snapshot: firebase.storage.UploadTaskSnapshot) => fileItem.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => {
          console.log("Error al subir ", error);
          fileItem.error = error;
        },
        () => {

          fileItem.url = uploadTask.snapshot.downloadURL;
          //console.log("firebase.storage.Reference",uploadTask.snapshot.ref );
          //console.log("ref.name", uploadTask.snapshot.ref.name );
          //console.log("ref.fullPath", uploadTask.snapshot.ref.fullPath );
          //console.log("ref.bucket", uploadTask.snapshot.ref.bucket );
          //console.log("ref.storage", uploadTask.snapshot.ref.storage );
          //console.log("ref.toString()", uploadTask.snapshot.ref.toString() );


          //fileItem.isUploading = false;
          //fileItem.complete=true;

          let imagen = {
            nombre: fileItem.filename,
            url: fileItem.url,
            ref: uploadTask.snapshot.ref.toString(),
            ref_name: uploadTask.snapshot.ref.name,
            ref_fullPath: uploadTask.snapshot.ref.fullPath,
            ref_bucket: uploadTask.snapshot.ref.bucket
          };


          this.createImage(imagen)
            .then(ref => {

              console.log("referencia", ref);
              console.log("ref.id", ref.id);
              console.log("ref.path", ref.path);

              uploadTask.snapshot.ref.updateMetadata({
                customMetadata: {
                  db: ref.path
                }
              });

              ref.get().then(doc => {

                console.log("doc", doc.data());


                fileItem.isUploading = false;
                fileItem.complete = true;
                //para devolver la promesa con la url
                //urls.push(doc.data().url);
                urls.push(doc.data());
                resolve(urls);

              });


            });

        });


    });




    /*   }); */

    return promesa;







  }

  uploadNewPic(pic: Blob, thumb: Blob, fileItem: FileItem, anuncio: any) {

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
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        full_storage_uri: picRef.toString(),
        thumb_storage_uri: thumbRef.toString()
        /*     author: {
              uid: this.auth.currentUser.uid,
              full_name: this.auth.currentUser.displayName,
              profile_picture: this.auth.currentUser.photoURL
            } */
      };

      Object.assign(anuncio, imagen);
      return this.createImage(anuncio)
        .then(ref => ref);
      //return firebase.database().ref().update(update).then(() => newPostKey);
    });
  }

}


