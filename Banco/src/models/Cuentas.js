const { Schema, model } = require('mongoose');

const cuentasSchema = new Schema({
    nombre: {type: String, required: true},
    DNI: {type: String, required: true},
    numTarjeta: {type: String, unique: true},
    numSecretoTarjeta: {type: String, required: true},
    saldo: {type: Number, required: true}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Cuentas", cuentasSchema);