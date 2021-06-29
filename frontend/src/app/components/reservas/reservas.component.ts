import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservasService } from 'src/app/services/reservas.service';
@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  idCocheSelect = '';

  constructor(
    public reservasService: ReservasService
  ) { }

  ngOnInit(): void { }

  addForm(form: NgForm){
    console.log(this.idCocheSelect)
  }

}
