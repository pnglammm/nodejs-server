var express = require('express');
var router = express.Router();

const registerController = require('../controllers/registerController');

router.get('/', registerController.login);
router.post('/', registerController.register);

//exports
module.exports = router;