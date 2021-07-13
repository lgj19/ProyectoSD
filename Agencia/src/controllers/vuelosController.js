//Inicialización de variables
const vuelosCtrl = {};
const { json } = require('express');
//const { rawListeners } = require('../app');
const fetch = require('node-fetch');
const https = require('https');
const config = require('../config')

//Controladores de la API

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

// URL -> /api/agencia/vuelos/

vuelosCtrl.getVuelo = async (req, res, next) => {
    const elId = req.params.id;
    const URL = `${config.HTTPS_VUELO}/${elId}`;
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
            result: 'Vuelo del proveedor recuperado por ID.',
            elemento: json.elemento,
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

vuelosCtrl.getVuelos = async (req, res, next) => {
    const URL = `${config.HTTPS_VUELO}`;

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
            result: 'Vuelos del proveedor recuperados.',
            elementos: json.elementos,
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

vuelosCtrl.postVuelo = async (req, res, next) => {
    const elElemento = req.body;
    const URL = `${config.HTTPS_VUELO}`;

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
            result: 'Vuelo nuevo.',
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

vuelosCtrl.putVuelo = async (req, res, next) => {
    const elId = req.params.id;
    const elElemento = req.body;
    const URL = `${config.HTTPS_VUELO}/${elId}`;

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
            result: 'Vuelo modificado.',
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

vuelosCtrl.deleteVuelo = async (req, res, next) => {
    const elId = req.params.id;
    const URL = `${config.HTTPS_VUELO}/${elId}`;

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
            result: 'Vuelo eliminado.',
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}


vuelosCtrl.getVuelosByOriPerEst = async (req, res, next) => {
    const origen = req.params.origen;
    const asientos = req.params.asientos;
    const URL = `${config.HTTPS_VUELO}/origen/${origen}/asientos/${asientos}`;

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
            result: 'Vuelos DISPONIBLES del proveedor filtrados por: LOCALIDAD y ASIENTOS recuperados correctamente.',
            elementos: json.elementos,
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

vuelosCtrl.getVuelosByOriByDestByAsiByFecEst = async (req, res, next) => {
    const fecha = req.params.fecha
    const origen = req.params.origen;
    const destino = req.params.destino;
    const asientos = req.params.asientos;
    const URL = `${config.HTTPS_VUELO}/origen/${origen}/destino/${destino}/asientos/${asientos}/fecha/${fecha}`;

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
            result: 'Vuelos DISPONIBLES del proveedor filtrados por: LOCALIDAD y ASIENTOS recuperados correctamente.',
            elementos: json.elementos,
        });
    })
    .catch((error) => {
        next(error.status);
    });
}


vuelosCtrl.cambiarVueloEstado = async (req, res, next) => {
    const elId = req.params.id;
    const URL = `${config.HTTPS_VUELO}/${elId}/cambiarEstado`;

    fetch(URL, {
        method: 'PUT',
        body: JSON.stringify(req.body),
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

module.exports = vuelosCtrl;