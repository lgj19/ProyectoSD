const { Schema, model } = require('mongoose');

const pedidosSchema = new Schema({
    fechaInicio: {type: String, required: true},
    fechaFin: {type: String, required: true},
    dias: {type: Number},
    idCoche: {type: String},
    idVueloIda: {type: String},
    idVueloVuelta: {type: String},
    idHotel: {type: String},
    idUsuario: {type: String, unique: true},
    estado:{type:String, required: true} //RESERVADO, COMPRADO.
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Pedidos", pedidosSchema);