const { Router } = require('express')
const router = Router()

const hotelesCtrl = require('../controllers/hotelesController.js')
const authJwt = require('../middlewares/authJwt.js')

router.get('/', hotelesCtrl.saludoInicio)

router.get('/hoteles', authJwt.verifyToken, hotelesCtrl.getHoteles)
router.post('/hoteles', authJwt.verifyToken, hotelesCtrl.postHotel)
router.put('/hoteles', authJwt.verifyToken, hotelesCtrl.putHoteles)
router.delete('/hoteles', authJwt.verifyToken, hotelesCtrl.deleteHoteles)

router.get('/hoteles/:id', authJwt.verifyToken, hotelesCtrl.getHotelId)
router.put('/hoteles/:id', authJwt.verifyToken, hotelesCtrl.putHotelId)
router.delete('/hoteles/:id', authJwt.verifyToken, hotelesCtrl.deleteHotelId)

router.get('/hoteles/localidad/:localidad/personas/:personas', authJwt.verifyToken, hotelesCtrl.getHotelesByLocPerEst)

module.exports = router;