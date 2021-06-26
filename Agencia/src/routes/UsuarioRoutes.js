const { Router } = require('express')
const router = Router()
const authJwt = require('../middlewares')


const usuarioCtrl = require('../controllers/usuarioController.js')

router.get('/usuario', usuarioCtrl.getUsuarios)
router.post('/usuario', usuarioCtrl.postUsuario)
router.put('/usuario', usuarioCtrl.putUsuarios)
router.delete('/usuario', usuarioCtrl.deleteUsuarios)

router.get('/usuario/:id', usuarioCtrl.getUsuarioId)
router.put('/usuario/:id', usuarioCtrl.putUsuarioId)
router.delete('/usuario/:id', usuarioCtrl.deleteUsuarioId)


module.exports = router;