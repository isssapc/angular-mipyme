import { Component, OnInit } from '@angular/core';
import { ClienteDialogoComponent } from '../../dialogos/cliente-dialogo/cliente-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PedidoDialogoComponent } from '../../dialogos/pedido-dialogo/pedido-dialogo.component';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { ConfirmarBorradoDialogoComponent } from '../../dialogos/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';

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
    private pedidoSrv: PedidoService,
    public snackBar: MatSnackBar,
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

  delUsuario(pedido) {


    /* let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Pedido",
        content: `¿Desea eliminar el Pedido?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.pedidoSrv.delPedido(pedido.id).then(() => {

          this.snackBar.open("Pedido Eliminado", "Cerrar", {
            duration: 2000
          });
        });

      }

    });
 */
  }



}
