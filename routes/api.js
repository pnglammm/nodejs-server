const apiController = require('../controllers/apiController');
var express = require('express');
var router = express.Router();

router.get('/', apiController.api)
// user
router.get('/userAPI', apiController.listUserAPI)
router.get('/userAPI/detail/:id', apiController.userDetailAPI)

// product
router.get('/productAPI', apiController.listProductAPI)
router.get('/productAPI/detail/:id', apiController.productDetailAPI)

// register
router.post('/register', apiController.registerAPI)
// login
router.post('/login', apiController.loginAPI)
// logout
router.get('/logout', apiController.logout)

module.exports = router;
