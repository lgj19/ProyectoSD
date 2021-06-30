
//Inicialización de variables
const hotelesCtrl = {};
//const { rawListeners } = require('../app');
const Hotel = require('../models/Hotel');


//Controladores de la API


// URL -> /api/

hotelesCtrl.saludoInicio = (req, res) =>
    res.send({'Title':'Bienvenido al proveedor de hoteles.'});


// URL -> /api/hoteles/

hotelesCtrl.getHoteles = async (req, res, next) => {
    await Hotel.find((err, elementos) => {
        if(err) return next(err);

        res.json({
            result: 'Hoteles recuperados correctamente.',
            elementos: elementos
        });
    });
}

hotelesCtrl.postHotel = async(req,res, next) => {
    const newHotel = new Hotel(req.body)

    await newHotel.save((err, hotelNuevo) => {
        if(err) return next(err);

        res.status(201).json({
            result: 'OK',
            elemento: hotelNuevo
        });
    });
}

hotelesCtrl.putHoteles = async(req, res, next) => {
    await Hotel.updateMany({ }, req.body, (err, hoteles) => {
        if(err) return next(err);

        res.json({
            result: 'Hoteles modificados correctamente.',
            elementos: hoteles
        });
    });
}

hotelesCtrl.deleteHoteles = async(req, res, next) => {
    await Hotel.deleteMany((err, hoteles) => {
        if(err) return next();

        res.json({
            result: 'Hoteles eliminados correctamente.',
            elementos: hoteles
        });
    });
}


// URL -> /api/hoteles/:id

hotelesCtrl.getHotelId = async (req, res, next) => {
    await Hotel.findById(req.params.id, (err, hotel) => {
        if(err) return next(err);

        res.json({
            result: 'Recuperado hotel por ID correctamente.',
            elemento: hotel
        });
    });
}

hotelesCtrl.putHotelId = async (req, res, next) => {
    await Hotel.findByIdAndUpdate(req.params.id, req.body, (err, hotel) => {
        if(err) return next(err);

        res.json({
            result: 'Modificado hotel por ID correctamente.',
            elemento: hotel
        });
    });
}

hotelesCtrl.deleteHotelId = async (req, res, next) => {
    await Hotel.findByIdAndDelete(req.params.id, (err, hotel) => {
        if(err) return next(err);

        res.json({
            result: 'Eliminado hotel por ID correctamente.',
            elemento: hotel
        });
    });
}


hotelesCtrl.getHotelesByLocPerEst = async(req, res, next) => {
    await Hotel.find({ "localidad": req.params.localidad, "personas": { $gte: req.params.personas },
    "estado": "DISPONIBLE" }, (err, hoteles) => {
        if(err) return next(err);

        res.json({
            result: 'Búsqueda de hoteles por "localidad", "personas" y "estado=DISPONIBLE" realizada satisfactoriamente.',
            elementos: hoteles
        });
    });
}

module.exports = hotelesCtrl;