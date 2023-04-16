const userModels = require('../models/userModel');
const productModels = require('../models/productModel');
var fs = require('fs');
const {
    log
} = require('console');

class loginController {
    loginIndex(req, res) {
        res.render('login')
    }
    async login(req, res) {
        try {
            const check = await userModels.findOne({
                email: req.body.email
            });
            await userModels.findOne({
                email: req.body.email
            }).then(data => {
                if (data) {
                    if (check.password != null) {
                        if (check.password == req.body.password) {
                            var manager = check.role;
                            console.log(`========= Login success | ${check.role} =========`.cyan.italic.bold);
                            req.session.user = check.email;
                            req.session._id = check._id
                            req.session.loggedin = true;
                            console.log(`Status user log: `.red.bold + ` [${req.session.loggedin}]`.white.bold);
                            console.log(`Email user log:  `.red.bold + `[${req.session.user}]`.white.bold);
                            console.log(`ID user log: `.red.bold + `[${req.session._id}]`.white.bold);
                            req.session.role = manager;
                            if (manager == "admin") {
                                (manager = "Manager");
                            } else {
                                manager = "";
                            }
                            const getEmail = req.body.email;
                            fs.writeFile('Email.txt', getEmail, err => {
                                if (err) throw err;
                            });
                            if (req.session.role == "admin") {
                                productModels.find({}).limit(9).then((data) => {
                                    res.render("index", {
                                        productData: data.map((s) => s.toJSON()),
                                        emailCheck: req.body.email,
                                        loginCheck: true,
                                        Manager: true
                                    });
                                });
                            } else if (req.session.role == "client") {
                                productModels.find({}).limit(9).then((data) => {
                                    res.render("index", {
                                        productData: data.map((s) => s.toJSON()),
                                        emailCheck: req.body.email,
                                        loginCheck: true,
                                    });
                                });
                            }
                        } else {
                            res.send("Wrong password");
                            console.log(`Wrong password`.red.strikethrough.bold);
                        }
                    } else {
                        console.log("Password null".red.strikethrough.bold);
                    }
                } else {
                    res.send("Wrong Email");
                    // console.log(req.body);
                }
            });
        } catch (err) {
            console.log("Failed ", err);
        }
    }
}
module.exports = new loginController;