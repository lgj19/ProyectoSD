const Coche = require('../../../ProveedorCoches/src/models/Coche')
const Hotel = require('../../../ProveedorHoteles/src/models/Hotel')
const Vuelo = require('../../../ProveedorVuelos/src/models/Vuelo')
const { Schema, model } = require('mongoose');

const agenciaSchema = new Schema({
    usuario: {
        nombre: {type: String, required: true},
        apellidos: {type: String, required: true},
        email: {type: String, required: true},
        usuario: {type: String, required: true},
        password: {type: String, required: true},
        reserva_hotel: {type: Hotel.schema, required: false},
        reserva_vuelo: {type: Vuelo.schema, required: false},
        reserva_coche: {type: Coche.schema, required: false}
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Agencia", agenciaSchema);