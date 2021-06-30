import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms'
import { Vuelo } from 'src/app/models/vuelo';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-vuelo',
  templateUrl: './vuelo.component.html',
  styleUrls: ['./vuelo.component.css']
})
export class VueloComponent implements OnInit {

  constructor(public vueloService: VueloService) { }

  ngOnInit(): void {
    this.getvuelos()
  }

  resetForm(form: NgForm){
    this.vueloService.vueloIdaSelected._id = '';
    this.vueloService.vueloVueltaSelected._id = '';
    form.reset();
  }

  editVuelos(vueloIda: Vuelo, vueloVuelta: Vuelo){
    this.vueloService.vueloIdaSelected = vueloIda;
    this.vueloService.vueloVueltaSelected = vueloVuelta;
  }

  editVuelo(vuelo: Vuelo){
    this.vueloService.vueloSelected = vuelo;
  }

  getvuelos() {
    this.vueloService.getVuelos().subscribe(
      res => {
        this.vueloService.vuelos = res.elementos;
      },
      err => console.log(err)
    )
  }

  addVuelo(form: NgForm) {
    if(form.value._id){
      this.putVuelo(form.value)
    }
    else {
      this.vueloService.createVuelo(form.value).subscribe(
        res => {
          this.getvuelos();
        },
        err => console.log(err)
      )
    }
  }

  deleteVuelo(_id: string) {
    this.vueloService.deleteVuelo(_id).subscribe(
      res => {
        this.getvuelos();
      },
      err => console.log(err)
    )
  }

  putVuelo(vuelo: Vuelo) {
    this.vueloService.putVuelo(vuelo).subscribe(
      res => {
      this.getvuelos();
    },
      err => console.log(err)
  )
  }

  getvuelosByOriByDestByAsiByFec(origen: string, destino: string, fecha:string, asientos: number){
    this.vueloService.getVuelosByOriByDestByAsiByFec(origen, destino, fecha, asientos).subscribe(
      res => {
        this.vueloService.vuelos = res.elementos;
      },
      err => console.log(err)
    )
  }

}
