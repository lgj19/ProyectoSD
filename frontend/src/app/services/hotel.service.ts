import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../models/hotel';
import { FechaService } from './fecha.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  URL_API_AGENCIA_HOTEL = 'https://localhost:3000/api/agencia/hoteles';

  hotelSelected: Hotel = { nombre: '', localidad:'', personas:'', precio:'', dormitorios:'', m2:'', fechasReservadas: [['', '']] };

  hoteles: Hotel[] = [];

  constructor(private http: HttpClient, private fechaService: FechaService) { }


  getHoteles() {
    return this.http.get<any>(this.URL_API_AGENCIA_HOTEL);
  }

  createHotel(hotel: Hotel){
    return this.http.post(this.URL_API_AGENCIA_HOTEL, hotel);
  }

  putHoteles(hotel: Hotel) {
    return this.http.put(this.URL_API_AGENCIA_HOTEL, hotel);
  }

  deleteHoteles() {
    return this.http.delete(this.URL_API_AGENCIA_HOTEL);
  }

  //CRUD by {ID}

  getHotel(_id: String) {
    return this.http.get<any>(`${this.URL_API_AGENCIA_HOTEL}/${_id}`);
  }

  putHotel(hotel: Hotel) {
    return this.http.put<any>(`${this.URL_API_AGENCIA_HOTEL}/${hotel._id!}`, hotel);
  }

  deleteHotel(_id: string) {
    return this.http.delete(`${this.URL_API_AGENCIA_HOTEL}/${_id}`);
  }

  getHotelesByLocByPer(localidad: string, personas: number){
    return this.http.get<any>(`${this.URL_API_AGENCIA_HOTEL}/localidad/${localidad}/personas/${personas}`);
  }

  putFechasReserva(_id: string, fechas: [string, string]){
    return this.http.put<any>(`${this.URL_API_AGENCIA_HOTEL}/${_id}/fechasReservadas`, {fechas: fechas});
  }

  updateFechasReservadasById(_id: string, fechas: [string, string]){
    return this.http.put<any>(`${this.URL_API_AGENCIA_HOTEL}/${_id}/fechaIni/${fechas[0]}/fechaFin/${fechas[1]}`, {})
  }

  EliminarHotelesConFechasReservadas(hoteles: Hotel[], inicio: string, fin: string){
    for(let i=0; i<hoteles.length; i++){
      var found = false;
      hoteles[i].fechasReservadas.forEach(fecha => {
          if(this.fechaService.between(fecha, inicio, fin)){
            found = true;
          }
      });
      if(found) hoteles.splice(i, 1);
    }      
  }
}
