
//Inicialización de variables
const cuentasCtrl = {};
const { json } = require('express');
const Cuentas = require('../models/Cuentas');

cuentasCtrl.updateMovimiento = async (req, res, next) => {
    const coste = req.body.coste
    const precio = req.body.coste * -1;

    Cuentas.findOneAndUpdate(
        {
            nombre: req.body.nombre,
            numTarjeta: req.body.numTarjeta,
            numSecretoTarjeta: req.body.numSecretoTarjeta,
            saldo: { $gte: coste }
        }, 
        { $inc: { saldo: precio } },
        (err, cuenta) => {
            if(err){
                return res.status(500).json({result: "ERROR. No se pudo buscar la cuenta.", error: err, status: 500}); 
            }
            else if(cuenta == null || cuenta.length == 0){
                return res.status(400).json({result: "ERROR. No se puede realizar el pago con dicha tarjeta.", status: 400}); 
            }
            return res.status(200).json({result: 'OK. Compra realizada satisfactoriamente.', status: 200});
    });
}

module.exports = cuentasCtrl;