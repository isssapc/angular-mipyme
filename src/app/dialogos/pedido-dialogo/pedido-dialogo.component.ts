import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pedido-dialogo',
  templateUrl: './pedido-dialogo.component.html',
  styleUrls: ['./pedido-dialogo.component.scss']
})
export class PedidoDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PedidoDialogoComponent>
  ) { }

  ngOnInit() {
  }

  totalProductos() {
    let total = 0;
    this.data.productos.forEach(producto => {
      total = total + (producto.cantidad * producto.precio);
    });
    return total;
  }

}
