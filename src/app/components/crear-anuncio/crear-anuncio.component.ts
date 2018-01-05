import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialog, MatSnackBar } from '@angular/material';
import { AgregarImagenDialogoComponent } from '../../dialogos/agregar-imagen-dialogo/agregar-imagen-dialogo.component';
import { AnuncioService } from '../../services/anuncio.service';
import { FileItem } from '../../model/file-item';
import { UploadService } from '../../services/upload.service';
import { log } from 'util';


interface FullThumb{
  full:Blob,
  thumb:Blob
}


@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.component.html',
  styleUrls: ['./crear-anuncio.component.scss']
})
export class CrearAnuncioComponent implements OnInit {

  anuncio: any = {};
  selectedOption: string;

  fileItems: FileItem[] = [];

  FULL_IMAGE_SPECS: any = {
    maxDimension: 1280,
    quality: 0.9
  };

  THUMB_IMAGE_SPECS: any = {
    maxDimension: 640,
    quality: 0.7
  };

  constructor(
    public dialog: MatDialog,
    private anuncioSrv: AnuncioService,
    public snackBar: MatSnackBar,
    private uploadSrv: UploadService
  ) { }

  ngOnInit() {
    /*     let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1; // Enero es 0
        let yyyy = now.getFullYear();
        let today = yyyy + "-" + mm + "-" + dd; */

    let utc = new Date().toJSON().slice(0, 10);

    this.anuncio.fecha_publicacion = utc;



  }

  createAnuncio(form: NgForm) {
    console.log("createAnuncio");
    console.log("form.value", form.value);
    console.log("anuncio", this.anuncio);


    this.anuncioSrv.createAnuncio(this.anuncio).then(ref => {
      console.log("createAnuncio", ref.id);
      this.anuncio = {};
      form.reset();
      this.snackBar.open("Anuncio Creado", "Cerrar", {
        duration: 2000
      });

    });


  }

  agregarImagen() {

    console.log("Imagen");
    let dialogRef = this.dialog.open(AgregarImagenDialogoComponent, {
      data: {

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  uploadImage() {

    console.log("uploadImage");
    /* 
        this.uploadSrv.doUpload(this.fileItems).then(urls => {
          console.log("termina el upload", urls[0]);
    
          //no sabemos si ya se ha realizado la funcion para crear el thumbnail
          this.anuncio.img_src = (urls[0].url as string).replace(urls[0].nombre, "thumb_" + urls[0].nombre);
    
        }); */
    console.log("antes");

    this.generateImages2()
      .then(result => {
        
        console.log("full", result.full);
        console.log("thumb", result.thumb);
        
        this.uploadSrv.uploadNewPic(result.full, result.thumb, "usuario.jpg", "dksljfña").then(doc=>{
          console.log("termina el upload", doc);
          
        });
        

      });
    


  }


  readImage(event: Event, fileList: FileList, anuncio) {
    console.log("onChange");

    //console.log("onChangeFile", event, fileList);

    if (fileList && fileList[0]) {

      let file = fileList[0];

      this.fileItems.push(new FileItem(file));


      if (file.type.match("image.*")) {
        let reader = new FileReader();

        //reader.onload = function (e: any) {

        //img.src=e.target.result;
        //anuncio.img_src = e.target.result;

        //}
        reader.onload = (e: any) => this.displayImage(e.target.result);

        reader.readAsDataURL(file);
      }



    }

  }

  displayImage(url) {
    console.log("displayImage");

    this.anuncio.img_src = url;
  }


  generateImages() {

    console.log("generateImages");

    //let final= new Promise();

    let final;
    const displayPicture = url => {
      const image = new Image();
      image.src = url;


      const fullPromise = new Promise((resolve, reject) => {
        // Generate full sized image.
        const maxFullDimension = this.FULL_IMAGE_SPECS.maxDimension;
        const fullCanvas = this.getScaledCanvas(image, maxFullDimension);
        fullCanvas.toBlob(resolve, 'image/jpeg', this.FULL_IMAGE_SPECS.quality);
      });



      const thumbPromise = new Promise((resolve, reject) => {
        // Generate thumb.
        const maxThumbDimension = this.THUMB_IMAGE_SPECS.maxDimension;
        const thumbCanvas = this.getScaledCanvas(image, maxThumbDimension);
        thumbCanvas.toBlob(resolve, 'image/jpeg', this.THUMB_IMAGE_SPECS.quality);
      });

      return Promise.all([fullPromise, thumbPromise])
        .then(results => {

          console.log("promise all", results);

          return {
            full: results[0],
            thumb: results[1]
          };

        });



    };

    const reader = new FileReader();
    reader.onload = (e: any) => displayPicture(e.target.result);
    reader.readAsDataURL(this.fileItems[0].file);






  }

  generateImages2():Promise<FullThumb> {

    console.log("generateImages");

    return new Promise((resolve, reject) => {

      const displayPicture = url => {
        const image = new Image();
        image.src = url;


        const fullPromise = new Promise((resolve, reject) => {
          // Generate full sized image.
          const maxFullDimension = this.FULL_IMAGE_SPECS.maxDimension;
          const fullCanvas = this.getScaledCanvas(image, maxFullDimension);
          fullCanvas.toBlob(resolve, 'image/jpeg', this.FULL_IMAGE_SPECS.quality);
        });



        const thumbPromise = new Promise((resolve, reject) => {
          // Generate thumb.
          const maxThumbDimension = this.THUMB_IMAGE_SPECS.maxDimension;
          const thumbCanvas = this.getScaledCanvas(image, maxThumbDimension);
          thumbCanvas.toBlob(resolve, 'image/jpeg', this.THUMB_IMAGE_SPECS.quality);
        });

        return Promise.all([fullPromise, thumbPromise])
          .then(results => {

            console.log("promise all", results);

            resolve({
              full: results[0] as Blob,
              thumb: results[1] as Blob
            });

          });

      };

      const reader = new FileReader();
      reader.onload = (e: any) => displayPicture(e.target.result);
      reader.readAsDataURL(this.fileItems[0].file);

    });



  }


  private getScaledCanvas(image, maxDimension) {
    const thumbCanvas = document.createElement('canvas');
    if (image.width > maxDimension ||
      image.height > maxDimension) {
      if (image.width > image.height) {
        thumbCanvas.width = maxDimension;
        thumbCanvas.height = maxDimension * image.height / image.width;
      } else {
        thumbCanvas.width = maxDimension * image.width / image.height;
        thumbCanvas.height = maxDimension;
      }
    } else {
      thumbCanvas.width = image.width;
      thumbCanvas.height = image.height;
    }
    thumbCanvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height,
      0, 0, thumbCanvas.width, thumbCanvas.height);
    return thumbCanvas;
  }




}
