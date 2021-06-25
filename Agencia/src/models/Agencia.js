const { Schema, model } = require('mongoose');
const { Usuario } = require('./Usuario')

const agenciaSchema = new Schema({
    usuarios: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }]
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Agencia", agenciaSchema);