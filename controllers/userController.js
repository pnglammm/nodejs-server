const userModels = require('../models/userModel');
var fs = require('fs');

class userController {
    userIndex(req, res) {
        fs.readFile('Email.txt', (err, getEmail) => {
            if (err) throw err;

            if (req.session.loggedin) {
                res.render('user/user', {
                    emailCheck: getEmail,
                    loginCheck: true,
                    Manager: true
                });
            } {
                res.redirect('/login')
            }
        });
    }
}
module.exports = new userController;