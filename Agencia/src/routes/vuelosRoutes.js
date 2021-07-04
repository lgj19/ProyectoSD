const { Router } = require('express')
const router = Router()
const authJwt = require('../middlewares/authJwt.js')
const vuelosCtrl = require('../controllers/vuelosController.js')

router.put('/vuelos/:id/cambiarEstado', authJwt.verifyToken, vuelosCtrl.cambiarVueloEstado)

router.get('/vuelos', authJwt.verifyToken, vuelosCtrl.getVuelos)
router.post('/vuelos', authJwt.verifyToken, vuelosCtrl.postVuelo)

router.get('/vuelos/:id', authJwt.verifyToken, vuelosCtrl.getVuelo)
router.put('/vuelos/:id', authJwt.verifyToken, vuelosCtrl.putVuelo)
router.delete('/vuelos/:id', [authJwt.verifyToken, authJwt.isAdmin], vuelosCtrl.deleteVuelo)


router.get('/vuelos/origen/:origen/destino/:destino/asientos/:asientos/fecha/:fecha', authJwt.verifyToken, vuelosCtrl.getVuelosByOriByDestByAsiByFecEst)

module.exports = router;