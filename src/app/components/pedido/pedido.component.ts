import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  pedidos: any = {
    productos: [
      {
        producto: "Pantalon",
        precio: "$1,000.00"
      },
      {
        producto: "Pants Deportivos",
        precio: "$1,000.00"
      },
      {
        producto: "Tenis",
        precio: "$1,500.00"
      }
    ],
    total: "$3,500.00",
    fecha: "12-12-2018 14:30 hrs",
    nombre_cliente:"Jorge Hernandez",
    email:"jorge@hotmail.com",
    telefono: "9615489897",
    colonia: "Centro",
    calle:"1ra Norte Poniente",
    numero:"443",
    cp:"2900"
  }



  constructor() { }

  ngOnInit() {
  }

}
