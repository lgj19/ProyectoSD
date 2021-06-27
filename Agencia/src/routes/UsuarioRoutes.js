const { Router } = require('express')
const router = Router()
const { authJwt } = require('../middlewares')


const usuarioCtrl = require('../controllers/usuarioController.js')

router.get('/usuario', [authJwt.verifyToken, authJwt.isAdmin], usuarioCtrl.getUsuarios)
router.post('/usuario', [authJwt.verifyToken, authJwt.isAdmin], usuarioCtrl.postUsuario)
router.put('/usuario', [authJwt.verifyToken, authJwt.isAdmin], usuarioCtrl.putUsuarios)
router.delete('/usuario',[authJwt.verifyToken, authJwt.isAdmin],  usuarioCtrl.deleteUsuarios)

router.get('/usuario/:id', [authJwt.verifyToken, authJwt.isAdmin], usuarioCtrl.getUsuarioId)
router.put('/usuario/:id', [authJwt.verifyToken, authJwt.isAdmin], usuarioCtrl.putUsuarioId)
router.delete('/usuario/:id', [authJwt.verifyToken, authJwt.isAdmin], usuarioCtrl.deleteUsuarioId)


module.exports = router;