import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_API_AGENCIA = 'http://localhost:3000/api/agencia';
  URL_API_AGENCIA_USUARIO = 'http://localhost:3000/api/agencia/usuario';

  usuarioSelected: Usuario = { nombre: '', apellidos:'', email:'', usuario:'', password:'' };

  usuarios: Usuario[] = [];

  constructor(private http: HttpClient) {
   }

  getUsuarios() {
    return this.http.get<Usuario[]>(this.URL_API_AGENCIA_USUARIO);
  }

  createUsuario(usuario: Usuario){
    return this.http.post(this.URL_API_AGENCIA_USUARIO, usuario);
  }

  deleteUsuario(_id: string) {
    return this.http.delete(`${this.URL_API_AGENCIA_USUARIO}/${_id}`);
  }

  putUsuario(usuario: Usuario) {
    return this.http.put(`${this.URL_API_AGENCIA_USUARIO}/${usuario._id!}`, usuario);
  }
}
