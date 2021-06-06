const { Router } = require('express')
const router = Router()

const agenciaCtrl = require('../controllers/agenciaController.js')

router.get('/', agenciaCtrl.saludoInicio)

router.get('/usuario', agenciaCtrl.getUsuarios)

router.post('/usuario', agenciaCtrl.postUsuario)
router.put('/usuario', agenciaCtrl.putUsuarios)
router.delete('/usuario', agenciaCtrl.deleteUsuarios)
/*
router.get('/coches/:id', cochesCtrl.getCocheId)
router.put('/coches/:id', cochesCtrl.putCocheId)
router.delete('/coches/:id', cochesCtrl.deleteCocheId)


router.get('/coches/precio/:precio', cochesCtrl.getCochePrecio)
router.get('/coches/marca/:marca', cochesCtrl.getCocheMarca)
router.get('/coches/localidad/:localidad', cochesCtrl.getCocheLocalidad)
router.get('/coches/modelo/:modelo', cochesCtrl.getCocheModelo)
router.get('/coches/asientos/:asientos', cochesCtrl.getCocheAsientos)

router.all('/api/coches/disponible/:disponible', cochesCtrl.getCocheDisponible)
*/
module.exports = router;