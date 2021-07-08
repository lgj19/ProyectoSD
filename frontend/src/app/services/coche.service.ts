import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coche } from '../models/coche';
import { FechaService } from './fecha.service';

@Injectable({
  providedIn: 'root'
})
export class CocheService {

  URL_API_AGENCIA_COCHE = 'https://localhost:3000/api/agencia/coches';

  cocheSelected: Coche = { marca: '', modelo:'', asientos:0, precio:0, localidad:'', fechasReservadas: [['', '']] };

  coches: Coche[] = [];

  constructor(private http: HttpClient, private fechaService: FechaService) { }
  
  //CRUD basic

  getCoches() {
    return this.http.get<any>(this.URL_API_AGENCIA_COCHE);
  }

  createCoche(coche: Coche){
    return this.http.post(this.URL_API_AGENCIA_COCHE, coche);
  }

  putCoches(coche: Coche) {
    return this.http.put(this.URL_API_AGENCIA_COCHE, coche);
  }

  deleteCoches() {
    return this.http.delete(this.URL_API_AGENCIA_COCHE);
  }

  //CRUD by {ID}

  getCoche(_id: String) {
    return this.http.get<any>(`${this.URL_API_AGENCIA_COCHE}/${_id}`);
  }

  putCoche(coche: Coche) {
    return this.http.put<any>(`${this.URL_API_AGENCIA_COCHE}/${coche._id!}`, coche);
  }

  deleteCoche(_id: string) {
    return this.http.delete(`${this.URL_API_AGENCIA_COCHE}/${_id}`);
  }

  getCochesByLocByAsi(localidad: string, asientos: number){
   return this.http.get<any>(`${this.URL_API_AGENCIA_COCHE}/localidad/${localidad}/asientos/${asientos}`);
  }

  putFechasReserva(_id: string, fechas: [string, string]){
    return this.http.put<any>(`${this.URL_API_AGENCIA_COCHE}/${_id}/fechasReservadas`, {fechas: fechas});
  }

  updateFechasReservadasById(_id: string, fechas: [string, string]){
    return this.http.put<any>(`${this.URL_API_AGENCIA_COCHE}/${_id}/fechaIni/${fechas[0]}/fechaFin/${fechas[1]}`, {})
  }


  EliminarCochesConFechasReservadas(coches: Coche[], inicio: string, fin: string){
    for(let i=0; i<coches.length; i++)
      coches[i].fechasReservadas.forEach(fecha => {
        if(this.fechaService.between(fecha, inicio, fin))
          coches.splice(i, 1);
      });      
  }
}