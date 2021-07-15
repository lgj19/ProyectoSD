import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private URL = 'https://192.168.31.244:3000/api/agencia/auth'

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  signUp(user: any) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signIn(user: any) {
    return this.http.post<any>(this.URL + '/signin', user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  isAdmin(){
    return this.http.get<boolean>(this.URL + '/isAdmin')
  }
}
