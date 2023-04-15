var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController');

// home
router.post('/index', loginController.login);
router.get('/', loginController.loginIndex);

//exports
module.exports = router;