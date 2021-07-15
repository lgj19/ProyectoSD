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

  URL_PEDIDOS = 'https://192.168.31.244:3000/api/agencia/pedidos';
  URL_AGENCIA = 'https://192.168.31.244:3000/api/agencia';
  data = { //Datos que se rellenan del formulario
    origen: '',
    destino: '',
    personas: '',
    fechaOrigen: new Date(),
    fechaDestino: new Date(),
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

  createReservaTransaction(pedido: Pedido, fechasCoche: [String, String], fechasHotel: [String, String]){
    const body = {pedido, fechasCoche, fechasHotel};
    return this.http.put(`${this.URL_AGENCIA}/createReservation`, body);
  }

  createPurchaseTransaction(coste: Number, nombre: String, numTarjeta: String, numSecretoTarjeta: String, idVueloIda: String, idVueloVuelta: String, idPedido: String
    , idCoche: String, idHotel: String){
    const body = {coste, nombre, numTarjeta, numSecretoTarjeta, idVueloIda, idVueloVuelta, idPedido, idCoche, idHotel}
    return this.http.put(`${this.URL_AGENCIA}/createPurchase`, body)
  }

  eliminateReservationTransaction(pedido: Pedido, fechas: [String, String]){
    const body = {pedido: pedido, fechasCoche: fechas, fechasHotel: fechas};
    return this.http.put(`${this.URL_AGENCIA}/eliminateReservation`, body);
  }

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
