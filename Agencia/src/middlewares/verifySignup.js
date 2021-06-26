const Usuario = require("../models/Usuario");

const verifySignup = {};

const ROLES = ["user", "admin"];

//Verifica si existen los roles (para el registro)
verifySignup.checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for(let i=0; i< req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exists.`
                })
            }
        }
    }

    next();
}

//Verifica que no existe un email o usuario repetido (para el registro )
verifySignup.checkDuplicateUsernameOreEmail = async (req, res, next) => {
    const usuario = await Usuario.findOne({username: req.body.username});

    if(usuario) return res.status(400).json({message: "El usuario ya existe."});

    const email = await Usuario.findOne({email: req.body.email});
    if(email) return res.status(400).json({message: "El email ya existe"});

    next();
}