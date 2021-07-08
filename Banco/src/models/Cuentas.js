const { Schema, model } = require('mongoose');

const cuentasSchema = new Schema({
    nombre: {type: String, required: true},
    DNI: {type: String, required: true},
    numTarjeta: {type: Number, unique: true},
    numSecretoTarjeta: {type: Number, required: true},
    saldo: {type: Number, required: true},
    movimientos: [[{type: Number},{type: Number}]] //Saldos: [ Saldo: [relativo, absoluto]]. Ex: [[+800, 800], [-300, 500]]
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Cuentas", cuentasSchema);