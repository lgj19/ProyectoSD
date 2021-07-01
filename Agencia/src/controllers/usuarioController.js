//Inicialización de variables
const usuarioCtrl = {};
//const { rawListeners } = require('../app');
const Usuario = require('../models/Usuario');


//Controladores de la API


// URL -> /api/agencia/usuario

usuarioCtrl.getUsuarios = async (req, res, next) => {
    await Usuario.find((err, usuarios) => {
        if(err) return next(err);

        console.log(usuarios);
        res.json({
            result: 'Usuarios recuperados correctamente.',
            elementos: usuarios
        });
    });
}

usuarioCtrl.postUsuario = async(req,res, next) => {
    const newUsuario = new Usuario(req.body)

    await newUsuario.save((err, nuevoUsuario) => {
        if(err) return next(err);

        console.log(nuevoUsuario);
        res.status(201).json({
            result: 'Usuario guardado correctamente.',
            elementos: nuevoUsuario
        });
    });
}

usuarioCtrl.putUsuarios = async(req, res, next) => {
    await Usuario.updateMany({ }, req.body, (err, usuariosModificados) => {
        if(err) return next(err);

        console.log(usuariosModificados);
        res.json({
            result: 'Usuarios modificados correctamente.',
            elementos: usuariosModificados
        });
    });
}

usuarioCtrl.deleteUsuarios = async(req, res, next) => {
    await Usuario.deleteMany((err, usuariosEliminados) => {
        if(err) return next(err);

        console.log(usuariosEliminados);
        res.json({
            result: 'Usuarios eliminados correctamente.',
            elementos: usuariosEliminados
        });
    });
}


// URL -> /api/agencia/usuario/{_id}

usuarioCtrl.getUsuarioId = async (req,res, next) => {
    await Usuario.findById(req.params.id, (err, usuario) => {
        if(err) return next(err);

        console.log(usuario);
        res.json({
            result: 'Usuario recuperado correctamente.',
            elementos: usuario
        });
    });
}

usuarioCtrl.putUsuarioId = async (req,res, next) => {
    await Usuario.findByIdAndUpdate(req.params.id, req.body, (err, usuario) => {
        if(err) return next(err);

        console.log(usuario);
        res.json({
            result: 'Usuario modificado correctamente.',
            elementos: usuario
        });
    });
}

usuarioCtrl.deleteUsuarioId = async (req,res) => {
    await Usuario.findByIdAndDelete(req.params.id, (err, usuario) => {
        if(err) return next(err);

        console.log(usuario);
        res.json({
            result: 'Usuario eliminado correctamente.',
            elementos: usuario
        });
    });
}




module.exports = usuarioCtrl;