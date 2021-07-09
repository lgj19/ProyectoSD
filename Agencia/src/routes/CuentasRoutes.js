const { Router } = require('express')
const router = Router()
const { authJwt } = require('../middlewares')
const cuentasCtrl = require('../controllers/cuentasController.js')

router.put('/cuentas/updateMovimiento', authJwt.verifyToken, cuentasCtrl.updateMovimiento);

module.exports = router;