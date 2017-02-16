var users = require('../models/user');
var bcrypt = require('bcrypt');
var WrongUsernameOrPasswordError = require('../errors/WrongUsernameOrPasswordError');

function usernameAndPasswordAuth(user, callback) {
    users.findOne({email: user.email}, function (err, existUser) {

        if (err) return callback(err);

        if (!existUser) return callback(new WrongUsernameOrPasswordError(user.email));

        bcrypt.compare(user.password, existUser.password, function (err, isValid) {
            if (err) {
                callback(err);
            } else if (!isValid) {
                callback(new WrongUsernameOrPasswordError(user.email));
            } else {
                callback(null, {
                    user_id: existUser._id.toString(),
                    nickname: existUser.nickname,
                    email: existUser.email
                });
            }
        });
    });
}

module.exports = {
    usernameAndPasswordAuth: usernameAndPasswordAuth
};