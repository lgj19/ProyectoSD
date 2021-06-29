const { Schema, model } = require('mongoose');

const pedidosSchema = new Schema({
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