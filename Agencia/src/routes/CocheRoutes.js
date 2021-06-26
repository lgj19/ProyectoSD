const { Router } = require('express')
const router = Router()
const authJwt = require('../middlewares')
const cochesCtrl = require('../controllers/cocheController.js')


router.get('/:colecciones', cochesCtrl.getCoches)
router.put('/:colecciones/:id', cochesCtrl.putCoches)
router.delete('/:colecciones/:id', cochesCtrl.deleteCoches)


module.exports = router;