import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  pedido: any={productos:[]};
  loading: boolean;


  constructor(
    private pedidoSrv: PedidoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.pedidoSrv.getPedido(id)
      .subscribe(pedido => {
        this.pedido = pedido;
        this.loading = false;
        console.log(pedido);

      },
      (error: any) => { },
      () => console.log("finally"));

  }

  totalProductos() {
    let total = 0;
    this.pedido.productos.forEach(producto => {
      total = total + (producto.cantidad * producto.precio);
    });
    return total;
  }


}
