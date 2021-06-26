const { Router } = require('express')
const router = Router()

const agenciaCtrl = require('../controllers/agenciaController.js')


router.get('/', agenciaCtrl.saludoInicio)


module.exports = router;