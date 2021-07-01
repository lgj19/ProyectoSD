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

  errorFechas(inicio: Date, fin: Date): boolean{
    const start = moment(inicio);
    const end = moment(fin);

    const result = Number(end) - Number(start);

    return (result <= 0)
  }

}

