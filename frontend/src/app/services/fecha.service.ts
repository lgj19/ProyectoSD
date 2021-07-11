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

  /**
   * Compara si dadas unas fechas reservadas, las fechas de inicio o fin se
   * encuentran entre las reservadas
   * @param fechas las fechas reservadas
   * @param inicio la fecha de inicio
   * @param fin la fecha de fin
   * @returns true si está entre las fechas reservadas. Else false.
   */
  between(fechas: [string, string], inicio: string, fin: string){
    const start = moment(inicio);
    const end = moment(fin);
    const dates = [moment(fechas[0]), moment(fechas[1])];
    console.log(`Inicio: ${start}, Fin: ${end}, Fechas: ${dates[0]} | ${dates[1]}`)
    console.log(start.isBetween(dates[0],dates[1], undefined, "[]"));
    console.log(end.isBetween(dates[0], dates[1], undefined, "[]"))
    if(start.isBetween(dates[0],dates[1], undefined, "[]") || end.isBetween(dates[0], dates[1], undefined, "[]"))
      return true; 
    return false;

  }

}

