const userModels = require('../models/userModel');
const productModels = require('../models/productModel');
var fs = require('fs');
const { log } = require('console');

class siteController {
    manager(req, res) {
        fs.readFile('Email.txt', (err, getEmail) => {
            if (err) throw err;

            if (req.session.loggedin & req.session.role == "admin") {
                res.render("manager/manager", {
                    emailCheck: getEmail,
                    loginCheck: true,
                    Manager: true
                });
            } else if (req.session.loggedin & req.session.role == "user") {
                res.redirect('/index')
            } else {
                res.redirect('/login')
            }
        });
    }
    // product
    product(req, res) {
        fs.readFile('Email.txt', (err, getEmail) => {
            if (err) throw err;

            if (req.session.loggedin & req.session.role == "admin") {
                productModels.find({}).then((data) => {
                    res.render("manager/product/list", {
                        productData: data.map((s) => s.toJSON()),
                        emailCheck: getEmail,
                        loginCheck: true,
                        Manager: true,
                    });
                });
            } else if (req.session.loggedin & req.session.role == "client") {
                res.redirect('/index')
            } else {
                res.redirect('/login')
            }
        });
    }
    // product API
    listProductAPI(req,res){
        productModels.find({}).then((product_ar) => {
            res.status(201).json(product_ar)
        });
    }
    async deleteProduct(req, res) {
        try {
            const u = await productModels.findByIdAndDelete(req.params.id, req.body);
            if (!u) {
                res.send("No have this product!");
            } else {
                res.redirect('/manager/product');
                console.log("Delete product Success!")
            }
        } catch (error) {
            res.status(500).render(error);
            console.log("Delete product Fail! ", error);
        }
    }
    addProductIndex(req, res) {
        fs.readFile('Email.txt', (err, getEmail) => {
            if (err) throw err;

            if (req.session.loggedin & req.session.role == "admin") {
                res.render("manager/product/add", {
                    emailCheck: getEmail,
                    loginCheck: true,
                    Manager: true
                });
            } else if (req.session.loggedin & req.session.role == "client") {
                res.redirect('/index')
            } else {
                res.redirect('/login')
            }
        });
    }
    async addProduct(req, res) {
        const data = new productModels(req.body);
        if (req.file) {
            data.image = req.file.filename;
        }
        try {
            await data.save();
            res.redirect("/manager/product")
            console.log("Add product Success!");
        } catch (error) {
            res.status(500).render(error);
            console.log("Add product Failed", error);
        }
    }
    async updateProduct(req, res) {
        const id = req.body.id;
        console.log(id);
        const update = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        };
        const options = {
            new: true
        };
        productModels.findByIdAndUpdate(id, update, options)
            .then(doc => {
                res.redirect("/manager/product")
            })
            .catch(err => {
                console.log("Lỗi nè: ", err);
            });
        // res.render("manager/product/update");
    }
    async updateProductIndex(req, res) {
        try {
            fs.readFile('Email.txt', (errr, getEmail) => {
                if (errr) throw errr;

                if (req.session.loggedin & req.session.role == "admin") {
                    productModels.findById(req.params.id).then(function (docs) {
                        res.render("manager/product/update", {
                            data: docs.toJSON(),
                            emailCheck: getEmail,
                            loginCheck: true,
                            Manager: true
                        });
                    });
                } else if (req.session.loggedin & req.session.role == "client") {
                    res.redirect('/index')
                } else {
                    res.redirect('/login')
                }
            });
        } catch (error) {
            console.log("Lỗi nè: ", error);
        }
    }
    // user
    listUserAPI(req,res){
        userModels.find({}).then((user_ar) => {
            res.status(200).json(user_ar)
        });
    }
    user(req, res) {
        fs.readFile('Email.txt', (err, getEmail) => {
            if (err) throw err;

            if (req.session.loggedin & req.session.role == "admin") {
                userModels.find({}).then((user_ar) => {
                    res.render("manager/user/list", {
                        userData: user_ar.map((s) => s.toJSON()),
                        emailCheck: getEmail,
                        loginCheck: true,
                        Manager: true,
                    });
                });
            } else if (req.session.loggedin & req.session.role == "client") {
                res.redirect('/index')
            } else {
                res.redirect('/login')
            }
        });
    }
    async deleteUser(req, res) {
        try {
            const u = await userModels.findByIdAndDelete(req.params.id, req.body);
            if (!u) {
                res.send("No have this user!");
            } else {
                res.redirect('/manager/user');
                console.log("Delete User Success!")
            }
        } catch (error) {
            res.status(500).render(error);
            console.log("Delete User Fail! ", error);
        }
    }
    // Update user then go to /manager/user
    async updateUser(req, res) {
        const id = req.body.id;
        const update = req.body;
        const options = {
            new: true
        };
        userModels.findByIdAndUpdate(id, update, options)
            .then(doc => {
                res.redirect("/manager/user");
            })
            .catch(err => {
                console.log("Lỗi nè: ", err);
            });
    }
    //Placehold data on input and load page
    async updateUserIndex(req, res) {
        try {
            fs.readFile('Email.txt', (err, getEmail) => {
                if (err) throw err;

                if (req.session.loggedin & req.session.role == "admin") {
                    userModels.findById(req.params.id).then(function (user_ar) {
                        res.render("manager/user/update", {
                            data: user_ar.toJSON(),
                            emailCheck: getEmail,
                            loginCheck: true,
                            Manager: true
                        });
                    });
                } else if (req.session.loggedin & req.session.role == "client") {
                    res.redirect('/index')
                } else {
                    res.redirect('/login')
                }
            });
        } catch (error) {
            console.log("Lỗi nè: ", error);
        }
    }
}
module.exports = new siteController;