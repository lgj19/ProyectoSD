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
  pedido: Pedido = {idUsuario: '', idCoche: '', idHotel: '', idVuelo: '', estado: 'RESERVADO'};
  constructor(
    public reservasService: ReservasService,
    private cocheService: CocheService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  addForm(form: NgForm){
    //validarFormulario
    
    //crear el pedido y modificar estado de los productos
    if(this.idCocheSelect != ''){
      this.pedido.idCoche = this.idCocheSelect;
      //console.log('coche ID:' + this.idCocheSelect)
      this.cocheService.cambiarAReservado(this.idCocheSelect);
    }
    this.reservasService.createReserva(this.pedido).subscribe(
      res => console.log('Reserva efectuada.'),
      err => console.log(err)
    )
    
    this.router.navigate(['/pago']);

  }

}
