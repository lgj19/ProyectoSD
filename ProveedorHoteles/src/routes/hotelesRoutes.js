const { Router } = require('express')
const router = Router()

const hotelesCtrl = require('../controllers/hotelesController.js')

router.get('/', hotelesCtrl.saludoInicio)

router.get('/hoteles', hotelesCtrl.getHoteles)
router.post('/hoteles', hotelesCtrl.postHotel)
router.put('/hoteles', hotelesCtrl.putHoteles)
router.delete('/hoteles', hotelesCtrl.deleteHoteles)

router.get('/hoteles/:id', hotelesCtrl.getHotelId)
router.put('/hoteles/:id', hotelesCtrl.putHotelId)
router.delete('/hoteles/:id', hotelesCtrl.deleteHotelId)


router.get('/hoteles/precio/:precio_noche', hotelesCtrl.getHotelPrecio)
router.get('/hoteles/nombre/:nombre', hotelesCtrl.getHotelNombre)
router.get('/hoteles/localidad/:localidad', hotelesCtrl.getHotelLocalidad)

router.all('/api/hoteles/disponible/:disponible', hotelesCtrl.getHotelDisponible)

module.exports = router;