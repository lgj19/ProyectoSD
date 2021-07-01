import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservasService } from 'src/app/services/reservas.service';
import { Pedido } from 'src/app/models/pedido';
import { CocheService } from 'src/app/services/coche.service';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';
import { VueloService } from 'src/app/services/vuelo.service';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  pedido: Pedido = {idUsuario: '', idCoche: '', idHotel: '', idVueloIda: '', idVueloVuelta: '', estado: 'RESERVADO', dias: 0};
  
  strTipoReserva: string[] = [];

  constructor(
    public reservasService: ReservasService,
    private cocheService: CocheService,
    private hotelService: HotelService,
    private vueloService: VueloService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarReservasSeleccionadas();
   }

  addForm(form: NgForm){

    //crear el pedido y modificar estado de los productos
    this.seleccionarCoche();
    this.seleccionarHotel();
    this.seleccionarVuelo();

    this.hacerReserva();
    
    this.router.navigate(['/pago']);

  }
  


  hacerReserva(){
    this.reservasService.putReserva(this.pedido).subscribe( 
      res => console.log(res.status, res.elemento),
      err => console.error(err)
    )
  }

  seleccionarCoche(){
    if(this.pedido.idCoche != '')
      this.cocheService.cambiarEstado(this.pedido.idCoche, 'RESERVADO');
  }

  seleccionarHotel(){
    if(this.pedido.idHotel != ''){
      this.hotelService.cambiarEstado(this.pedido.idHotel, 'RESERVADO');
    }
  }

  seleccionarVuelo(){
    if(this.pedido.idVueloIda != ''){
      this.vueloService.cambiarEstado(this.pedido.idVueloIda, 'RESERVADO');
    }

    if(this.pedido.idVueloVuelta != ''){
      this.vueloService.cambiarEstado(this.pedido.idVueloVuelta, 'RESERVADO');
    }
  }

  mostrarReservasSeleccionadas(){
    if(this.reservasService.data.tipoReserva[0])
      this.strTipoReserva.push('Coche');
    if(this.reservasService.data.tipoReserva[1])
      this.strTipoReserva.push('Vuelo');
    if(this.reservasService.data.tipoReserva[2])
      this.strTipoReserva.push('Hotel')
  }

}
