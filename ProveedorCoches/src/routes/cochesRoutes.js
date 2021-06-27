const { Router } = require('express')
const router = Router()

const cochesCtrl = require('../controllers/cochesController.js')

router.get('/', cochesCtrl.saludoInicio)

router.get('/coches', cochesCtrl.getCoches)
router.post('/coches', cochesCtrl.postCoche)
router.put('/coches', cochesCtrl.putCoches)
router.delete('/coches', cochesCtrl.deleteCoches)

router.get('/coches/:id', cochesCtrl.getCocheId)
router.put('/coches/:id', cochesCtrl.putCocheId)
router.delete('/coches/:id', cochesCtrl.deleteCocheId)


router.get('/coches/precio/:precio', cochesCtrl.getCochePrecio)
router.get('/coches/marca/:marca', cochesCtrl.getCocheMarca)
router.get('/coches/localidad/:localidad', cochesCtrl.getCocheLocalidad)
router.get('/coches/modelo/:modelo', cochesCtrl.getCocheModelo)
router.get('/coches/asientos/:asientos', cochesCtrl.getCocheAsientos)
router.get('/coches/disponible/:disponible', cochesCtrl.getCocheDisponible)

router.get('/coches/localidad/:localidad/asientos/:asientos', cochesCtrl.getCochesByLocAsiEst)

module.exports = router;