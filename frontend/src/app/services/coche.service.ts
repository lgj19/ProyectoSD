import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coche } from '../models/coche';

@Injectable({
  providedIn: 'root'
})
export class CocheService {

  URL_API_AGENCIA_COCHE = 'https://localhost:3000/api/agencia/coches';

  cocheSelected: Coche = { marca: '', modelo:'', asientos:0, precio:0, localidad:'', estado: 'DISPONIBLE' };

  coches: Coche[] = [];

  constructor(private http: HttpClient) { }
  
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

  cambiarEstado(cocheId: string, estado: string){
    this.getCoche(cocheId).subscribe(
       res => {
         res.elemento.estado = estado;
         this.putCoche(res.elemento).subscribe(
           res => console.log(`modificación del coche a ${estado}.`),
           err => console.log(err)
         )
      });
  }

}