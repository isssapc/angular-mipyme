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
  }

  createAnuncio(form: NgForm) {
    console.log("createAnuncio");
    console.log("form.value", form.value);


  }

}
