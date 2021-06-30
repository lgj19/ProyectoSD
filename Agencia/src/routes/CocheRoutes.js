const { Router } = require('express')
const router = Router()
const { authJwt } = require('../middlewares')
const cochesCtrl = require('../controllers/cocheController.js')


router.get('/coches', authJwt.verifyToken, cochesCtrl.getCoches)
router.get('/coches/:id', authJwt.verifyToken, cochesCtrl.getCoche)
router.post('/coches', [authJwt.verifyToken, authJwt.isAdmin], cochesCtrl.postCoches)
router.put('/coches/:id', authJwt.verifyToken, cochesCtrl.putCoches)
router.delete('/coches/:id', [authJwt.verifyToken, authJwt.isAdmin], cochesCtrl.deleteCoches)
router.get('/coches/localidad/:localidad/asientos/:asientos', authJwt.verifyToken, cochesCtrl.getCochesByAsiLocEst)


module.exports = router;