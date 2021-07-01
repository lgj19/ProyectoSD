import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_API_AGENCIA_USUARIO = 'https://localhost:3000/api/agencia/usuario';

  usuarioSelected: Usuario = { nombre: '', apellidos:'', email:'', usuario:'', password:'', roles: [''] };

  usuarios: Usuario[] = [];

  constructor(private http: HttpClient) { 
  }

  getAdminRole(){
    return this.http.get<any>(this.URL_API_AGENCIA_USUARIO + '/adminRole')
  }

  //CRUD basic

  getUsuarios() {
    return this.http.get<any>(this.URL_API_AGENCIA_USUARIO);
  }

  createUsuario(usuario: Usuario){
    return this.http.post(this.URL_API_AGENCIA_USUARIO, usuario);
  }

  putUsuarios(usuario: Usuario) {
    return this.http.put(this.URL_API_AGENCIA_USUARIO, usuario);
  }

  deleteUsuarios() {
    return this.http.delete(this.URL_API_AGENCIA_USUARIO);
  }

  //CRUD by {ID}

  getUsuario(_id: String) {
    return this.http.get<any>(`${this.URL_API_AGENCIA_USUARIO}/${_id}`);
  }

  putUsuario(usuario: Usuario) {
    return this.http.put(`${this.URL_API_AGENCIA_USUARIO}/${usuario._id!}`, usuario);
  }

  deleteUsuario(_id: string) {
    return this.http.delete(`${this.URL_API_AGENCIA_USUARIO}/${_id}`);
  }

}