const userModels = require('../models/userModel');
const productModels = require('../models/productModel');

class APIController {
    // product API
    listProductAPI(req, res) {
        productModels.find({}).then((product_ar) => {
            res.status(201).json(product_ar)
        });
    }
    // user
    listUserAPI(req, res) {
        userModels.find({}).then((user_ar) => {
            res.status(200).json(user_ar)
        });
    }
    api(req, res) {
        userModels.find({}).then((user_ar) => {
            res.json({
                status: true,
                message: "Welcome to API"
            })
        });
    }
}
module.exports = new APIController;