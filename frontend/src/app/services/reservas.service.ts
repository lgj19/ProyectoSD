import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coche } from '../models/coche';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  data = {
    destino: '',
    personas: '',
    fechaOrigen: new Date(),
    fechaDestino:new Date(),
    tipoViaje: '',
    tipoReserva: [false, false, false],
  };

  reservasCoches: Coche[] = [];
  
  constructor(
    private http: HttpClient
  ) { }

  

}
