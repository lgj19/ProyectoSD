const { Schema, model } = require('mongoose');

const hotelesSchema = new Schema({
    nombre: {type: String, required: true},
    precio_noche: {type: Number, required: true},
    localidad: {type: String, required: true},
    disponible: {type: Boolean, required: true}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Hotel", hotelesSchema);