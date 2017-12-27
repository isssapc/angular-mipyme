import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { log } from 'util';

@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.component.html',
  styleUrls: ['./crear-anuncio.component.scss']
})
export class CrearAnuncioComponent implements OnInit {

  anuncio: any = {};

  constructor() { }

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


  }

}
