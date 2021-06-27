const { Schema, model } = require('mongoose');

const cochesSchema = new Schema({
    marca: {type: String, required: true},
    modelo: {type: String, required: true},
    asientos: {type: Number, required: true},
    precio: {type: Number, required: true},
    localidad: {type: String, required: true},
    estado: {type: String, required: true}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Coche", cochesSchema);