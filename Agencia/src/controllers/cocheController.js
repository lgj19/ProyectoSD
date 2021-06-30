//Inicialización de variables
const cochesCtrl = {};
const { json } = require('express');
//const { rawListeners } = require('../app');
const Coche = require('../models/Coche');
const fetch = require('node-fetch');
const https = require('https');

const URL_WS_COCHES = "https://localhost:3001/api/coches";

//Controladores de la API

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

// URL -> /api/agencia/coches/

cochesCtrl.getCoche = async (req, res, next) => {
    const elId = req.params.id;
    const URL = `${URL_WS_COCHES}/${elId}`;
    fetch(URL, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.headers.authorization,
        },
        agent: httpsAgent
     }).then( (resp) => {
        if(resp.status == 200)
            return resp.json();
        throw Error(resp.status);
    })
    .then( json => {
        res.json({
            result: 'Coche del proveedor recuperado por ID.',
            elemento: json.elemento,
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

cochesCtrl.getCoches = async (req, res, next) => {
    const URL = `${URL_WS_COCHES}`;

    fetch(URL, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.headers.authorization
        },
        agent: httpsAgent
     }).then( (resp) => {
        if(resp.status == 200)
            return resp.json();
        throw Error(resp.status);
    })
    .then( json => {
        res.json({
            result: 'Coches del proveedor recuperados.',
            elementos: json.elementos,
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

cochesCtrl.postCoches = async (req, res, next) => {
    const elElemento = req.body;
    const URL = `${URL_WS_COCHES}`;

    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(elElemento),
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.headers.authorization
        },
        agent: httpsAgent
    })
    .then( (resp) => {
        if(resp.status == 201)
            return resp.json();
        throw Error(resp.status);
    })
    .then( json => {
        res.json({
            result: 'Coche nuevo.',
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

cochesCtrl.putCoches = async (req, res, next) => {
    const elId = req.params.id;
    const elElemento = req.body;
    const URL = `${URL_WS_COCHES}/${elId}`;

    fetch(URL, {
        method: 'PUT',
        body: JSON.stringify(elElemento),
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.headers.authorization
        },
        agent: httpsAgent
    })
    .then( (resp) => {
        if(resp.status == 200)
            return resp.json();
        throw Error(resp.status);
    })
    .then( json => {
        res.json({
            result: 'Coche modificado.',
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

cochesCtrl.deleteCoches = async (req, res, next) => {
    const elId = req.params.id;
    const URL = `${URL_WS_COCHES}/${elId}`;

    fetch(URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.headers.authorization
        },
        agent: httpsAgent
    })
    .then( (resp) => {
        if(resp.status == 200)
            return resp.json();
        throw Error(resp.status);
    })
    .then( json => {
        res.json({
            result: 'Coche eliminado.',
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}


cochesCtrl.getCochesByAsiLocEst = async (req, res, next) => {
    const localidad = req.params.localidad;
    const asientos = req.params.asientos;
    const URL = `${URL_WS_COCHES}/localidad/${localidad}/asientos/${asientos}`;

    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': req.headers.authorization
        },
        agent: httpsAgent
    }).then( (resp) => {
        if(resp.status == 200)
            return resp.json();
        throw Error(resp.status);
    })
    .then( json => {
        res.json({
            result: 'Coches DISPONIBLES del proveedor filtrados por: LOCALIDAD y ASIENTOS recuperados correctamente.',
            elementos: json.elementos,
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

module.exports = cochesCtrl;