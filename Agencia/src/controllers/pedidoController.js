//Inicialización de variables
const pedidosCtrl = {};
const { json } = require('express');
//const { rawListeners } = require('../app');
const Pedido = require('../models/Pedido');
const fetch = require('node-fetch');



pedidosCtrl.getPedidos = async (req, res, next) => {
    await Pedido.find((err, pedidos) => {
        if(err) return next(err);

        console.log(pedidos);
        res.json({
            result: 'Pedidos recuperados correctamente.',
            elementos: pedidos
        });
    });
}


pedidosCtrl.postPedido = async (req, res, next) => {
    
    var newPedido = new Pedido(req.body.pedido)
    newPedido.idUsuario = req.userId;
    console.log(newPedido)
    await newPedido.save((err, nuevoPedido) => {
        if(err){
            res.status(401).json({
                result: 'Ya tienes un pedido RESERVADO o COMPRADO.',
                status: 401
            })
            return;
        }
        res.status(201).json({
            result: 'Pedido guardado correctamente.',
            elemento: nuevoPedido
        });
    });
}

pedidosCtrl.putPedido = async (req, res, next) => {
    await Pedido.findByIdAndUpdate(req.params.id, req.body, (err, pedido) => {
        if(err) return next(err);

        console.log(pedido);
        res.json({
            result: 'Pedido por ID modificado correctamente.',
            elemento: pedido
        });
    });
}

pedidosCtrl.deletePedido = async (req, res, next) => {
    await Pedido.findByIdAndDelete(req.params.id, (err, pedido) => {
        if(err) return next(err);

        console.log(pedido);
        res.json({
            result: 'Pedido por ID eliminado correctamente.',
            elemento: pedido
        });
    });
}

pedidosCtrl.getPedido = async (req, res, next) => {
    await Pedido.findById(req.params.id, (err, pedido) => {
        if(err) return next(err);

        console.log(pedido);
        res.json({
            result: 'Pedido por ID recuperado correctamente .',
            elemento: pedido
        });
    });
}


pedidosCtrl.getPedidoUsuario = async (req, res, next) => {
    const userId = req.userId;
    await Pedido.findOne({idUsuario: userId}, (err, pedido) => {
        if(err) return next(err);

        res.json({
            result: 'Pedido recuperado correctamente con el ID del usuario.',
            elemento: pedido
        });
    });
}


pedidosCtrl.putPedidoUsuario = async (req, res, next) => {
    const userId = req.userId;
    await Pedido.findOneAndUpdate({idUsuario: userId}, 
        {
            $set: { idCoche: req.body.idCoche, idVueloIda: req.body.idVueloIda, idVueloVuelta: req.body.idVueloVuelta, idHotel: req.body.idHotel}
        }
    , (err, pedido) => {
        if(err) return next(err);

        res.json({
            result: 'Pedido modificado correctamente con el ID del usuario.',
            elemento: pedido
        });
    });
}

pedidosCtrl.deletePedidoUsuario = async (req, res, next) => {
    const userId = req.userId;
    await Pedido.findOneAndDelete({idUsuario: userId}
    , (err, pedido) => {
        if(err) return next(err);

        res.json({
            result: 'Pedido eliminado correctamente con el ID del usuario.',
            elemento: pedido
        });
    });
}

pedidosCtrl.cambiarPedidoEstado = async (req, res, next) => {
    const id = req.params.id;
    await Pedido.findByIdAndUpdate(id,{ $set: { estado: req.body.estado} }
    , (err, pedido) => {
        if(err)
            res.status(err.status).json({
                result: 'Error al cambiar el estado del pedido.',
                elemento: pedido
            });

        res.json({
            result: 'Pedido modificado correctamente con el ID del usuario.',
            elemento: pedido
        });
    });
}

module.exports = pedidosCtrl;