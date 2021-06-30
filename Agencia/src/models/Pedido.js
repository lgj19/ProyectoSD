const { Schema, model } = require('mongoose');

const pedidosSchema = new Schema({
    dias: {type: Number},
    idCoche: {type: String},
    idVueloIda: {type: String},
    idVueloVuelta: {type: String},
    idHotel: {type: String},
    idUsuario: {type: String, required: true},
    estado:{type:String, required: true} //RESERVADO, COMPRADO.
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Pedido", pedidosSchema);