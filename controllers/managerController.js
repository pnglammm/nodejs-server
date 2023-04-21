const userModels = require('../models/userModel');
const productModels = require('../models/productModel');
const cloudinary = require('../middleware/cloudinary');
require('colors')
var fs = require('fs');
const path = require('path');

class ManagerController {
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

    async deleteProduct(req, res) {
        try {
            const u = await productModels.findByIdAndDelete(req.params.id, req.body);
            if (!u) {
                res.send("No have this product!");
            } else {
                await cloudinary.uploader.destroy(u.cloudinary_id)
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
        // const data = new productModels(req.body);
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "imagesProduct"
            });
            const data = new productModels({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: result.secure_url,
                cloudinary_id: result.public_id,
            });
            // console.log(`${result.secure_url}`.bgGreen.white);
            // console.log(`${result.public_id}`.bgGreen.white);
            try {
                await data.save();
                res.redirect("/manager/product")
                console.log(`Add Product Successfully`.bgGreen.white);
            } catch (error) {
                res.status(500).render(error);
                console.log("Add product Failed", error);
            }
        } catch (error) {
            console.log(`ERRORR: ${error}`.bgRed.white);
        }
    }

    async updateProduct(req, res) {
        try {
            let product = await productModels.findById(req.body.id);

            await cloudinary.uploader.destroy(product.cloudinary_id);

            if (req.file != null) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "imagesProduct"
                });
                const data = {
                    name: req.body.name || product.name,
                    description: req.body.description || product.description,
                    price: req.body.price || product.price,
                    image: result.secure_url || product.image,
                    cloudinary_id: result.public_id || product.cloudinary_id,
                }
                await productModels.findByIdAndUpdate(req.body.id, data, {
                        new: true
                    })
                    .then(doc => {
                        res.redirect("/manager/product")
                    })
                    .catch(err => {
                        console.log(`Lỗi catch: `.bgRed, err);
                    });
            } else {
                const data = {
                    name: req.body.name || product.name,
                    description: req.body.description || product.description,
                    price: req.body.price || product.price,
                }
                await productModels.findByIdAndUpdate(req.body.id, data, {
                        new: true
                    })
                    .then(doc => {
                        res.redirect("/manager/product");
                    })
                    .catch(err => {
                        console.log(`Lỗi else: `.bgRed, err);
                    });
            }
            console.log(`Update Product Successfully`.bgGreen.white);
        } catch (error) {
            console.log(`Lỗi try: `.bgRed, error);
        }
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
module.exports = new ManagerController;