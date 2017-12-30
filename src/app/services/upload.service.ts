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

        let urls: string[] = [];

        let storageRef = firebase.storage().ref();

        for (let fileItem of archivos) {

          fileItem.isUploading = true;

          let uploadTask: firebase.storage.UploadTask =
            storageRef.child(this.CARPETA_IMAGENES + '/' + fileItem.filename).put(fileItem.file);

          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,

            (snapshot: firebase.storage.UploadTaskSnapshot) => fileItem.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            (error) => {
              console.log("Error al subir ", error);
              fileItem.error = error;
            },
            () => {

              fileItem.url = uploadTask.snapshot.downloadURL;
              //fileItem.isUploading = false;
              //fileItem.complete=true;
              this.createImage({ nombre: fileItem.filename, url: fileItem.url }).then(ref => {

                ref.get().then(doc => {

                  console.log("doc", doc.data());

                  //para devolver la promesa con la url
                  urls.push(doc.data().url);
                  resolve(urls);

                });
                console.log("referencia", ref);
                fileItem.isUploading = false;
                fileItem.complete = true;
              });

            })


        }

        


      });

      return promesa;





    }

  }

  private createImage(imagen) {
    return this.db.collection("imagenes").add(imagen);
  }

}
