var express = require('express');
var router = express.Router();

const siteController = require('../controllers/siteController');

router.get('/', siteController.index)
router.get('/', siteController.indexAPI)

router.get('/logout', siteController.logout)

router.get('/index', siteController.index)
router.get('/login', siteController.loginIndex)
router.get('/register', siteController.registerIndex)


//exports
module.exports = router;