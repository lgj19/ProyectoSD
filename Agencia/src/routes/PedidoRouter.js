const { Router } = require('express')
const router = Router()
const { authJwt } = require('../middlewares')
const pedidoCtrl = require('../controllers/pedidoController.js')


router.get('/pedidos', authJwt.verifyToken, pedidoCtrl.getPedidos)
router.post('/pedidos', authJwt.verifyToken, pedidoCtrl.postPedido)

router.get('/pedidos/:id', authJwt.verifyToken,  pedidoCtrl.getPedido)
router.put('/pedidos/:id', authJwt.verifyToken,  pedidoCtrl.putPedido)
router.delete('/pedidos/:id', authJwt.verifyToken,  pedidoCtrl.deletePedido)

router.get('/pedidos/usuario/:usuid', authJwt.verifyToken,  pedidoCtrl.getPedidoUsuarioId)


module.exports = router;