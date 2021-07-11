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

  errTransaction: boolean = false;

  pedido: Pedido = {idUsuario: '', idCoche: '', idHotel: '', idVueloIda: '', idVueloVuelta: '', estado: 'RESERVADO', dias: 0, fechaInicio:'', fechaFin:''};
  fechas: [string, string] = ['','']
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

  async addForm(form: NgForm){

    //crear el pedido y modificar estado de los productos
    this.fechas = [String(this.reservasService.data.fechaOrigen), String(this.reservasService.data.fechaDestino)];
    this.createReservaTrans();
    
  }

  
  createReservaTrans(){
    this.reservasService.createReservaTransaction(this.pedido.idCoche, this.pedido.idHotel, this.pedido.idVueloIda, this.pedido.idVueloVuelta,
        this.fechas, this.fechas).subscribe(
         (res:any) => {
            console.log(res.result);
            this.router.navigate(['/carro']);
          },
          err => {
            console.log(err);
            alert(`Error ${err.status}. ${err.error.result}`);
          }
        )
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
