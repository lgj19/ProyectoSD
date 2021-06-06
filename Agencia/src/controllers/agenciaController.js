
//Inicialización de variables
const agenciaCtrl = {};
//const { rawListeners } = require('../app');
const Agencia = require('../models/Agencia');


//Controladores de la API


// URL -> /api/agencia/

agenciaCtrl.saludoInicio = (req, res) =>
    res.send({'Title':'Bienvenido a la agencia de viajes.'});


// URL -> /api/agencia/usuario

agenciaCtrl.getUsuarios = async (req, res) => {
    const usuarios = await Agencia.find()
    res.json(usuarios)
}

agenciaCtrl.postUsuario = async(req,res) => {
    const newUsuario = new Agencia(req.body)

    await newUsuario.save()

    res.json({status: 'Usuario guardado correctamente.'})
}

agenciaCtrl.putUsuarios = async(req, res) => {
    await Agencia.updateMany({ }, req.body);
    res.json({status: 'Usuarios actualizados correctamente.'})
}

agenciaCtrl.deleteUsuarios = async(req, res) => {
    await Agencia.deleteMany();
    res.json({status: 'Usuarios borrados correctamente.'})
}

/*

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
*/
module.exports = agenciaCtrl;