import { Component, OnInit, Input } from '@angular/core';
import { Anuncio } from '../../model/anuncio.model';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.scss']
})
export class AnuncioComponent implements OnInit {
  @Input("anuncio") anuncio:Anuncio;

  constructor() { }

  ngOnInit() {
  }

}
