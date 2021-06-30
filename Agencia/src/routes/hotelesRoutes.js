const { Router } = require('express')
const router = Router()

const hotelesCtrl = require('../controllers/hotelController.js')
const authJwt = require('../middlewares/authJwt.js')

router.get('/hoteles', authJwt.verifyToken, hotelesCtrl.getHoteles)
router.post('/hoteles', [authJwt.verifyToken, authJwt.isAdmin], hotelesCtrl.postHotel)

router.get('/hoteles/:id', authJwt.verifyToken, hotelesCtrl.getHotel)
router.put('/hoteles/:id', authJwt.verifyToken, hotelesCtrl.putHotel)
router.delete('/hoteles/:id', [authJwt.verifyToken, authJwt.isAdmin], hotelesCtrl.deleteHotel)

router.get('/hoteles/localidad/:localidad/personas/:personas', authJwt.verifyToken, hotelesCtrl.getHotelesByLocPerEst)

module.exports = router;