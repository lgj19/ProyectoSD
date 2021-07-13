//Inicialización de variables
const cuentasCtrl = {};
const { json } = require('express');
const fetch = require('node-fetch');
const https = require('https');
const config = require('../config')

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });


//Controladores de la API


cuentasCtrl.updateMovimiento = async (req, res, next) => {
    const body = req.body;
    const URL = `${config.HTTPS_BANCO_CUENTAS}/updateMovimiento`;

    fetch(URL, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.headers.authorization
        },
        agent: httpsAgent
    })
    .then( (resp) => {
        if(resp.status == 200 || resp.status == 400 || resp.status == 500)
            return resp.json();
        throw Error(resp.status);
    })
    .then( json => {
        if(json.status == 400 || json.status == 500)
            res.status(json.status).json({
                result: json.result,
                status: json.status
            });
        res.json({
            result: json.result,
            status: json.status
        });
    })
    .catch((error) => {
        res.status(500).json({
            result: "La pasarela de pago está temporalmente deshabilitada.",
            status: 500
        });
    });
}

module.exports = cuentasCtrl;