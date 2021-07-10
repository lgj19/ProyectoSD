const { Router } = require('express')
const router = Router()
const authJwt = require('../middlewares/authJwt.js')
const agenciaCtrl = require('../controllers/agenciaController.js')


router.put('/createReservation', authJwt.verifyToken, agenciaCtrl.createReservation)


module.exports = router;