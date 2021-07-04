export interface Coche{
    
    marca: string,
    modelo: string,
    asientos: number,
    precio: number,
    localidad: string,
    fechasReservadas: [[string,string]] 
    _id?: string,
    createdAt?: string,
    updatedAt?: string
}