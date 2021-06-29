import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm} from '@angular/forms'
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  resetForm(form: NgForm){
    this.usuarioService.usuarioSelected._id = '';
    form.reset();
  }

  editUsuario(usuario: Usuario){
    this.usuarioService.usuarioSelected = usuario;
  }

  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      res => {
        this.usuarioService.usuarios = res.elementos;
      },
      err => console.log(err)
    )
  }

  addUsuario(form: NgForm) {
    if(form.value._id){
      this.putUsuario(form.value)
    }
    else {
      this.usuarioService.createUsuario(form.value).subscribe(
        res => {
          this.getUsuarios();
        },
        err => console.log(err)
      )
    }
  }

  deleteUsuario(_id: string) {
    this.usuarioService.deleteUsuario(_id).subscribe(
      res => {
        this.getUsuarios();
      },
      err => console.log(err)
    )
  }

  putUsuario(usuario: Usuario) {
    this.usuarioService.putUsuario(usuario).subscribe(
      res => {
      this.getUsuarios();
    },
      err => console.log(err)
  )
  }

}
