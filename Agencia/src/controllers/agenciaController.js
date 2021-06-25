
//Inicialización de variables
const agenciaCtrl = {};
const Agencia = require('../models/Agencia');

//Controladores de la API


// URL -> /api/agencia/

agenciaCtrl.saludoInicio = (req, res) =>
    res.json({
        Title:'Bienvenido a la agencia de viajes.'
    });


module.exports = agenciaCtrl;