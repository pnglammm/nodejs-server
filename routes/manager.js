const managerController = require('../controllers/managerController');
var express = require('express');
var router = express.Router();
const uploadProduct = require('../middleware/uploadProduct');
// manager
router.get('/', managerController.manager)
// manager product
router.get('/product', managerController.product)
router.post('/product', uploadProduct.single('image'), managerController.addProduct)
router.get('/product/add', managerController.addProductIndex)

router.post('/', uploadProduct.single('image'),managerController.updateProduct)
router.get('/product/update/:id', managerController.updateProductIndex)

router.get('/product/delete/:id', managerController.deleteProduct);
// manager user
router.get('/user', managerController.user)
router.post('/user', managerController.updateUser)
router.get('/user/update/:id', managerController.updateUserIndex)
router.get('/user/delete/:id', managerController.deleteUser);
//exports
module.exports = router;