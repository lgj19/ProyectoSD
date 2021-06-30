import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservasService } from 'src/app/services/reservas.service';
import { Pedido } from 'src/app/models/pedido';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CocheService } from 'src/app/services/coche.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  idCocheSelect = '';
  pedido: Pedido = {idUsuario: '', idCoche: '', idHotel: '', idVuelo: '', estado: 'RESERVADO', dias: 0};
  strTipoReserva: string[] = [];

  constructor(
    public reservasService: ReservasService,
    private cocheService: CocheService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.reservasService.data.tipoReserva[0])
      this.strTipoReserva.push('Coche');
    if(this.reservasService.data.tipoReserva[1])
      this.strTipoReserva.push('Vuelo');
    if(this.reservasService.data.tipoReserva[2])
      this.strTipoReserva.push('Hotel')
   }

  addForm(form: NgForm){
    //validarFormulario
    
    //crear el pedido y modificar estado de los productos
    if(this.idCocheSelect != ''){
      this.pedido.idCoche = this.idCocheSelect;
      this.cocheService.cambiarAReservado(this.idCocheSelect);
    }

    this.reservasService.putReserva(this.pedido).subscribe( 
      res => console.log('Reserva modificada.'),
      err => console.log(err)
    )
    
    this.router.navigate(['/pago']);

  }

}
