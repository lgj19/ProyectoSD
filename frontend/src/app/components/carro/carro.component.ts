import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coche } from 'src/app/models/coche';
import { Pedido } from 'src/app/models/pedido';
import { CocheService } from 'src/app/services/coche.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { ReservasComponent } from '../reservas/reservas.component';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {

  pedido: Pedido = {idVuelo:'', idHotel:'', idCoche:'', idUsuario:'', estado:'', _id:'', dias: 0};
  coche: Coche = {localidad:'', precio:0, asientos:0, marca:'', modelo:'', estado:'', _id:''};
  hotel: any;
  vuelo: any;
  precioTotal: number = 0;

  constructor(
    public pedidoService: PedidoService,
    private cocheService: CocheService,
    private reservaService: ReservasService,
    private router: Router
  ) {

   }

  ngOnInit(): void { //ON THE FLY
    if(this.reservaService.data.destino != '')
      this.recuperarPedido();
  }
  
  recuperarPedido(){
    this.pedidoService.getPedidoUsuario().subscribe(
      res => {
         this.pedido = res.elemento;
         if(this.reservaService.data.tipoViaje[0])
          this.recuperarCoche();
         if(this.reservaService.data.tipoViaje[1])
          this.recuperarVuelo();
         if(this.reservaService.data.tipoViaje[2])
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
          this.precioTotal += this.coche.precio * this.pedido.dias;
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
