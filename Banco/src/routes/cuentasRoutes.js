const { Router } = require('express')
const router = Router()

const cuentasCtrl = require('../controllers/cuentasController.js')

router.put('/cuentas/updateMovimiento', cuentasCtrl.updateMovimiento)

module.exports = router;