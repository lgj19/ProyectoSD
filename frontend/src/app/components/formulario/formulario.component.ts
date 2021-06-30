import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CocheService } from '../../services/coche.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';

import * as moment from 'moment';
import { FechaService } from 'src/app/services/fecha.service';
import { HotelService } from 'src/app/services/hotel.service';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {

  tiposViaje =[{name: "Ida y vuelta", value: "Ida y vuelta"}, {name: "Ida", value: "Ida"}, {name: "Vuelta", value: "Vuelta"}];
  pedido: Pedido = {idUsuario: '', idCoche: '', idHotel: '', idVueloIda: '', idVueloVuelta:'', estado: 'RESERVADO', dias: 0};
 
  constructor(private cocheService: CocheService,
    public reservasService: ReservasService,
    private fechaService: FechaService,
    private hotelService: HotelService,
    private vueloService: VueloService,
    private router: Router) { }


  ngOnInit(): void {
  }

  errorFechas(){
   const dias = this.fechaService.calcularDias(this.reservasService.data.fechaOrigen, this.reservasService.data.fechaDestino);

    if(dias <= 0)
      return true;
    return false; 
  }

  addForm(form: NgForm){
    this.pedido.dias = 
    this.reservasService.data.dias = this.fechaService.calcularDias(this.reservasService.data.fechaOrigen, this.reservasService.data.fechaDestino)
    
    this.reservasService.createReserva(this.pedido).subscribe(
      res => console.log('Reserva creada en el form.'),
      err => console.log(err)
    )

    this.recuperarCoches();
    this.recuperarHoteles();
    this.recuperarVuelos();
     
    this.router.navigate(['/reservas'])
  }



  recuperarCoches(){
    if(this.reservasService.data.tipoReserva[0]){ //Coches
      this.cocheService.getCochesByLocByAsi(this.reservasService.data.destino, Number(this.reservasService.data.personas)).subscribe(
        res => {
          this.reservasService.reservasCoches = res.elementos; // selecciono los elementos
        },
        err => console.log(err)
      )
    }
  }

  recuperarHoteles(){
    if(this.reservasService.data.tipoReserva[2]){ //Hoteles
      this.hotelService.getHotelesByLocByPer(this.reservasService.data.destino, Number(this.reservasService.data.personas)).subscribe(
        res => {
          this.reservasService.reservasHoteles = res.elementos;
        },
        err => console.log(err)
      )
    }
  }

  recuperarVuelos(){
    if(this.reservasService.data.tipoReserva[1]){
      if(this.reservasService.data.tipoViaje == "Ida y vuelta"){ //Vuelos
        this.recuperarVuelosIda();
        this.recuperarVuelosVuelta();
      }
      else if(this.reservasService.data.tipoViaje == "Ida")
        this.recuperarVuelosIda();
      else if(this.reservasService.data.tipoViaje == "Vuelta")
        this.recuperarVuelosVuelta();
    }
    
  }

  recuperarVuelosIda(){
    this.vueloService.getVuelosByOriByDestByAsiByFec(this.reservasService.data.origen, 
                  this.reservasService.data.destino,
                  String(this.reservasService.data.fechaOrigen),
                  Number(this.reservasService.data.personas)).subscribe(
      res => {
        this.reservasService.reservasVuelosIda = res.elementos; // selecciono los elementos
      },
      err => console.log(err)
    )
  }
  recuperarVuelosVuelta(){
    this.vueloService.getVuelosByOriByDestByAsiByFec(this.reservasService.data.destino, 
                  this.reservasService.data.origen,
                  String(this.reservasService.data.fechaDestino), 
                  Number(this.reservasService.data.personas)).subscribe(
      res => {
        this.reservasService.reservasVuelosVuelta = res.elementos; // selecciono los elementos
      },
      err => console.log(err)
    )
  }

  

}
