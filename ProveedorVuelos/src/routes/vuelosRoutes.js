const { Router } = require('express')
const router = Router()

const vuelosCtrl = require('../controllers/vuelosController.js')

router.get('/', vuelosCtrl.saludoInicio)

router.get('/vuelos', vuelosCtrl.getVuelos)
router.post('/vuelos', vuelosCtrl.postVuelo)
router.put('/vuelos', vuelosCtrl.putVuelos)
router.delete('/vuelos', vuelosCtrl.deleteVuelos)

router.get('/vuelos/:id', vuelosCtrl.getVueloId)
router.put('/vuelos/:id', vuelosCtrl.putVueloId)
router.delete('/vuelos/:id', vuelosCtrl.deleteVueloId)


router.get('/vuelos/precio/:precio', vuelosCtrl.getVueloPrecio)
router.get('/vuelos/origen/:origen', vuelosCtrl.getVueloOrigen)
router.get('/vuelos/destino/:destino', vuelosCtrl.getVueloDestino)
router.get('/vuelos/empresa/:empresa', vuelosCtrl.getVueloEmpresa)
router.get('/vuelos/fecha/:fecha', vuelosCtrl.getVueloFecha)

router.get('/vuelos/disponible/:disponible', vuelosCtrl.getVueloDisponible)

module.exports = router;