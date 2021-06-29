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
    var newPedido = new Pedido(req.body)
    console.log(req.userId)
    newPedido.idUsuario = req.userId;

    await newPedido.save((err, nuevoPedido) => {
        if(err) return next(err);

        console.log(nuevoPedido);
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


pedidosCtrl.getPedidoUsuarioId = async (req, res, next) => {
    await Pedido.find({idUsuario: req.params.usuid}, (err, pedido) => {
        if(err) return next(err);

        console.log(pedido);
        res.json({
            result: 'Pedido recuperado correctamente con el ID del usuario.',
            elemento: pedido
        });
    });
}


module.exports = pedidosCtrl;