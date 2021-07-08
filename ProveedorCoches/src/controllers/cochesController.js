
//Inicialización de variables
const cochesCtrl = {};
const { json } = require('express');
//const { rawListeners } = require('../app');
const Coche = require('../models/Coche');


//Controladores de la API


// URL -> /api/

cochesCtrl.saludoInicio = (req, res) =>
    res.send({'Title':'Bienvenido al proveedor de coches.'});


// URL -> /api/coches/

cochesCtrl.getCoches = async (req, res, next) => {
    await Coche.find((err, elementos) => {
        if(err) return next(err);

        res.json({
            result: 'Coches recuperados correctamente.',
            elementos: elementos
        });
    });
}

cochesCtrl.postCoche = async(req,res, next) => {
    const newCoche = new Coche(req.body)

    await newCoche.save((err, cocheNuevo) => {
        if(err) return next(err);

        res.status(201).json({
            result: 'OK',
            elemento: cocheNuevo
        });
    });
}

cochesCtrl.putCoches = async(req, res, next) => {
    await Coche.updateMany({ }, req.body, (err, coches) => {
        if(err) return next(err);

        res.json({
            result: 'Coches modificados correctamente.',
            elementos: coches
        });
    });
}

cochesCtrl.deleteCoches = async(req, res, next) => {
    await Coche.deleteMany((err, coches) => {
        if(err) return next();

        res.json({
            result: 'Coches eliminados correctamente.',
            elementos: coches
        });
    });
}


// URL -> /api/coches/:id

cochesCtrl.getCocheId = async (req,res, next) => {
    await Coche.findById(req.params.id, (err, coche) => {
        if(err) return next(err);

        res.json({
            result: 'Recuperar coche por ID correctamente.',
            elemento: coche
        });
    });
}

cochesCtrl.putCocheId = async (req,res, next) => {
    await Coche.findByIdAndUpdate(req.params.id, req.body, (err, coche) => {
        if(err) return next(err);

        res.json({
            result: 'Modificado coche por ID correctamente.',
            elemento: coche
        });
    });
}

cochesCtrl.deleteCocheId = async (req,res, next) => {
    await Coche.findByIdAndDelete(req.params.id, (err, coche) => {
        if(err) return next(err);

        res.json({
            result: 'Eliminado coche por ID correctamente.',
            elemento: coche
        });
    });
}

cochesCtrl.putFechasReservadas = async (req,res, next) => {
    const fechas = req.body.fechas

    Coche.findByIdAndUpdate(req.params.id, {$push: { fechasReservadas: fechas}},
        (err, coche) => {
        if(err) return next(err);

        res.json({
            result: 'fechasReservadas introducidas correctamente.',
            elemento: coche
        });
    });
}

// /coches/localidad/:localidad/asientos/:asientos

cochesCtrl.getCochesByLocAsi = async(req, res) => {
    await Coche.find({ "localidad": req.params.localidad, "asientos": { $gte: req.params.asientos }},
     (err, coches) => {
        if(err) return next(err);

        res.json({
            result: 'Búsqueda de coches por "localidad" y "asientos" , realizada satisfactoriamente.',
            elementos: coches
        });
    });
}

// /coches/fechaIni/:fechaIni/fechaFin/:fechaFin
/**
 * Actualiza las fechas Reservadas de un coche
 * @param {*} req las fechas de inicio y fin; el id.
 * @param {*} res result, elementos
 */
cochesCtrl.UpdateFechasReservadasById = async(req, res) => {
    const fechas = [req.params.fechaIni, req.params.fechaFin];
    const id = req.params.id;

    await Coche.findByIdAndUpdate( id, {$pull: {fechasReservadas: {$in: fechas}}},
     (err, coche) => {
        if(err) return next(err);

        res.json({
            result: 'Eliminación de fechas de reserva para un coche realizada satisfactoriamente.',
            elementos: coche
        });
    });
}

module.exports = cochesCtrl;