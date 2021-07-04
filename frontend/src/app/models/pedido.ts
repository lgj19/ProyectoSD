export interface Pedido {
    dias: number,
    fechaInicio: string,
    fechaFin: string,
    idUsuario: String,
    idCoche: string,
    idHotel: string,
    idVueloIda: string,
    idVueloVuelta: string,
    estado: string,
    _id?: string,
    createdAt?: string,
    updatedAt?: string
}