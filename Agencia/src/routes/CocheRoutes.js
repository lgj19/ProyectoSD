const { Router } = require('express')
const router = Router()
const { authJwt } = require('../middlewares')
const cochesCtrl = require('../controllers/cocheController.js')


router.get('/:colecciones', authJwt.verifyToken, cochesCtrl.getCoches)
router.post('/:colecciones', [authJwt.verifyToken, authJwt.isAdmin], cochesCtrl.postCoches)

router.put('/:colecciones/:id', [authJwt.verifyToken, authJwt.isAdmin], cochesCtrl.putCoches)
router.delete('/:colecciones/:id', [authJwt.verifyToken, authJwt.isAdmin], cochesCtrl.deleteCoches)


router.get('/:colecciones/localidad/:localidad/asientos/:asientos', authJwt.verifyToken, cochesCtrl.getCochesByAsiLocEst)


module.exports = router;