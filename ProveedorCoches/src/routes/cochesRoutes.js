const { Router } = require('express')
const router = Router()

const cochesCtrl = require('../controllers/cochesController.js')
const authJwt = require('../middlewares/authJwt.js')

router.get('/', cochesCtrl.saludoInicio)

router.get('/coches', authJwt.verifyToken, cochesCtrl.getCoches)
router.post('/coches', authJwt.verifyToken,  cochesCtrl.postCoche)
router.put('/coches', authJwt.verifyToken,  cochesCtrl.putCoches)
router.delete('/coches', authJwt.verifyToken,  cochesCtrl.deleteCoches)

router.get('/coches/:id', authJwt.verifyToken, cochesCtrl.getCocheId)
router.put('/coches/:id', authJwt.verifyToken,  cochesCtrl.putCocheId)
router.delete('/coches/:id', authJwt.verifyToken,  cochesCtrl.deleteCocheId)


router.get('/coches/precio/:precio',  cochesCtrl.getCochePrecio)
router.get('/coches/marca/:marca',  cochesCtrl.getCocheMarca)
router.get('/coches/localidad/:localidad', cochesCtrl.getCocheLocalidad)
router.get('/coches/modelo/:modelo',  cochesCtrl.getCocheModelo)
router.get('/coches/asientos/:asientos',  cochesCtrl.getCocheAsientos)
router.get('/coches/disponible/:disponible',  cochesCtrl.getCocheDisponible)

router.get('/coches/localidad/:localidad/asientos/:asientos', authJwt.verifyToken,  cochesCtrl.getCochesByLocAsiEst)

module.exports = router;