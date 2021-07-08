const { Router } = require('express')
const router = Router()

const cuentasCtrl = require('../controllers/cuentasController.js')
//const authJwt = require('../middlewares/authJwt.js')


router.get('/cuentas/tarjetaValida/:numSecretoTarjeta/:numTarjeta/:nombre', cuentasCtrl.getCuenta);
router.get('/cuentas/tieneSaldo/:numSecretoTarjeta/:numTarjeta/:nombre/:coste', cuentasCtrl.getTieneSaldo);
router.put('/cuentas/updateMovimiento', cuentasCtrl.updateMovimiento)

module.exports = router;