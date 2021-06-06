const { Schema, model } = require('mongoose');

const vuelosSchema = new Schema({
    empresa: {type: String, required: true},
    fecha: {type: String, required: true},
    precio: {type: Number, required: true},
    origen: {type: String, required: true},
    destino: {type: String, required: true},
    disponible: {type: Boolean, required: true}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Vuelo", vuelosSchema);