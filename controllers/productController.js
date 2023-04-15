const productModels = require('../models/productModel');
const cartModel = require('../models/cartModel');
const cartItemModel = require('../models/cartItemModel');
const oderModel = require('../models/oderModel');
const orderItemModel = require('../models/orderItemModel');
var fs = require('fs');
// UPLOAD IMAGE PRODUCT
const path = require("path");
const multer = require('multer')
// =====================================
class siteController {
    productIndex(req, res) {
        fs.readFile('Email.txt', (err, getEmail) => {
            if (err) throw err;
            if (req.session.loggedin & req.session.role == "admin") {
                productModels.find({}).then((data) => {
                    res.render("product/products", {
                        productData: data.map((s) => s.toJSON()),
                        emailCheck: getEmail,
                        loginCheck: true,
                        Manager: true
                    });
                });
            }else if(req.session.loggedin){
                productModels.find({}).then((data) => {
                    res.render("product/products", {
                        productData: data.map((s) => s.toJSON()),
                        emailCheck: getEmail,
                        loginCheck: true,
                    });
                });
            }else{
                res.redirect('/')
            }
        });
    }
    async detailIndex(req, res) {
        try {
            fs.readFile('Email.txt', (err, getEmail) => {
                if (err) throw err;
                if (req.session.loggedin & req.session.role == "admin") {
                    productModels.findById(req.params.id).then(function (docs) {
                        productModels.find({}).limit(4).then((data) => {
                            res.render("product/detail", {
                                data: docs.toJSON(),
                                productData: data.map((s) => s.toJSON()),
                                emailCheck: getEmail,
                                loginCheck: true,
                                Manager: true
                            });
                        });
                    });
                } else if (req.session.loggedin) {
                    productModels.findById(req.params.id).then(function (docs) {
                        productModels.find({}).limit(4).then((data) => {
                            res.render("product/detail", {
                                data: docs.toJSON(),
                                productData: data.map((s) => s.toJSON()),
                                emailCheck: getEmail,
                                loginCheck: true,
                            });
                        });
                    });
                }
            });

        } catch (error) {
            console.log("Lỗi nè: ", error);
        }
    }
}
module.exports = new siteController;