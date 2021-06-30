const config = require('../config')
const jwt = require('jsonwebtoken')

const authJwt = {}

authJwt.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if(!token) return res.status(403).json({message: "No token provided."});

        jwt.verify(token, config.SECRET, { //Creamos el token
            expiresIn: 86400});

        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized.'})
    }
}

module.exports = authJwt;