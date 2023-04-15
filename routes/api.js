const apiController = require('../controllers/apiController');
var express = require('express');
var router = express.Router();

router.get('/userAPI', apiController.listUserAPI)
router.get('/productAPI', apiController.listProductAPI)
router.get('/', apiController.api)

module.exports = router;
