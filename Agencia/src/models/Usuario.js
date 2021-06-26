const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs') 

const usuarioSchema = new Schema({
        nombre: {type: String, required: true},
        apellidos: {type: String, required: true},
        email: {type: String, unique: true},
        usuario: {type: String, unique: true},
        password: {type: String, required: true},
        roles: [{
            ref: "Role",
            type: Schema.Types.ObjectId
        }]
}, {
    timestamps: true,
    versionKey: false
})

usuarioSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

usuarioSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

module.exports = model("Usuario", usuarioSchema);