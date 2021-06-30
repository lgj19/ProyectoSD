import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  constructor() { }

  calcularDias(inicio: Date, fin: Date): number{
    const start = moment(inicio);
    const end = moment(fin);
    return end.diff(start, "days");
  }

}

