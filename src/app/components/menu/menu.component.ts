import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input("sidenav") sidenav: MatSidenav;

  links: any[] = [


    { titulo: "Tablero", route: "tablero" },
    { titulo: "Usuarios", route: "usuarios" },
    { titulo: "Anuncios", route: "anuncios" },
    { titulo: "Crear Anuncio", route: "crear-anuncio" },
    //{ titulo: "Usuarios", route: "usuarios" },



  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  gotoRoute(route) {

    this.router.navigate([route]);
    this.sidenav.toggle();
  }


}
