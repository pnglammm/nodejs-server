const userModels = require('../models/userModel');
require('colors')

class registerController {
    login(req, res) {
        res.render('login')
    }
    async register(req, res) {
        const s_dangky = new userModels(req.body);
        try {
            await s_dangky.save();
            res.render("login");
            console.log("Register Success!");
        } catch (error) {
            res.status(500).render(error);
            console.log("Register Failed", error);
        }
    }
}
module.exports = new registerController;