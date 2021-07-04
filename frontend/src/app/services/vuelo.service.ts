import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vuelo } from '../models/vuelo';

@Injectable({
  providedIn: 'root'
})
export class VueloService {

  URL_API_AGENCIA_VUELO = 'https://localhost:3000/api/agencia/vuelos';

  vueloSelected: Vuelo = { empresa: '', origen:'', destino:'', precio:'', fecha:'', asientos:'', estado: 'DISPONIBLE' };
  vueloIdaSelected: Vuelo = { empresa: '', origen:'', destino:'', precio:'', fecha:'', asientos:'', estado: 'DISPONIBLE' };
  vueloVueltaSelected: Vuelo = { empresa: '', origen:'', destino:'', precio:'', fecha:'', asientos:'', estado: 'DISPONIBLE' };

  vuelos: Vuelo[] = [];

  constructor(private http: HttpClient) { }


  getVuelos() {
    return this.http.get<any>(this.URL_API_AGENCIA_VUELO);
  }

  createVuelo(vuelo: Vuelo){
    return this.http.post(this.URL_API_AGENCIA_VUELO, vuelo);
  }

  putVuelos(vuelo: Vuelo) {
    return this.http.put(this.URL_API_AGENCIA_VUELO, vuelo);
  }

  deleteVuelos() {
    return this.http.delete(this.URL_API_AGENCIA_VUELO);
  }

  //CRUD by {ID}

  getVuelo(_id: String) {
    return this.http.get<any>(`${this.URL_API_AGENCIA_VUELO}/${_id}`);
  }

  putVuelo(vuelo: Vuelo) {
    return this.http.put<any>(`${this.URL_API_AGENCIA_VUELO}/${vuelo._id!}`, vuelo);
  }

  deleteVuelo(_id: string) {
    return this.http.delete(`${this.URL_API_AGENCIA_VUELO}/${_id}`);
  }

  getVuelosByOriByDestByAsiByFec(origen: string, destino: string, fecha:string, asientos: number){
    return this.http.get<any>(`${this.URL_API_AGENCIA_VUELO}/origen/${origen}/destino/${destino}/asientos/${asientos}/fecha/${fecha}`);
  }


  cambiarEstado(vueloId: string, estado: string){
    return this.http.put<any>(`${this.URL_API_AGENCIA_VUELO}/${vueloId}/cambiarEstado`, {estado})
  }
}
