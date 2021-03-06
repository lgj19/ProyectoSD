
//Inicialización de variables
const hotelesCtrl = {};
//const { rawListeners } = require('../app');
const Hotel = require('../models/Hotel');


//Controladores de la API


// URL -> /api/

hotelesCtrl.saludoInicio = (req, res) =>
    res.send({'Title':'Bienvenido al proveedor de hoteles.'});


hotelesCtrl.putFechasReservadas = async (req,res, next) => {
    const fechas = req.body.fechas

    Hotel.findByIdAndUpdate(req.params.id, {$push: { fechasReservadas: fechas}},
        (err, hotel) => {
        if(err) return next(err);

        res.json({
            result: 'fechasReservadas introducidas correctamente.',
            elemento: hotel
        });
    });
}

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


hotelesCtrl.getHotelesByLocPer = async(req, res, next) => {
    await Hotel.find({ "localidad": req.params.localidad, "personas": { $gte: req.params.personas }},
     (err, hoteles) => {
        if(err) return next(err);

        res.json({
            result: 'Búsqueda de hoteles por "localidad" y"personas" realizada satisfactoriamente.',
            elementos: hoteles
        });
    });
}

// /hoteles/fechaIni/:fechaIni/fechaFin/:fechaFin
/**
 * Actualiza las fechas Reservadas de un coche
 * @param {*} req las fechas de inicio y fin; el id.
 * @param {*} res result, elementos
 */
 hotelesCtrl.UpdateFechasReservadasById = async(req, res) => {
    const fechas = [req.params.fechaIni, req.params.fechaFin];
    const id = req.params.id;

    await Hotel.findByIdAndUpdate( id, {$pull: {fechasReservadas: {$in: fechas}}},
     (err, hotel) => {
        if(err) return next(err);

        res.json({
            result: 'Eliminación de fechas de reserva para un hotel realizada satisfactoriamente.',
            elementos: hotel
        });
    });
}

module.exports = hotelesCtrl;