export interface Usuario{
    
    nombre: string,
    apellidos: string,
    email: string,
    usuario: string,
    password: string,
    roles: [String], 
    _id?: string,
    createdAt?: string,
    updatedAt?: string
}