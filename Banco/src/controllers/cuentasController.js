
//Inicialización de variables
const cuentasCtrl = {};
const { json } = require('express');
//const { rawListeners } = require('../app');
const Cuentas = require('../models/Cuentas');

cuentasCtrl.getCuenta = async (req, res, next) => {
    await Cuentas.find({
        nombre: req.params.nombre,
        numTarjeta: req.params.numTarjeta,
        numSecretoTarjeta: req.params.numSecretoTarjeta
        }, 
        (err) => {
            if(err) 
                res.status(400).json({status: "ERROR al introducir los datos bancarios.", error: err}); 
            res.json({status: 'OK. Tarjeta válida.'});
    });
}

cuentasCtrl.getTieneSaldo = async (req, res, next) => {
    await Cuentas.find({
        nombre: req.params.nombre,
        numTarjeta: req.params.numTarjeta,
        numSecretoTarjeta: req.params.numSecretoTarjeta,
        saldo: { $gte: req.params.coste }
        }, 
        (err) => {
            if(err) 
                res.status(400).json({status: "ERROR. No tiene dinero suficiente en el banco.", error: err}); 
            res.json({status: 'OK. Tarjeta válida.'});
    });
}

cuentasCtrl.updateMovimiento = async (req, res, next) => {
    await Cuentas.findOneAndUpdate(
        {
            nombre: body.nombre,
            numTarjeta: body.numTarjeta,
            numSecretoTarjeta: body.numSecretoTarjeta
        }, 
        {
            $set:{
                $inc: { saldo: body.coste }, //datos.coste debe ser un valor negativo para restar.
                $push: { moviemientos: [body.coste, saldo] }
            }                
        },
        (err) => {
            if(err) 
                res.status(500).json({status: "ERROR. No tiene dinero suficiente en el banco.", error: err}); 
            res.json({status: 'OK. Movimiento válido en la cuenta.'});
    });
}

module.exports = cuentasCtrl;