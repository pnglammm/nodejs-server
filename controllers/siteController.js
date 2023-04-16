const userModels = require('../models/userModel');
const productModels = require('../models/productModel');
var fs = require('fs');
class siteController {
    index(req, res) {
        fs.readFile('Email.txt', (err, getEmail) => {
            if (err) throw err;

            if (req.session.loggedin) {
                productModels.find({}).limit(9).then((data) => {
                    res.render("index", {
                        productData: data.map((s) => s.toJSON()),
                        emailCheck: getEmail,
                        loginCheck: true,
                        Manager: true
                    });
                });
            } else {
                res.render('login')
            }
        });
    }
    registerIndex(req, res) {
        fs.readFile('Email.txt', (err, getEmail) => {
            if (err) throw err;

            if (req.session.loggedin) {
                res.redirect("/index");
            } else {
                res.render('register')
            }
        });

    }

    loginIndex(req, res) {
        res.render('login')
    }
    logout(req, res) {
        // destroy session data
        // req.session.loggedin = false;
        req.session.destroy();
        fs.writeFile('Email.txt', "", err => {
            if (err) throw err;
        });
        // redirect to homepage
        res.redirect('/login')
    }
}
module.exports = new siteController;