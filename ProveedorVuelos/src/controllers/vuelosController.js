
//Inicialización de variables
const vuelosCtrl = {};
//const { rawListeners } = require('../app');
const Vuelo = require('../models/Vuelo');


//CONTROLADORES de la API


// URL -> /api/

vuelosCtrl.saludoInicio = (req, res) =>
    res.send({'Title':'Bienvenido al proveedor de vuelos.'});


// URL -> /api/vuelos/

vuelosCtrl.getVuelos = async (req, res) => {
    const vuelos = await Vuelo.find()
    res.json(vuelos)
}

vuelosCtrl.postVuelo = async(req,res) => {
    const newVuelo = new Vuelo(req.body)

    await newVuelo.save()

    res.json({status: 'Vuelo guardado correctamente.'})
}

vuelosCtrl.putVuelos = async(req, res) => {
    await Vuelo.updateMany({ }, req.body);
    res.json({status: 'Vuelos actualizados correctamente.'})
}

vuelosCtrl.deleteVuelos = async(req, res) => {
    await Vuelo.deleteMany();
    res.json({status: 'Vuelos borrados correctamente.'})
}


// URL -> /api/vuelos/:id

vuelosCtrl.getVueloId = async (req,res) => {
    const vuelo = await Vuelo.findById(req.params.id)
    res.send(vuelo)
}

vuelosCtrl.putVueloId = async (req,res) => {
    await Vuelo.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'Vuelo actualizado correctamente.'})
}

vuelosCtrl.deleteVueloId = async (req,res) => {
    await Vuelo.findByIdAndDelete(req.params.id)
    res.json({status: 'Vuelo eliminado de la BD correctamente.'})
}


// URL -> /api/vuelos/disponible/:disponible
vuelosCtrl.getVueloDisponible = async(req, res) => {
    const vuelos = await Vuelo.find({ "disponible": req.params.disponible })
    res.send(vuelos)
}


// URL -> /api/vuelos/empresa/:empresa

vuelosCtrl.getVueloEmpresa = async(req, res) => {
    const vuelos = await Vuelo.find({ "empresa": req.params.empresa,
    "disponible": true })
    res.send(vuelos)
}

// URL -> /api/vuelos/precio/:precio

vuelosCtrl.getVueloPrecio = async(req, res) => {
    const vuelos = await Vuelo.find({ "precio": { $lte: req.params.precio },
        "disponible": true })
    res.send(vuelos)
}


// URL -> /api/vuelos/origen/:origen

vuelosCtrl.getVueloOrigen = async(req, res) => {
    const vuelos = await Vuelo.find({ "origen": req.params.origen,
    "disponible": true })
    res.send(vuelos)
}


// URL -> /api/vuelos/destino/:destino

vuelosCtrl.getVueloDestino = async(req, res) => {
    const vuelos = await Vuelo.find({ "destino": req.params.destino,
    "disponible": true })
    res.send(vuelos)
}


// URL -> /api/coches/fecha/:fecha

vuelosCtrl.getVueloFecha = async(req, res) => {
    const vuelos = await Vuelo.find({ "fecha": req.params.fecha,
    "disponible": true })
    res.send(vuelos)
}


module.exports = vuelosCtrl;