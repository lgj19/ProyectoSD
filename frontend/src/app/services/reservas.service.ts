import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coche } from '../models/coche';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  URL_PEDIDOS = 'https://localhost:3000/api/agencia/pedidos';

  data = { //Datos que se rellenan del formulario
    destino: '',
    personas: '',
    fechaOrigen: new Date(),
    fechaDestino:new Date(),
    tipoViaje: '', //Ida y vuelta, ida, vuelta
    tipoReserva: [false, false, false], //[coche, vuelo, hotel]
  };

  reservasCoches: Coche[] = []; //todos los coches recuperados tras el formulario de filtrado.
  
  constructor(
    private http: HttpClient
  ) { }

  createReserva(pedido: Pedido){
    return this.http.post<any>(this.URL_PEDIDOS, pedido);
  }

}
