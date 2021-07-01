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

    const userUsuFound = await Usuario.findOne({ usuario: usuario });
    const userEmailFound = await Usuario.findOne({email: email});

    if(userUsuFound != null) return res.status(400).json({message:"ERROR: Este nombre de usuario ya existe. Por favor, cámbielo.", type:"Usuario"});
    if(userEmailFound != null) return res.status(400).json({message:"ERROR: Este email ya existe. Por favor, cámbielo.", type:"Email"});

    if(nombre == null) return res.status(400).json({message:"Error: Es necesario introducir un nombre", type:"Nombre"})
    if(apellidos == null) return res.status(400).json({message:"Error: Es necesario introducir apellidos", type:"Apellidos"})
    if(password == null) return res.status(400).json({message:"Error: Es necesario introducir un password", type:"Password"})

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

    res.json({message: `OK. SignUp correcto. Token del usuario: ${token}`})
}
authCtrl.signIn = async(req, res, next) => {
    const userFound = await Usuario.findOne({usuario: req.body.usuario})
        .populate("roles");
    if(!userFound) return res.status(401).json({message:"ERROR: User not found.", type:"Usuario"});

    //Comprobamos la contraseña
    const matchPassword = await Usuario.comparePassword(req.body.password, userFound.password);

    if(!matchPassword) return res.status(401).json({message: "ERROR: Invalid password", type:"Password"});

    //Creamos el token
    const token = jwt.sign({id: userFound._id}, config.SECRET, { 
        expiresIn: 86400
    });

    res.status(200).json({message: `OK. SignIn correcto. Token del usuario: ${token} `, token: token})
}

module.exports = authCtrl;