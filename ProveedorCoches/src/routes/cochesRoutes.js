const { Router } = require('express')
const router = Router()

const cochesCtrl = require('../controllers/cochesController.js')
const authJwt = require('../middlewares/authJwt.js')

router.get('/', cochesCtrl.saludoInicio)

router.put('/coches/:id/fechasReservadas', authJwt.verifyToken, cochesCtrl.putFechasReservadas)

router.get('/coches', authJwt.verifyToken, cochesCtrl.getCoches)
router.post('/coches', authJwt.verifyToken,  cochesCtrl.postCoche)
router.put('/coches', authJwt.verifyToken,  cochesCtrl.putCoches)
router.delete('/coches', authJwt.verifyToken,  cochesCtrl.deleteCoches)

router.get('/coches/:id', authJwt.verifyToken, cochesCtrl.getCocheId)
router.put('/coches/:id', authJwt.verifyToken,  cochesCtrl.putCocheId)
router.delete('/coches/:id', authJwt.verifyToken,  cochesCtrl.deleteCocheId)


router.get('/coches/localidad/:localidad/asientos/:asientos', authJwt.verifyToken,  cochesCtrl.getCochesByLocAsi)

router.put('/coches/:id/fechaIni/:fechaIni/fechaFin/:fechaFin', authJwt.verifyToken, cochesCtrl.UpdateFechasReservadasById)
module.exports = router;