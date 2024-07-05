const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

//requires authorization for getting user data and using add to cart functionality
router.get('/infor', auth, userCtrl.getUser)

router.patch('/addcart', auth, userCtrl.addCart)

// verify Token
router.get('/verify', userCtrl.verifiedToken);

module.exports = router