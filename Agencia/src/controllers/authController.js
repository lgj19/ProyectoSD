//Inicialización de variables
const authCtrl = {};
//const { rawListeners } = require('../app');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken')
const config = require('../config')
const Role = require('../models/Role')

//Login & signup

authCtrl.signUp = async(req, res, next) => {
    const {nombre, apellidos, email, usuario, password, roles} = req.body;

    const nuevoUsuario = new Usuario({
        nombre, apellidos, email, usuario, roles,
        password: await Usuario.encryptPassword(password) //Encriptamos
        
    })

    if(roles){ //Si no es admin, se le asigna el de usuario.
        const foundRoles = await Role.find({name: {$in: roles}})
        nuevoUsuario.roles = foundRoles.map(role => role._id)
    }else{
        const foundRoles = await Role.find({name: "user"});
        nuevoUsuario.roles = foundRoles.map(role => role._id);
    }
    
    const usuarioGuardado = await nuevoUsuario.save()
    const token = jwt.sign({id: usuarioGuardado._id}, config.SECRET, { //Creamos el token
        expiresIn: 86400
    })

    res.json(token)
}
authCtrl.signIn = async(req, res, next) => {
    const userFound = await Usuario.findOne({usuario: req.body.usuario})
        .populate("roles");
    if(!userFound) return res.status(400).json({message:"User not found."});

    //Comprobamos la contraseña
    const matchPassword = await Usuario.comparePassword(req.body.password, userFound.password);

    if(!matchPassword) return res.satatus(401).json({token: null, message: "Invalid password"});

    //Creamos el token
    const token = jwt.sign({id: userFound._id}, config.SECRET, { 
        expiresIn: 86400
    });

    res.json({token})
}

module.exports = authCtrl;