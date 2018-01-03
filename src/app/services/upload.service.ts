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

}
