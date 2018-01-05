import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  loading:boolean=false;

  clientes: any = [
    {
      nombre: "José López",
      email: "jose@hotmail.com",
      telefono: "9613216548",
    },
    {
      nombre: "Jorge Hernandez",
      email: "jorge@hotmail.com",
      telefono: "9613216548",
    },
    {
      nombre: "Maria Perez",
      email: "maria@hotmail.com",
      telefono: "9613216548",
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
