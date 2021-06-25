const { Router } = require('express')
const router = Router()

const agenciaCtrl = require('../controllers/agenciaController.js')
const usuarioCtrl = require('../controllers/usuarioController.js')
const cochesCtrl = require('../controllers/cocheController.js')

router.get('/', agenciaCtrl.saludoInicio)

router.get('/usuario', usuarioCtrl.getUsuarios)
router.post('/usuario', usuarioCtrl.postUsuario)
router.put('/usuario', usuarioCtrl.putUsuarios)
router.delete('/usuario', usuarioCtrl.deleteUsuarios)

router.get('/usuario/:id', usuarioCtrl.getUsuarioId)
router.put('/usuario/:id', usuarioCtrl.putUsuarioId)
router.delete('/usuario/:id', usuarioCtrl.deleteUsuarioId)

router.get('/:colecciones', cochesCtrl.getCoches)
router.put('/:colecciones/:id', cochesCtrl.putCoches)
/*
router.get('/coches/precio/:precio', cochesCtrl.getCochePrecio)
router.get('/coches/marca/:marca', cochesCtrl.getCocheMarca)
router.get('/coches/localidad/:localidad', cochesCtrl.getCocheLocalidad)
router.get('/coches/modelo/:modelo', cochesCtrl.getCocheModelo)
router.get('/coches/asientos/:asientos', cochesCtrl.getCocheAsientos)

router.all('/api/coches/disponible/:disponible', cochesCtrl.getCocheDisponible)
*/
module.exports = router;