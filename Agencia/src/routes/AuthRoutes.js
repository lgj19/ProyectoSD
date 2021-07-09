const { Router } = require('express')
const router = Router()

const authCtrl = require('../controllers/authController.js')
const authJwt = require('../middlewares/authJwt.js')


router.post('/signup', authCtrl.signUp)
router.post('/signin', authCtrl.signIn)
router.get('/isAdmin',[authJwt.verifyToken, authJwt.isAdmin], authCtrl.isAdmin)


module.exports = router;