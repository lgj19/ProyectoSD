
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

        console.log(elementos);
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

        console.log(cocheNuevo);
        res.status(201).json({
            result: 'OK',
            elemento: cocheNuevo
        });
    });
}

cochesCtrl.putCoches = async(req, res, next) => {
    await Coche.updateMany({ }, req.body, (err, coches) => {
        if(err) return next(err);

        console.log(coches);
        res.json({
            result: 'OK',
            elementos: coches
        });
    });
}

cochesCtrl.deleteCoches = async(req, res, next) => {
    await Coche.deleteMany((err, coches) => {
        if(err) return next();

        console.log(coches);
        res.json({
            result: 'OK',
            elementos: coches
        });
    });
}


// URL -> /api/coches/:id

cochesCtrl.getCocheId = async (req,res, next) => {
    await Coche.findById(req.params.id, (err, coche) => {
        if(err) return next(err);

        console.log(coche);
        res.json({
            result: 'OK',
            elemento: coche
        });
    });
}

cochesCtrl.putCocheId = async (req,res, next) => {
    await Coche.findByIdAndUpdate(req.params.id, req.body, (err, coche) => {
        if(err) return next(err);

        console.log(coche);
        res.json({
            result: 'OK',
            elemento: coche
        });
    });
}

cochesCtrl.deleteCocheId = async (req,res, next) => {
    await Coche.findByIdAndDelete(req.params.id, (err, coche) => {
        if(err) return next(err);

        console.log(coche);
        res.json({
            result: 'OK',
            elemento: coche
        });
    });
}

// /coches/localidad/:localidad/asientos/:asientos

cochesCtrl.getCochesByLocAsiEst = async(req, res) => {
    await Coche.find({ "localidad": req.params.localidad, "asientos": { $gte: req.params.asientos },
    "estado": "DISPONIBLE" }, (err, coches) => {
        if(err) return next(err);

        console.log(coches);
        res.json({
            result: 'Búsqueda de coches por "localidad", "asientos" y "estado=DISPONIBLE" realizada satisfactoriamente.',
            elementos: coches
        });
    });
}

module.exports = cochesCtrl;