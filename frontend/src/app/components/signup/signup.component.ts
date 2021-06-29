import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
     { }

  ngOnInit(): void {
  }

  signUp(){
    this.authService.signUp(this.user)
     .subscribe(
       res => {
         console.log(res);
         localStorage.setItem('token', res.token);
         this.router.navigate(['/formulario']);
       },
       err => console.log(err)
     )
  }
}


