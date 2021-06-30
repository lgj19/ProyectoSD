
//Inicialización de variables
const vuelosCtrl = {};
//const { rawListeners } = require('../app');
const Vuelo = require('../models/Vuelo');


//CONTROLADORES de la API


// URL -> /api/

vuelosCtrl.saludoInicio = (req, res, next) =>
    res.send({'Title':'Bienvenido al proveedor de vuelos.'});


// URL -> /api/vuelos/

vuelosCtrl.getVuelos = async (req, res, next) => {
    await Vuelo.find((err, vuelos) => {
        if(err) return next(err);

        res.json({
            result: 'Vuelos recuperados correctamente.',
            elementos: vuelos
        });
    });
}

vuelosCtrl.postVuelo = async(req, res, next) => {
    const newVuelo = new Vuelo(req.body)

    await newVuelo.save((err, vueloNuevo) => {
        if(err) return next(err);

        res.status(201).json({
            result: 'OK',
            elemento: vueloNuevo
        });
    });
}

vuelosCtrl.putVuelos = async(req, res, next) => {
    await Vuelo.updateMany({ }, req.body, (err, vuelos) => {
        if(err) return next(err);

        res.json({
            result: 'vuelos modificados correctamente.',
            elementos: vuelos
        });
    });
}

vuelosCtrl.deleteVuelos = async(req, res, next) => {
    await Vuelo.deleteMany((err, vuelos) => {
        if(err) return next();

        res.json({
            result: 'vuelos eliminados correctamente.',
            elementos: vuelos
        });
    });
}


// URL -> /api/vuelos/:id

vuelosCtrl.getVueloId = async (req, res, next) => {
    await Vuelo.findById(req.params.id, (err, vuelo) => {
        if(err) return next(err);

        res.json({
            result: 'Recuperado vuelo por ID correctamente.',
            elemento: vuelo
        });
    });
}

vuelosCtrl.putVueloId = async (req, res, next) => {
    await Vuelo.findByIdAndUpdate(req.params.id, req.body, (err, vuelo) => {
        if(err) return next(err);

        res.json({
            result: 'Modificado vuelo por ID correctamente.',
            elemento: vuelo
        });
    });
}

vuelosCtrl.deleteVueloId = async (req, res, next) => {
    await Vuelo.findByIdAndDelete(req.params.id, (err, vuelo) => {
        if(err) return next(err);

        res.json({
            result: 'Eliminado vuelo por ID correctamente.',
            elemento: vuelo
        });
    });
}

vuelosCtrl.getVuelosByOriByDestByAsiByFecEst = async(req, res, next) => {
    console.log(req.params.fecha)
    await Vuelo.find({ "origen": req.params.origen, "destino": req.params.destino, "asientos": req.params.asientos, "fecha": req.params.fecha,
    "estado": "DISPONIBLE" }, (err, vuelos) => {
        if(err) return next(err);

        res.json({
            result: 'Búsqueda de vuelos por origen, destino, asientos, fecha y estado=DISPONIBLE realizada satisfactoriamente.',
            elementos: vuelos
        });
    });
}


module.exports = vuelosCtrl;