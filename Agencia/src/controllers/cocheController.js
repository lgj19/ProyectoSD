//Inicialización de variables
const cochesCtrl = {};
const { json } = require('express');
//const { rawListeners } = require('../app');
const Coche = require('../models/Coche');
const fetch = require('node-fetch');

const URL_WS_COCHES = "http://localhost:3001/api/";

//Controladores de la API


// URL -> /api/agencia/coches/

cochesCtrl.getCoches = async (req, res, next) => {
    const laColeccion = req.params.colecciones;
    const URL = `${URL_WS_COCHES}/${laColeccion}`;

    fetch(URL).then( (resp) => {
        if(resp.status == 200)
            return resp.json();
        throw Error(resp.status);
    })
    .then( json => {
        res.json({
            result: 'Coches del proveedor recuperados.',
            coleccion: laColeccion,
            elementos: json.elementos
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

cochesCtrl.putCoches = async (req, res, next) => {
    const laColeccion = req.params.colecciones;
    const elId = req.params.id;
    const elElemento = req.body;
    const URL = `${URL_WS_COCHES}/${laColeccion}/${elId}`;

    fetch(URL, {
        method: 'PUT',
        body: JSON.stringify(elElemento),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( (resp) => {
        if(resp.status == 200)
            return resp.json();
        throw Error(resp.status);
    })
    .then( json => {
        res.json({
            result: 'Coche modificado.',
            coleccion: laColeccion,
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

cochesCtrl.deleteCoches = async (req, res, next) => {
    const laColeccion = req.params.colecciones;
    const elId = req.params.id;
    const URL = `${URL_WS_COCHES}/${laColeccion}/${elId}`;

    fetch(URL, {
        method: 'DELETE'
    })
    .then( (resp) => {
        if(resp.status == 200)
            return resp.json();
        throw Error(resp.status);
    })
    .then( json => {
        res.json({
            result: 'Coche eliminado.',
            coleccion: laColeccion,
            elemento: json.elemento
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

// URL -> /api/agencia/coches/disponible/:disponible
cochesCtrl.getCocheDisponible = async(req, res) => {
    const coches = await Coche.find({ "disponible": req.params.disponible })
    res.send(coches)
}



// URL -> /api/agencia/coches/precio/:precio

cochesCtrl.getCochePrecio = async(req, res, next) => {
    await Coche.find({ "precio": { $lte: req.params.precio },
        "disponible": true }, (err, coches) => {
            if(err) return next(err);

            console.log(coches);
            res.json({
                result: 'OK',
                elementos: coches
            });
        });
}


// URL -> /api/agencia/coches/marca/:marca

cochesCtrl.getCocheMarca = async(req, res) => {
    await Coche.find({ "marca": req.params.marca,
    "disponible": true }, (err, coches) => {
        if(err) return next(err);

        console.log(coches);
        res.json({
            result: 'OK',
            elementos: coches
        });
    });
}


// URL -> /api/agencia/coches/localidad/:localidad

cochesCtrl.getCocheLocalidad = async(req, res) => {
    const coches = await Coche.find({ "localidad": req.params.localidad,
    "disponible": true }, (err, coches) => {
        if(err) return next(err);

        console.log(coches);
        res.json({
            result: 'OK',
            elementos: coches
        });
    });
}


// URL -> /api/agencia/coches/modelo/:modelo

cochesCtrl.getCocheModelo = async(req, res) => {
    const coches = await Coche.find({ "modelo": req.params.modelo,
    "disponible": true }, (err, coches) => {
        if(err) return next(err);

        console.log(coches);
        res.json({
            result: 'OK',
            elementos: coches
        });
    });
}


// URL -> /api/agencia/coches/asientos/:asientos

cochesCtrl.getCocheAsientos = async(req, res) => {
    const coches = await Coche.find({ "asientos": { $lte: req.params.asientos },
    "disponible": true }, (err, coches) => {
        if(err) return next(err);

        console.log(coches);
        res.json({
            result: 'OK',
            elementos: coches
        });
    });
}


cochesCtrl.getCochesByAsiLocEst = async (req, res, next) => {
    const laColeccion = req.params.colecciones;
    const localidad = req.params.localidad;
    const asientos = req.params.asientos;
    const URL = `${URL_WS_COCHES}/${laColeccion}/localidad/${localidad}/asientos/${asientos}`;

    fetch(URL).then( (resp) => {
        if(resp.status == 200)
            return resp.json();
        throw Error(resp.status);
    })
    .then( json => {
        res.json({
            result: 'Coches DISPONIBLES del proveedor filtrados por: LOCALIDAD y ASIENTOS recuperados correctamente.',
            coleccion: laColeccion,
            elementos: json.elementos
        });
    })
    .catch((error) => {
        next(error.status);
    });
}

module.exports = cochesCtrl;