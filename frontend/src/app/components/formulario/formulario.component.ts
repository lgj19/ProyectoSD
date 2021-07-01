import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormArray, FormGroup, Validators, FormControlName } from '@angular/forms';
import { CocheService } from '../../services/coche.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';

import { FechaService } from 'src/app/services/fecha.service';
import { HotelService } from 'src/app/services/hotel.service';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  errFecha=false;

  myForm: FormGroup;
  origenF: FormControl;
  destinoF: FormControl;
  personasF: FormControl;
  fechaOrigenF: FormControl;
  fechaDestinoF: FormControl;
  tipoViajeF: FormControl;
  tipoCocheF: FormControl;
  tipoVueloF: FormControl;
  tipoHotelF: FormControl;

  tiposViaje =[{name: "Ida y vuelta", value: "Ida y vuelta"}, {name: "Ida", value: "Ida"}, {name: "Vuelta", value: "Vuelta"}];
  tiposReserva =[{name: "Coche", value: "Coche"}, {name: "Vuelo", value: "Vuelo"}, {name: "Hotel  ", value: "Hotel"}];

  pedido: Pedido = {idUsuario: '', idCoche: '', idHotel: '', idVueloIda: '', idVueloVuelta:'', estado: 'RESERVADO', dias: 0};
 
  constructor
  (private cocheService: CocheService,public reservasService: ReservasService, private fechaService: FechaService,
    private hotelService: HotelService, private vueloService: VueloService, private router: Router, private fb: FormBuilder)
  {
      this.origenF = new FormControl('',[Validators.required, Validators.min(1)]);
      this.destinoF = new FormControl('',[Validators.required, Validators.min(1)]);
      this.personasF = new FormControl('',[Validators.required, Validators.min(1)]);
      this.fechaOrigenF = new FormControl('',[Validators.required, Validators.min(1)]);
      this.fechaDestinoF = new FormControl('',[Validators.required, Validators.min(1)]);
      this.tipoViajeF = new FormControl('',[Validators.required, Validators.min(1)]);
      this.tipoCocheF = new FormControl('',[Validators.required, Validators.min(1)]);
      this.tipoVueloF = new FormControl('',[Validators.required, Validators.min(1)]);
      this.tipoHotelF = new FormControl('',[Validators.required, Validators.min(1)]);

      this.myForm = this.fb.group({
        origen: this.origenF, destino: this.destinoF, personas: this.personasF, fechaOrigen: this.fechaOrigenF,
        fechaDestino: this.fechaDestinoF, tipoViaje: this.tipoViajeF, selectedReserva: '',
        tipoCoche: this.tipoCocheF, tipoVuelo: this.tipoVueloF, tipoHotel: this.tipoHotelF
      });

  }



  ngOnInit(): void { 
    this.reiniciarFormulario();
  }

  reiniciarFormulario(){
    this.reservasService.reservasCoches = [];
    this.reservasService.reservasVuelosIda = [];
    this.reservasService.reservasVuelosVuelta = [];
    this.reservasService.reservasHoteles = [];
  }

  errorFechas(){
    return this.fechaService.errorFechas(this.reservasService.data.fechaOrigen, this.reservasService.data.fechaDestino);
  }

  addForm(){
    this.rellenarDatos();

    if(!this.comprobarValidacion())
     return;

    this.recuperarCoches();
    this.recuperarHoteles();
    this.recuperarVuelos();
    
    this.reservasService.createReserva(this.pedido).subscribe( //Crea pedido con usuario.
      res => console.log(res.result),
      err => console.error(err)
    )
   
    this.router.navigate(['/reservas'])
  }


  comprobarValidacion(): boolean {
    var ret = true;
    if(this.origenF.invalid){
      this.origenF.markAsTouched();
      ret = false;
    }  
    if(this.destinoF.invalid){
      this.destinoF.markAsTouched();
      ret = false;
    }
    if(this.fechaOrigenF.invalid){
      this.fechaOrigenF.markAsTouched();
      ret = false;
    }
    if(this.fechaDestinoF.invalid){
      this.fechaDestinoF.markAsTouched();
      ret = false;
    }
    if(this.personasF.invalid){
      this.personasF.markAsTouched();
      ret = false;
    }
    if(this.tipoViajeF.invalid){
      this.tipoViajeF.markAsTouched();
      ret = false;
    }
    if(this.errorFechas()){
      ret=false
      this.errFecha=true;
    }else{
      this.errFecha=false;
    }
    
    return ret;      
  }
  
  rellenarDatos(){
    this.reservasService.data.origen = this.origenF.value;
    this.reservasService.data.destino = this.destinoF.value;
    this.reservasService.data.personas = this.personasF.value;
    this.reservasService.data.fechaOrigen = this.fechaOrigenF.value;
    this.reservasService.data.fechaDestino = this.fechaDestinoF.value;
    this.reservasService.data.tipoViaje = this.tipoViajeF.value;

    this.pedido.dias = 
    this.reservasService.data.dias = 
    this.fechaService.calcularDias(this.reservasService.data.fechaOrigen, this.reservasService.data.fechaDestino);

    this.reservasService.data.tipoReserva[0] = (this.tipoCocheF.value) ? true : false;
    this.reservasService.data.tipoReserva[1] = (this.tipoVueloF.value) ? true : false;
    this.reservasService.data.tipoReserva[2] = (this.tipoHotelF.value) ? true : false;
  }



  recuperarCoches(){
    if(this.reservasService.data.tipoReserva[0]){ //Coches
      this.cocheService.getCochesByLocByAsi(this.reservasService.data.destino, Number(this.reservasService.data.personas)).subscribe(
        res => {
          console.log(res.result, res.elementos)
          this.reservasService.reservasCoches = res.elementos; // selecciono los elementos
        },
        err => console.error(err)
      )
    }
  }

  recuperarHoteles(){
    if(this.reservasService.data.tipoReserva[2]){ //Hoteles
      this.hotelService.getHotelesByLocByPer(this.reservasService.data.destino, Number(this.reservasService.data.personas)).subscribe(
        res => {
          console.log(res.result, res.elementos)
          this.reservasService.reservasHoteles = res.elementos;
        },
        err => console.error(err)
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
        console.log(res.result, res.elementos)
        this.reservasService.reservasVuelosIda = res.elementos; // selecciono los elementos
      },
      err => console.error(err)
    )
  }
  recuperarVuelosVuelta(){
    this.vueloService.getVuelosByOriByDestByAsiByFec(this.reservasService.data.destino, 
                  this.reservasService.data.origen,
                  String(this.reservasService.data.fechaDestino), 
                  Number(this.reservasService.data.personas)).subscribe(
      res => {
        console.log(res.result, res.elementos)
        this.reservasService.reservasVuelosVuelta = res.elementos; // selecciono los elementos
      },
      err => console.error(err)
    )
  }



  

}

