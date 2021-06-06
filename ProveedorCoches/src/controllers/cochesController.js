
//Inicialización de variables
const cochesCtrl = {};
//const { rawListeners } = require('../app');
const Coche = require('../models/Coche');


//Controladores de la API


// URL -> /api/

cochesCtrl.saludoInicio = (req, res) =>
    res.send({'Title':'Bienvenido al proveedor de coches.'});


// URL -> /api/coches/

cochesCtrl.getCoches = async (req, res) => {
    const coches = await Coche.find()
    res.json(coches)
}

cochesCtrl.postCoche = async(req,res) => {
    const newCoche = new Coche(req.body)

    await newCoche.save()

    res.json({status: 'Coche guardado correctamente.'})
}

cochesCtrl.putCoches = async(req, res) => {
    await Coche.updateMany({ }, req.body);
    res.json({status: 'Coches actualizados correctamente.'})
}

cochesCtrl.deleteCoches = async(req, res) => {
    await Coche.deleteMany();
    res.json({status: 'Coches borrados correctamente.'})
}


// URL -> /api/coches/:id

cochesCtrl.getCocheId = async (req,res) => {
    const coche = await Coche.findById(req.params.id)
    res.send(coche)
}

cochesCtrl.putCocheId = async (req,res) => {
    await Coche.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'Coche actualizado correctamente.'})
}

cochesCtrl.deleteCocheId = async (req,res) => {
    await Coche.findByIdAndDelete(req.params.id)
    res.json({status: 'Coche eliminado de la BD correctamente.'})
}


// URL -> /api/coches/disponible/:disponible
cochesCtrl.getCocheDisponible = async(req, res) => {
    const coches = await Coche.find({ "disponible": req.params.disponible })
    res.send(coches)
}



// URL -> /api/coches/precio/:precio

cochesCtrl.getCochePrecio = async(req, res) => {
    const coches = await Coche.find({ "precio": { $lte: req.params.precio },
        "disponible": true })
    res.send(coches)
}


// URL -> /api/coches/marca/:marca

cochesCtrl.getCocheMarca = async(req, res) => {
    const coches = await Coche.find({ "marca": req.params.marca,
    "disponible": true })
    res.send(coches)
}


// URL -> /api/coches/localidad/:localidad

cochesCtrl.getCocheLocalidad = async(req, res) => {
    const coches = await Coche.find({ "localidad": req.params.localidad,
    "disponible": true })
    res.send(coches)
}


// URL -> /api/coches/modelo/:modelo

cochesCtrl.getCocheModelo = async(req, res) => {
    const coches = await Coche.find({ "modelo": req.params.modelo,
    "disponible": true })
    res.send(coches)
}


// URL -> /api/coches/asientos/:asientos

cochesCtrl.getCocheAsientos = async(req, res) => {
    const coches = await Coche.find({ "asientos": { $lte: req.params.asientos },
    "disponible": true })
    res.send(coches)
}

module.exports = cochesCtrl;