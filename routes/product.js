var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.productIndex)
router.get('/detail/:id', productController.detailIndex)

//exports
module.exports = router;