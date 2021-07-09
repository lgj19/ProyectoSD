import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  URL_API_BANCO = 'https://localhost:3000/api/agencia/cuentas';

  constructor(private http: HttpClient) { }

  actualizarMovimiento(numTarjeta: String, numSecretoTarjeta: String, nombre: String, coste: Number){
    const body = { numTarjeta, numSecretoTarjeta, nombre, coste };
    
    return this.http.put<any>(`${this.URL_API_BANCO}/updateMovimiento`, body);
  }
}
