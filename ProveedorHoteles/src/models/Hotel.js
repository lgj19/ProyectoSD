const { Schema, model } = require('mongoose');

const hotelesSchema = new Schema({
    nombre: {type: String, required: true},
    localidad: {type: String, required: true},
    precio: {type: Number, required: true}, 
    personas:{type: Number, required: true},
    dormitorios:{type: Number, required: true},
    m2: {type: Number, required: true},
    fechasReservadas: [[{type: String}, {type: String}]]
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Hoteles", hotelesSchema);