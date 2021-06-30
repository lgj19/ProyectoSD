import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms'
import { HotelService } from 'src/app/services/hotel.service';
import { Hotel } from 'src/app/models/hotel';


@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  constructor(public hotelService: HotelService) { }

  ngOnInit(): void {
    this.getHoteles()
  }

  resetForm(form: NgForm){
    this.hotelService.hotelSelected._id = '';
    form.reset();
  }

  editHotel(hotel: Hotel){
    this.hotelService.hotelSelected = hotel;
  }

  getHoteles() {
    this.hotelService.getHoteles().subscribe(
      res => {
        this.hotelService.hoteles = res.elementos;
      },
      err => console.log(err)
    )
  }

  addHotel(form: NgForm) {
    if(form.value._id){
      this.putHotel(form.value)
    }
    else {
      this.hotelService.createHotel(form.value).subscribe(
        res => {
          this.getHoteles();
        },
        err => console.log(err)
      )
    }
  }

  deleteHotel(_id: string) {
    this.hotelService.deleteHotel(_id).subscribe(
      res => {
        this.getHoteles();
      },
      err => console.log(err)
    )
  }

  putHotel(hotel: Hotel) {
    this.hotelService.putHotel(hotel).subscribe(
      res => {
      this.getHoteles();
    },
      err => console.log(err)
  )
  }

  getHotelesByLocByAsi(localidad: string, personas: number){
    this.hotelService.getHotelesByLocByPer(localidad, personas).subscribe(
      res => {
        this.hotelService.hoteles = res.elementos;
      },
      err => console.log(err)
    )
  }

}
