const { Router } = require('express')
const router = Router()

const authCtrl = require('../controllers/authController.js')


router.post('/signup', authCtrl.signUp)
router.post('/signin', authCtrl.signIn)



module.exports = router;