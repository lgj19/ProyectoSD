import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coche } from 'src/app/models/coche';
import { Pedido } from 'src/app/models/pedido';
import { CocheService } from 'src/app/services/coche.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {

  pedido: Pedido = {idVuelo:'', idHotel:'', idCoche:'', idUsuario:'', estado:'', _id:''};
  coche: Coche = {localidad:'', precio:0, asientos:0, marca:'', modelo:'', estado:'', _id:''};
  hotel: any;
  vuelo: any;
  precioTotal: number = 0;

  constructor(
    public pedidoService: PedidoService,
    private cocheService: CocheService,
    private router: Router
  ) {

   }

  ngOnInit(): void { //ON THE FLY
    this.recuperarPedido();
  }
  
  recuperarPedido(){
    this.pedidoService.getPedidoUsuario().subscribe(
      res => {
         this.pedido = res.elemento;
         this.recuperarCoche();
         this.recuperarVuelo();
         this.recuperarHotel();
      },
      err => console.log(err)
    )

    ;
  }

  recuperarCoche(){
    if(this.pedido.idCoche != ''){
      this.cocheService.getCoche(this.pedido.idCoche).subscribe(
        res => {
          this.coche = res.elemento;
          this.precioTotal += this.coche.precio;
        },
        err => console.log(err)
      )
    }
  }
  
  recuperarVuelo() { }

  recuperarHotel() { }
  
  calcularPrecio(){ }

  comprar(){
    this.router.navigate(['/pago'])
  }

}
