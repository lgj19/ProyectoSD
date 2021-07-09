import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coche } from '../models/coche';
import { Pedido } from '../models/pedido';
import { Hotel } from '../models/hotel';
import { Vuelo } from '../models/vuelo';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  URL_PEDIDOS = 'https://localhost:3000/api/agencia/pedidos';

  data = { //Datos que se rellenan del formulario
    origen: '',
    destino: '',
    personas: '',
    fechaOrigen: new Date(),
    fechaDestino:new Date(),
    dias:0,
    tipoViaje: '', //Ida y vuelta, ida, vuelta
    tipoReserva: [false, false, false], //[coche, vuelo, hotel]
  };

  pedido: Pedido = {idUsuario: '', idCoche: '', idHotel: '', idVueloIda: '', idVueloVuelta: '', estado: 'RESERVADO', dias: 0, fechaInicio:'', fechaFin:''};
  reservasCoches: Coche[] = []; //todos los coches recuperados tras el formulario de filtrado.
  reservasHoteles: Hotel[] = [];
  reservasVuelosIda: Vuelo[] = [];
  reservasVuelosVuelta: Vuelo[] = [];
  constructor(
    private http: HttpClient
  ) { }

  getPedidoUsuario(){
    return this.http.get<any>(`${this.URL_PEDIDOS}/usuario`)
  }

  createReserva(pedido: Pedido){
    return this.http.post<any>(this.URL_PEDIDOS, pedido);
  }
  
  putReserva(pedido: Pedido){
    return this.http.put<any>(`${this.URL_PEDIDOS}/usuario`, pedido)
  }

  deletePedidoUsuario(){
    return this.http.delete<any>(`${this.URL_PEDIDOS}/usuario`)
  }
  cambiarEstado(idPedido: String, estado: String){
    const body = {estado};
    return this.http.put<any>(`${this.URL_PEDIDOS}/${idPedido}/cambiarEstado`, body)
  }
}
