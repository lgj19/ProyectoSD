import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coche } from 'src/app/models/coche';
import { Hotel } from 'src/app/models/hotel';
import { Pedido } from 'src/app/models/pedido';
import { Vuelo } from 'src/app/models/vuelo';
import { BancoService } from 'src/app/services/banco.service';
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

  numRespCompra: Number = 0;
  textRespCompra: String = '';

  myForm: FormGroup;
  numTarjetaF: FormControl;
  numSecretoTarjetaF: FormControl;
  titularF: FormControl;

  pedido: Pedido = {idVueloIda:'', idVueloVuelta:'', idHotel:'', idCoche:'', idUsuario:'', estado:'', _id:'', dias: 0, fechaInicio:'', fechaFin:''};
  coche: Coche = {localidad:'', precio:0, asientos:0, marca:'', modelo:'', fechasReservadas: [['', '']], _id:''};
  hotel: Hotel = { nombre: '', localidad:'', personas:'', precio:'', dormitorios:'', m2:'',  fechasReservadas: [['', '']] };
  vueloIda: Vuelo = { empresa: '', origen:'', destino:'', precio:'', fecha:'', asientos:'', estado: 'DISPONIBLE' };
  vueloVuelta: Vuelo = { empresa: '', origen:'', destino:'', precio:'', fecha:'', asientos:'', estado: 'DISPONIBLE' };

  precioTotal: number = 0;
  fechas: [string, string] = ['','']
  fasePago: Boolean = false;

  constructor(
    public reservasService: ReservasService, private cocheService: CocheService, private hotelService: HotelService,
    private vueloService: VueloService, private router: Router, private fb: FormBuilder, private bancoService: BancoService) 
  {
    this.numTarjetaF = new FormControl('',[Validators.required, Validators.minLength(19), Validators.maxLength(19)]);
    this.numSecretoTarjetaF = new FormControl('',[Validators.required, Validators.min(1), Validators.max(999)]);
    this.titularF = new FormControl('',[Validators.required, Validators.min(1)]);

    this.myForm = this.fb.group({
      numTarjeta: this.numTarjetaF, numSecretoTarjeta: this.numSecretoTarjetaF, titular: this.titularF
    });
  }

  ngOnInit(): void {
    this.recuperarPedido();
  }

  addForm(){}
  
  recuperarPedido(){
      this.reservasService.getPedidoUsuario().subscribe(
        res => {
          console.log(res.result)
           if(res.elemento == null || res.elemento.estado != 'RESERVADO')
            return;
           this.pedido = res.elemento;
           if(this.pedido.idCoche != '')
            this.recuperarCoche();
           if(this.pedido.idVueloIda != '' || this.pedido.idVueloVuelta != '')
            this.recuperarVuelos();
           if(this.pedido.idHotel != '')
            this.recuperarHotel();
        },
        err => console.log(`Error ${err.status}. ${err.error.result}`)
      )
  }

  recuperarCoche(){
    if(this.pedido.idCoche != ''){
      this.cocheService.getCoche(this.pedido.idCoche).subscribe(
        res => {
          this.coche = res.elemento;
          this.precioTotal += this.coche.precio * this.pedido.dias;
          console.log(res.result)
        },
        err => console.log(`Error ${err.status}. ${err.error.result}`)
      )
    }
  }
  
  recuperarVuelos() {
    if(this.pedido.idVueloIda != ''){
      this.vueloService.getVuelo(this.pedido.idVueloIda).subscribe(
        res => {
          this.vueloIda = res.elemento;
          this.precioTotal += Number(this.vueloIda.precio);
          console.log(res.result)
        },
        err => console.log(`Error ${err.status}. ${err.error.result}`)
      )
    }

    if(this.pedido.idVueloVuelta != ''){
      this.vueloService.getVuelo(this.pedido.idVueloVuelta).subscribe(
        res => {
          this.vueloVuelta = res.elemento;
          this.precioTotal += Number(this.vueloVuelta.precio);
          console.log(res.result)
        },
        err => console.log(`Error ${err.status}. ${err.error.result}`)
      )
    }
  }

  recuperarHotel() {
    if(this.pedido.idHotel != ''){
      this.hotelService.getHotel(this.pedido.idHotel).subscribe(
        res => {
          console.log(res.result)
          this.hotel = res.elemento;
          this.precioTotal += Number(this.hotel.precio) * this.pedido.dias;
        },
        err => console.log(`Error ${err.status}. ${err.error.result}`)
      )
    }
  }

  pasarAlPago() {
    this.fasePago = true;
  }

  comprar(){
    this.reservasService.createPurchaseTransaction(this.precioTotal,this.titularF.value, this.numTarjetaF.value, this.numSecretoTarjetaF.value,
      this.pedido.idVueloIda, this.pedido.idVueloVuelta, this.pedido._id!, this.pedido.idCoche, this.pedido.idHotel).subscribe(
        (res: any) => {
          console.log(res.result);
          this.numRespCompra = res.status;
          this.textRespCompra = res.result;
          this.router.navigate(['/compras'])
        },      
        err => {
          alert(`Error ${err.status}. ${err.error.result}`)
          this.numRespCompra = err.error.status; 
          this.textRespCompra = err.error.result;
    });
  }

  deshacer(){
    //this.cambiarProductosADisponibles();
    //this.reservasService.deletePedidoUsuario().subscribe();
    this.fechas = [this.pedido.fechaInicio, this.pedido.fechaFin];
    this.reservasService.eliminateReservationTransaction(this.pedido, this.fechas).subscribe(
      (res: any) => {
        console.log(res.result);
        this.numRespCompra = res.status;
        this.textRespCompra = res.result;
        this.router.navigate(['/home']);
      },
      err => {
        alert(`Error ${err.status}. ${err.error.result}`)
      }
    )
  }
/*
  cambiarProductosADisponibles(){
    this.eliminarFechaReservaCoche();
    this.eliminarFechaReservaHotel();
    this.eliminarEstadoReservadoVuelos();
  }

  eliminarFechaReservaCoche(){
    if(this.pedido.idCoche != ''){
      this.cocheService.updateFechasReservadasById(this.pedido.idCoche, [this.pedido.fechaInicio, this.pedido.fechaFin]).
        subscribe(
          res => console.log(res.result),
          err => {
            console.error(`Error ${err.status}. ${err.error.result}`);
          }
        );
    }
  }

  eliminarFechaReservaHotel(){
    if(this.pedido.idHotel != ''){
      this.hotelService.updateFechasReservadasById(this.pedido.idHotel, [this.pedido.fechaInicio, this.pedido.fechaFin]).
        subscribe(
          res => console.log(res.result),
          err => {
            console.error(`Error ${err.status}. ${err.error.result}`);
          }
        );
    }
  }

  eliminarEstadoReservadoVuelos(){
    if(this.pedido.idVueloIda != '')
      this.vueloService.cambiarEstado(this.pedido.idVueloIda, 'DISPONIBLE').subscribe(
        res => console.log(res.result),
        err => {
          console.error(`Error ${err.status}. ${err.error.result}`);
        }
      );
    if(this.pedido.idVueloVuelta != '')
      this.vueloService.cambiarEstado(this.pedido.idVueloVuelta, 'DISPONIBLE').subscribe(
        res => console.log(res.result),
        err => {
          console.error(`Error ${err.status}. ${err.error.result}`);
        }
      );
  }
*/
}
