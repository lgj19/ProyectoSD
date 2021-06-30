const { Schema, model } = require('mongoose');

const pedidosSchema = new Schema({
    dias: {type: Number, required: true},
    idCoche: {type: String},
    idVuelo: {type: String},
    idHotel: {type: String},
    idUsuario: {type: String, required: true},
    estado:{type:String, required: true} //RESERVADO, COMPRADO.
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Pedido", pedidosSchema);