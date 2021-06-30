const { Schema, model } = require('mongoose');

const vuelosSchema = new Schema({
    empresa: {type: String, required: true},
    fecha: {type: String, required: true},
    precio: {type: Number, required: true},
    origen: {type: String, required: true},
    destino: {type: String, required: true},
    asientos: {type: Number, required: true},
    estado: {type: String, required: true}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Vuelos", vuelosSchema);