import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;
  nombre: FormControl;
  apellidos: FormControl;
  email: FormControl;
  usuario: FormControl;
  password: FormControl;


  errUsuExist: boolean = false;
  errEmailExist: boolean = false;

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
    this.nombre = new FormControl('',[Validators.required, Validators.min(1)]);
    this.apellidos = new FormControl('',[Validators.required, Validators.min(1)]);
    this.email = new FormControl('',[Validators.required, Validators.min(1)]);
    this.usuario = new FormControl('',[Validators.required, Validators.min(1)]);
    this.password = new FormControl('',[Validators.required, Validators.min(1)]);
    
    this.myForm = new FormGroup({
      'nombre': this.nombre,
      'apellidos': this.apellidos,
      'email': this.email,
      'usuario': this.usuario,
      'password': this.password
    });
  }

  ngOnInit(): void {
  }

  signUp(){

    if(!this.validarDatos())
      return;

    this.rellenarDatosUsuario();

    this.authService.signUp(this.user)
     .subscribe(
       res => {
         console.log(res.message);
         localStorage.setItem('token', res.token);
         this.router.navigate(['/formulario']);
       },
       err => {
        console.error(err.error.message);
        this.mostrarError(err.error);
       }
     )
  }

  mostrarError(e: any){
    if(e.type == "Usuario")
      this.errUsuExist = true;
    else
      this.errUsuExist = false;

    if(e.type == "Email")
      this.errEmailExist = true;
    else
      this.errEmailExist = false;

  }

  validarDatos(): boolean {
    var ret = true;
    if(this.nombre.invalid){
      this.nombre.markAsTouched();
      ret = false;
    }  
    if(this.apellidos.invalid){
      this.apellidos.markAsTouched();
      ret = false;
    }
    if(this.email.invalid){
      this.email.markAsTouched();
      ret = false;
    }
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
    this.user.nombre = this.nombre.value;
    this.user.apellidos = this.apellidos.value;
    this.user.email = this.email.value;
    this.user.usuario = this.usuario.value;
    this.user.password = this.password.value;
  }
}


