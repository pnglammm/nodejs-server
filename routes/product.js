var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.productIndex)
router.get('/detail/:id', productController.detailIndex)
router.post('/', productController.productSearch)

//exports
module.exports = router;