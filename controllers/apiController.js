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
    }
    // register POST
    async registerAPI(req, res) {
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