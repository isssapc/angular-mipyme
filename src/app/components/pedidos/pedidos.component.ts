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
        console.log("pedido ok", pedidos);
      })
  }

  verCliente(pedido) {

    let dialogRef = this.dialog.open(ClienteDialogoComponent, {
      data: {
        nombre: pedido.cliente_nombre,
        email: pedido.cliente_email,
        numero: pedido.cliente_numero,        

      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });

  }


  verProductos(pedido) {

    let dialogRef = this.dialog.open(PedidoDialogoComponent, {
      data: {

        productos: pedido.productos

      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });

  }

  verPedidoCompleto(pedido) {
    this.router.navigate(["/pedido",pedido.id]);
  }



}
