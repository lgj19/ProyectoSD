import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  URL_PEDIDO = 'https://localhost:3000/api/agencia/pedidos'

  constructor(
    private http: HttpClient
  ) { }

  getPedidoUsuario(){
    return this.http.get<any>(`${this.URL_PEDIDO}/usuario`)
  }

  deletePedidoUsuario(){
    return this.http.delete<any>(`${this.URL_PEDIDO}/usuario`)
  }
  
}
