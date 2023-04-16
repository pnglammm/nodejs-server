const userModels = require('../models/userModel');
const productModels = require('../models/productModel');
var fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class APIController {
    api(req, res) {
        userModels.find({}).then((user_ar) => {
            res.json({
                status: true,
                message: "Welcome to API"
            })
        });
    }
    // user GET
    listUserAPI(req, res) {
        userModels.find({}).then((user_ar) => {
            res.json({
                status: true,
                data: user_ar
            })
        });
    }
    // user GET DETAIL
    userDetailAPI(req, res) {
        userModels.findById(req.params.id).then(function (docs) {
            res.json({
                status: true,
                data: docs
            })
        });
    }
    // user POST

    // product GET
    listProductAPI(req, res) {
        productModels.find({}).then((product_ar) => {
            res.json({
                status: true,
                data: product_ar
            })
        });
    }
    // product POST

    // product GET DETAIL
    productDetailAPI(req, res) {
        productModels.findById(req.params.id).then(function (docs) {
            res.json({
                status: true,
                data: docs
            })
        });
    }
    // login GET
    async loginAPI(req, res) {

        const {
            email,
            password
        } = req.body;

        // Tìm kiếm người dùng với email
        const user = await userModels.findOne({
            email: email
        });
        

        if (!user) {
            return res.status(400).json({
                message: 'Email không tồn tại'
            });
        }
        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Mật khẩu không đúng'
            });
        }

        // Tạo JWT token
        const token = jwt.sign({
            id: user._id
        }, 'secretkey');

        res.json({
            user
        });

        // try {
        //     const data = await userModels.findOne({
        //         email: req.body.email
        //     });
        //     await userModels.findOne({
        //         email: req.body.email
        //     }).then(data => {
        //         if (data) {
        //             if (data.password != null) {
        //                 if (data.password == req.body.password) {
        //                     var manager = data.role;
        //                     console.log(`========= Login success | ${data.role} =========`.cyan.italic.bold);
        //                     req.session.user = data.email;
        //                     req.session._id = data._id
        //                     req.session.loggedin = true;
        //                     req.session.role = manager;
        //                     console.log(`Status user log: `.red.bold + ` [${req.session.loggedin}]`.white.bold);
        //                     console.log(`Email user log:  `.red.bold + `[${req.session.user}]`.white.bold);
        //                     console.log(`ID user log: `.red.bold + `[${req.session._id}]`.white.bold);
        //                     console.log(`Role user log: `.red.bold + `[${req.session.role}]`.white.bold);
        //                     if (manager == "admin") {
        //                         (manager = "Manager");
        //                     } else {
        //                         manager = "";
        //                     }
        //                     const getEmail = req.body.email;
        //                     fs.writeFile('Email.txt', getEmail, err => {
        //                         if (err) throw err;
        //                     });
        //                     res.json({
        //                         status: "Login Success",
        //                         error: false,
        //                         data: data
        //                     })

        //                 } else {
        //                     res.json({
        //                         status: "Error",
        //                         data: "Wrong password"
        //                     })
        //                     console.log(`Wrong password`.red.strikethrough.bold);
        //                 }
        //             } else {
        //                 res.json({
        //                     status: "Error",
        //                     data: "Password null"
        //                 })
        //                 console.log("Password null".red.strikethrough.bold);

        //             }
        //         } else {
        //             res.json({
        //                 status: "Error",
        //                 data: "Wrong Email"
        //             })
        //             console.log("Wrong Email".red.strikethrough.bold);
        //         }
        //     });
        // } catch (err) {
        //     res.json({
        //         status: "Error",
        //         data: "Failed"
        //     })
        //     console.log("Failed".red.strikethrough.bold);
        // }
    }
    // register POST
    async registerAPI(req, res) {
        // const user = new userModels(req.body);
        // try {
        //     await user.save();
        //     res.json({
        //         status: true,
        //         data: req.body
        //     })
        //     console.log(`Register Success`.green.bold);
        // } catch (error) {
        //     res.json({
        //         status: error,
        //         data: "Register Failed"
        //     })
        //     console.log("Register Failed".red.bold);
        // }
        const {
            fname,
            lname,
            email,
            password,
            address,
            phone,
            role
        } = req.body;

        // Kiểm tra xem người dùng đã tồn tại chưa
        const user = await userModels.findOne({
            email: email
        });

        if (user) {
            return res.status(400).json({
                message: 'Người dùng đã tồn tại'
            });
        }

        // Tạo người dùng mới
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModels({
            fname,
            lname,
            email,
            password: hashedPassword,
            address,
            phone,
            role
        });

        await newUser.save();

        res.json({
            message: 'Đăng ký thành công'
        });
    }
    // logout GET
    async logout(req, res) {
        if (req.session.loggedin) {
            req.session.destroy();
            fs.writeFile('Email.txt', "", err => {
                if (err) throw err;
            });
            // redirect to homepage
            res.json({
                status: "Logout Success"
            })
        } else {
            res.json({
                status: "FAIL",
                message: "You are not logged"
            })
        }


    }
}
module.exports = new APIController;