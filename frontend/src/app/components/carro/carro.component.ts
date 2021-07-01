import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coche } from 'src/app/models/coche';
import { Hotel } from 'src/app/models/hotel';
import { Pedido } from 'src/app/models/pedido';
import { Vuelo } from 'src/app/models/vuelo';
import { CocheService } from 'src/app/services/coche.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {

  pedido: Pedido = {idVueloIda:'', idVueloVuelta:'', idHotel:'', idCoche:'', idUsuario:'', estado:'', _id:'', dias: 0};
  coche: Coche = {localidad:'', precio:0, asientos:0, marca:'', modelo:'', estado:'', _id:''};
  hotel: Hotel = { nombre: '', localidad:'', personas:'', precio:'', dormitorios:'', m2:'', estado: 'DISPONIBLE' };
  vueloIda: Vuelo = { empresa: '', origen:'', destino:'', precio:'', fecha:'', asientos:'', estado: 'DISPONIBLE' };
  vueloVuelta: Vuelo = { empresa: '', origen:'', destino:'', precio:'', fecha:'', asientos:'', estado: 'DISPONIBLE' };

  precioTotal: number = 0;

  constructor(
    public reservasService: ReservasService,
    private cocheService: CocheService,
    private hotelService: HotelService,
    private vueloService: VueloService,
    private router: Router
  ) {

   }

  ngOnInit(): void { //ON THE FLY
      this.recuperarPedido();
  }
  
  recuperarPedido(){
      this.reservasService.getPedidoUsuario().subscribe(
        res => {
          console.log(res)
           if(res.elemento == null)
            return;
           this.pedido = res.elemento;
           if(this.pedido.idCoche != '')
            this.recuperarCoche();
           if(this.pedido.idVueloIda != '' || this.pedido.idVueloVuelta != '')
            this.recuperarVuelos();
           if(this.pedido.idHotel != '')
            this.recuperarHotel();
        },
        err => console.log(err)
      )
  }

  recuperarCoche(){
    if(this.pedido.idCoche != ''){
      this.cocheService.getCoche(this.pedido.idCoche).subscribe(
        res => {
          this.coche = res.elemento;
          this.precioTotal += this.coche.precio * this.pedido.dias;
          console.log(res)
        },
        err => console.log(err)
      )
    }
  }
  
  recuperarVuelos() {
    if(this.pedido.idVueloIda != ''){
      this.vueloService.getVuelo(this.pedido.idVueloIda).subscribe(
        res => {
          this.vueloIda = res.elemento;
          this.precioTotal += Number(this.vueloIda.precio);
          console.log(res)
        },
        err => console.log(err)
      )
    }

    if(this.pedido.idVueloVuelta != ''){
      this.vueloService.getVuelo(this.pedido.idVueloVuelta).subscribe(
        res => {
          this.vueloVuelta = res.elemento;
          this.precioTotal += Number(this.vueloVuelta.precio);
          console.log(res)
        },
        err => console.log(err)
      )
    }
  }

  recuperarHotel() {
    if(this.pedido.idHotel != ''){
      this.hotelService.getHotel(this.pedido.idHotel).subscribe(
        res => {
          console.log(res)
          this.hotel = res.elemento;
          this.precioTotal += Number(this.hotel.precio) * this.pedido.dias;
        },
        err => console.log(err)
      )
    }
  }

  comprar(){
    this.router.navigate(['/pago'])
  }

  deshacer(){
    //Pasar productos a DISPONIBLE.
    this.cambiarProductosADisponibles();
    //Eliminar pedido.
    this.reservasService.deletePedidoUsuario().subscribe()
    this.router.navigate(['/home'])
  }

  cambiarProductosADisponibles(){
    if(this.pedido.idCoche != '')
      this.cocheService.cambiarEstado(this.pedido.idCoche, 'DISPONIBLE');
    if(this.pedido.idHotel != '')
      this.hotelService.cambiarEstado(this.pedido.idHotel, 'DISPONIBLE');
    if(this.pedido.idVueloIda != '')
      this.vueloService.cambiarEstado(this.pedido.idVueloIda, 'DISPONIBLE');
    if(this.pedido.idVueloVuelta != '')
      this.vueloService.cambiarEstado(this.pedido.idVueloVuelta, 'DISPONIBLE');
  }

}
