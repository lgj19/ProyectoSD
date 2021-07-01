import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  myForm: FormGroup;
  usuario: FormControl;
  password: FormControl;

  usuErr: boolean = false;
  passErr: boolean = false;

  user = {
    nombre: '',
    apellidos: '',
    email: '',
    usuario: '',
    password: ''
    
  }

  constructor(
    private authService: AuthService,
    private router: Router) 
  {
    this.usuario = new FormControl('',[Validators.required, Validators.min(1)]);
    this.password = new FormControl('',[Validators.required, Validators.min(1)]);
    
    this.myForm = new FormGroup({
      'usuario': this.usuario,
      'password': this.password
    });

  }


  ngOnInit(): void {
  }

  signIn(){
    if(!this.comprobarValidacion()) return;
    this.rellenarDatosUsuario();

    this.authService.signIn(this.user)
      .subscribe(
        res => {
          console.log(res.message)
          localStorage.setItem('token', res.token);
          this.router.navigate(['/formulario']);
        },
        err => {
          console.error(err.error.message)
          if(err.error.type == "Usuario"){ this.usuErr = true; this.passErr = true} 
          if(err.error.type == "Password") { this.usuErr = false; this.passErr = true; }
        }
          
      )
  }

  comprobarValidacion(): boolean{
    var ret = true;
    if(this.usuario.invalid){
      this.usuario.markAsTouched();
      ret = false;
    }  
    if(this.password.invalid){
      this.password.markAsTouched();
      ret = false;
    }

    return ret;
      
  }

  rellenarDatosUsuario(){
    this.user.usuario = this.usuario.value;
    this.user.password = this.password.value;
  }


}
