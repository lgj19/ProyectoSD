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

  idCocheSelect = '';
  idHotelSelect = '';
  idVueloIdaSelect = '';
  idVueloVueltaSelect = '';
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
    //validarFormulario
    
    //crear el pedido y modificar estado de los productos
    this.seleccionarCoche();
    this.seleccionarHotel();
    this.seleccionarVuelo();

    this.hacerReserva();
    
    this.router.navigate(['/pago']);

  }
  

  hacerReserva(){
    this.reservasService.putReserva(this.pedido).subscribe( 
      res => console.log('Reserva modificada.'),
      err => console.log(err)
    )
  }

  seleccionarCoche(){
    if(this.idCocheSelect != ''){
      this.pedido.idCoche = this.idCocheSelect;
      this.cocheService.cambiarEstado(this.idCocheSelect, 'RESERVADO');
    }
  }

  seleccionarHotel(){
    if(this.idHotelSelect != ''){
      this.pedido.idHotel = this.idHotelSelect;
      this.hotelService.cambiarEstado(this.idHotelSelect, 'RESERVADO');
    }
  }

  seleccionarVuelo(){
    if(this.idVueloIdaSelect != ''){
      this.pedido.idVueloIda = this.idVueloIdaSelect;
      this.vueloService.cambiarEstado(this.idVueloIdaSelect, 'RESERVADO');
    }
    if(this.idVueloVueltaSelect != ''){
      this.pedido.idVueloVuelta = this.idVueloVueltaSelect;
      this.vueloService.cambiarEstado(this.idVueloVueltaSelect, 'RESERVADO');
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
