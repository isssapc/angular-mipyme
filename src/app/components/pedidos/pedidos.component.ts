import { Component, OnInit } from '@angular/core';
import { ClienteDialogoComponent } from '../../dialogos/cliente-dialogo/cliente-dialogo.component';
import { MatDialog } from '@angular/material';
import { PedidoDialogoComponent } from '../../dialogos/pedido-dialogo/pedido-dialogo.component';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  loading: boolean = false;

  pedidos: any[] = [];/*  [
    {
      fecha: "12-12-2017 14:00hrs",
      cliente: "Jorge Hernandez",
    },
    {
      fecha: "12-12-2017 14:00hrs",
      cliente: "José López",
    },
    {
      fecha: "12-12-2017 14:00hrs",
      cliente: "Maria Perez",
    }
  ] */

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private pedidoSrv: PedidoService
  ) { }

  ngOnInit() {
    this.pedidoSrv.getPedidos()
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      })
  }

  verCliente() {

    let dialogRef = this.dialog.open(ClienteDialogoComponent, {
      data: {
        nombre: "Jorge Hernandez",
        telefono: "9612365458",
        email: "jorge@hotmail.com",
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });

  }


  verPedido() {

    let dialogRef = this.dialog.open(PedidoDialogoComponent, {
      data: {

        pedidos: [
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


      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });

  }

  verPedidoCompleto() {
    this.router.navigate(["/pedido"]);
  }



}
