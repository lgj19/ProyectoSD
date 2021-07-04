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
    return end.isSameOrBefore(start)
  }

  between(fechas: [string, string], inicio: string, fin: string){
    const start = moment(inicio);
    const end = moment(fin);
    const dates = [moment(fechas[0]), moment(fechas[1])];

    if(dates[0].isBetween(start, end) || dates[1].isBetween(start, end))
      return true; 
    return false;

  }

}

