import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Anuncio } from '../../model/anuncio.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.scss']
})
export class AnuncioComponent implements OnInit {
  @Input("anuncio") anuncio: Anuncio;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  selectedOption: string;

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
  }

  editarAnuncio() {
    this.router.navigate(["/editar-anuncio", this.anuncio.id]);
  }

  delAnuncio() {

    this.delete.emit(null);

  }



}
