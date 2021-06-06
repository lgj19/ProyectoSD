
//Inicialización de variables
const hotelesCtrl = {};
//const { rawListeners } = require('../app');
const Hotel = require('../models/Hotel');


//Controladores de la API


// URL -> /api/

hotelesCtrl.saludoInicio = (req, res) =>
    res.send({'Title':'Bienvenido al proveedor de hoteles.'});


// URL -> /api/hoteles/

hotelesCtrl.getHoteles = async (req, res) => {
    const hoteles = await Hotel.find()
    res.json(hoteles)
}

hotelesCtrl.postHotel = async(req,res) => {
    const newHotel = new Hotel(req.body)

    await newHotel.save()

    res.json({status: 'Hotel guardado correctamente.'})
}

hotelesCtrl.putHoteles = async(req, res) => {
    await Hotel.updateMany({ }, req.body);
    res.json({status: 'Hoteles actualizados correctamente.'})
}

hotelesCtrl.deleteHoteles = async(req, res) => {
    await Hotel.deleteMany();
    res.json({status: 'Hoteles borrados correctamente.'})
}


// URL -> /api/hoteles/:id

hotelesCtrl.getHotelId = async (req,res) => {
    const hotel = await Hotel.findById(req.params.id)
    res.send(hotel)
}

hotelesCtrl.putHotelId = async (req,res) => {
    await Hotel.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'Hotel actualizado correctamente.'})
}

hotelesCtrl.deleteHotelId = async (req,res) => {
    await Hotel.findByIdAndDelete(req.params.id)
    res.json({status: 'Hotel eliminado de la BD correctamente.'})
}


// URL -> /api/hoteles/disponible/:disponible
hotelesCtrl.getHotelDisponible = async(req, res) => {
    const hoteles = await Hotel.find({ "disponible": req.params.disponible })
    res.send(hoteles)
}



// URL -> /api/hoteles/precio/:precio_noche

hotelesCtrl.getHotelPrecio = async(req, res) => {
    const hoteles = await Hotel.find({ "precio_noche": { $lte: req.params.precio_noche },
        "disponible": true })
    res.send(hoteles)
}


// URL -> /api/hoteles/localidad/:localidad

hotelesCtrl.getHotelLocalidad = async(req, res) => {
    const hoteles = await Hotel.find({ "localidad": req.params.localidad,
    "disponible": true })
    res.send(hoteles)
}

// URL -> /api/hoteles/nombre/:nombre

hotelesCtrl.getHotelNombre = async(req, res) => {
    const hoteles = await Hotel.find({ "nombre": req.params.nombre,
    "disponible": true })
    res.send(hoteles)
}

module.exports = hotelesCtrl;