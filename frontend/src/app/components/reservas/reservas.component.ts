import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservasService } from 'src/app/services/reservas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  errTransaction: boolean = false;

  fechas: [string, string] = ['','']
  strTipoReserva: string[] = [];

  constructor(
    public reservasService: ReservasService,
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
    this.reservasService.createReservaTransaction(this.reservasService.pedido,
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
