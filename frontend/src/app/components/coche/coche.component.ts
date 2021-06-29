import { Component, OnInit } from '@angular/core';
import { CocheService } from '../../services/coche.service';
import { NgForm} from '@angular/forms'
import { Coche } from 'src/app/models/coche';

@Component({
  selector: 'app-coche',
  templateUrl: './coche.component.html',
  styleUrls: ['./coche.component.css']
})
export class CocheComponent implements OnInit {

  constructor(public cocheService: CocheService) { }

  ngOnInit(): void {
    this.getCoches();
  }

  resetForm(form: NgForm){
    this.cocheService.cocheSelected._id = '';
    form.reset();
  }

  editCoche(coche: Coche){
    this.cocheService.cocheSelected = coche;
  }

  getCoches() {
    this.cocheService.getCoches().subscribe(
      res => {
        this.cocheService.coches = res.elementos;
      },
      err => console.log(err)
    )
  }

  addCoche(form: NgForm) {
    if(form.value._id){
      this.putCoche(form.value)
    }
    else {
      this.cocheService.createCoche(form.value).subscribe(
        res => {
          this.getCoches();
        },
        err => console.log(err)
      )
    }
  }

  deleteCoche(_id: string) {
    this.cocheService.deleteCoche(_id).subscribe(
      res => {
        this.getCoches();
      },
      err => console.log(err)
    )
  }

  putCoche(coche: Coche) {
    this.cocheService.putCoche(coche).subscribe(
      res => {
      this.getCoches();
    },
      err => console.log(err)
  )
  }

  getCochesByLocByAsi(localidad: string, asientos: number){
    this.cocheService.getCochesByLocByAsi(localidad, asientos).subscribe(
      res => {
        this.cocheService.coches = res.elementos;
      },
      err => console.log(err)
    )
  }

}
