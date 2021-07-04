const { Router } = require('express')
const router = Router()
const authJwt = require('../middlewares/authJwt.js')
const vuelosCtrl = require('../controllers/vuelosController.js')

router.get('/', vuelosCtrl.saludoInicio)

router.get('/vuelos', authJwt.verifyToken, vuelosCtrl.getVuelos)
router.post('/vuelos', authJwt.verifyToken, vuelosCtrl.postVuelo)
router.put('/vuelos', authJwt.verifyToken, vuelosCtrl.putVuelos)
router.delete('/vuelos', authJwt.verifyToken, vuelosCtrl.deleteVuelos)

router.get('/vuelos/:id', authJwt.verifyToken, vuelosCtrl.getVueloId)
router.put('/vuelos/:id', authJwt.verifyToken, vuelosCtrl.putVueloId)
router.delete('/vuelos/:id', authJwt.verifyToken, vuelosCtrl.deleteVueloId)

router.put('/vuelos/:id/cambiarEstado', authJwt.verifyToken, vuelosCtrl.cambiarEstado)
router.get('/vuelos/origen/:origen/destino/:destino/asientos/:asientos/fecha/:fecha', authJwt.verifyToken, vuelosCtrl.getVuelosByOriByDestByAsiByFecEst)

module.exports = router;