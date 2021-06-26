const config = require('../config')
const Usuario = require('../models/Usuario')

const authJwt = {}

authJwt.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["access-token"];

        if(!token) return res.status(403).json({message: "No token provided."});

        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        const usuario = await Usuario.findById(req.userId, { password: 0});
        if(!usuario) return res.status(404).json({message: "no user found"});

        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized.'})
    }
}

authJwt.isAdmin = async (req, res, next) => {
    const user = await Usuario.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles }});

    for(let i=0; i< roles.length; i++){
        if(roles[i].name === "admin"){
            next();
            return;
        }
    }

    return res.status(403).json({message: "Acceso denegado. Requiere el rol de Admin."});
}


module.exports = authJwt;