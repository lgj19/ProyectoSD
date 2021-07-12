import { Component, OnInit } from '@angular/core';
import { Coche } from 'src/app/models/coche';
import { Hotel } from 'src/app/models/hotel';
import { Pedido } from 'src/app/models/pedido';
import { Vuelo } from 'src/app/models/vuelo';
import { CocheService } from 'src/app/services/coche.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  pedido: Pedido = {idVueloIda:'', idVueloVuelta:'', idHotel:'', idCoche:'', idUsuario:'', estado:'', _id:'', dias: 0, fechaInicio:'', fechaFin:''};
  coche: Coche = {localidad:'', precio:0, asientos:0, marca:'', modelo:'', fechasReservadas: [['', '']], _id:''};
  hotel: Hotel = { nombre: '', localidad:'', personas:'', precio:'', dormitorios:'', m2:'',  fechasReservadas: [['', '']] };
  vueloIda: Vuelo = { empresa: '', origen:'', destino:'', precio:'', fecha:'', asientos:'', estado: 'DISPONIBLE' };
  vueloVuelta: Vuelo = { empresa: '', origen:'', destino:'', precio:'', fecha:'', asientos:'', estado: 'DISPONIBLE' };

  precioTotal: number = 0;

  constructor(private reservasService: ReservasService, private cocheService: CocheService, private hotelService: HotelService,
    private vueloService: VueloService) { }

  ngOnInit(): void {
    this.recuperarPedido();
  }

  recuperarPedido(){
    this.reservasService.getPedidoUsuario().subscribe(
      res => {
        console.log(res.result)
         if(res.elemento == null || res.elemento.estado != 'COMPRADO')
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
  
}
