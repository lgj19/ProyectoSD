import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CocheComponent } from '../coche/coche.component';
import { CocheService } from '../../services/coche.service';
import { Coche } from 'src/app/models/coche';
import { ReservasService } from 'src/app/services/reservas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {

  tiposViaje =[{name: "Ida y vuelta", value: "Ida y vuelta"}, {name: "Ida", value: "Ida"}, {name: "Vuelta", value: "Vuelta"}];

  constructor(private cocheService: CocheService,
    public reservasService: ReservasService,
    private router: Router) { }


  ngOnInit(): void {
  }

  
  addForm(form: NgForm){

    if(this.reservasService.data.tipoReserva[0]){ //Coches
      this.cocheService.getCochesByLocByAsi(this.reservasService.data.destino, Number(this.reservasService.data.personas)).subscribe(
        res => {
          this.reservasService.reservasCoches = res.elementos; // selecciono los elementos
        },
        err => console.log(err)
      )
    }
      
    this.router.navigate(['/reservas'])
  }

}