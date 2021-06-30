import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  URL_API_AGENCIA_HOTEL = 'https://localhost:3000/api/agencia/hoteles';

  hotelSelected: Hotel = { nombre: '', localidad:'', personas:'', precio:'', dormitorios:'', m2:'', estado: 'DISPONIBLE' };

  hoteles: Hotel[] = [];

  constructor(private http: HttpClient) { }


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

  cambiarEstado(hotelId: string, estado: string){
    this.getHotel(hotelId).subscribe(
       res => {
         res.elemento.estado = estado;
         this.putHotel(res.elemento).subscribe(
           res => console.log(`modificación del hotel a ${estado}.`),
           err => console.log(err)
         )
      });
    
  }
}
