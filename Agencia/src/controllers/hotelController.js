//Inicialización de variables
const hotelesCtrl = {};
const { json } = require('express');
//const { rawListeners } = require('../app');
const Hotel = require('../models/Hotel');
const fetch = require('node-fetch');
const https = require('https');

const URL_WS_HOTELES = "https://localhost:3002/api/hoteles";

//Controladores de la API

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

// URL -> /api/agencia/hoteles/

hotelesCtrl.getHotel = async (req, res, next) => {
    const elId = req.params.id;
    const URL = `${URL_WS_HOTELES}/${elId}`;
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
            result: 'Hotel del proveedor recuperado por ID.',
            elemento: json.elemento,
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

hotelesCtrl.getHoteles = async (req, res, next) => {
    const URL = `${URL_WS_HOTELES}`;

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
            result: 'hoteles del proveedor recuperados.',
            elementos: json.elementos,
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

hotelesCtrl.postHotel = async (req, res, next) => {
    const elElemento = req.body;
    const URL = `${URL_WS_HOTELES}`;

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
            result: 'Hotel nuevo.',
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

hotelesCtrl.putHotel = async (req, res, next) => {
    const elId = req.params.id;
    const elElemento = req.body;
    const URL = `${URL_WS_HOTELES}/${elId}`;

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
            result: 'Hotel modificado.',
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

hotelesCtrl.deleteHotel = async (req, res, next) => {
    const elId = req.params.id;
    const URL = `${URL_WS_HOTELES}/${elId}`;

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
            result: 'Hotel eliminado.',
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}


hotelesCtrl.getHotelesByLocPer = async (req, res, next) => {
    const localidad = req.params.localidad;
    const personas = req.params.personas;
    const URL = `${URL_WS_HOTELES}/localidad/${localidad}/personas/${personas}`;

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
            result: 'hoteles DISPONIBLES del proveedor filtrados por: LOCALIDAD y PERSONAS recuperados correctamente.',
            elementos: json.elementos,
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

hotelesCtrl.putFechasReservadas = async (req, res, next) => {
    const elId = req.params.id;
    const fechas = req.body.fechas;
    const URL = `${URL_WS_HOTELES}/${elId}/fechasReservadas/`;

    fetch(URL, {
        method: 'PUT',
        body: JSON.stringify({fechas: fechas}),
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
            result: 'Introducidas nuevas fechas reservadas en la habitación de hotel.',
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

hotelesCtrl.updateFechasReservadasById = async (req, res, next) => {
    const elId = req.params.id;
    const fechaIni = req.params.fechaIni;
    const fechaFin = req.params.fechaFin;
    const URL = `${URL_WS_HOTELES}/${elId}/fechaIni/${fechaIni}/fechaFin/${fechaFin}`;

    fetch(URL, {
        method: 'PUT',
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
            result: json.result,
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

module.exports = hotelesCtrl;