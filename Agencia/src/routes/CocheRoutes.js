const { Router } = require('express')
const router = Router()
const { authJwt } = require('../middlewares')
const cochesCtrl = require('../controllers/cocheController.js')


router.get('/coches', authJwt.verifyToken, cochesCtrl.getCoches)
router.post('/coches', [authJwt.verifyToken, authJwt.isAdmin], cochesCtrl.postCoches)

router.get('/coches/:id', authJwt.verifyToken, cochesCtrl.getCoche)
router.put('/coches/:id', authJwt.verifyToken, cochesCtrl.putCoches)
router.delete('/coches/:id', [authJwt.verifyToken, authJwt.isAdmin], cochesCtrl.deleteCoches)

router.put('/coches/:id/fechasReservadas', authJwt.verifyToken, cochesCtrl.putFechasReservadas)
router.get('/coches/localidad/:localidad/asientos/:asientos', authJwt.verifyToken, cochesCtrl.getCochesByAsiLoc)


module.exports = router;