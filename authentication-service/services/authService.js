var users = require('../models/user');
var UsernameOrPasswordInvalidError = require('../errors').UsernameOrPasswordInvalidError;
var bcrypt = require('bcrypt');

function usernameAndPasswordAuth(user, callback) {
    users.findOne({email: user.email}, function (err, existUser) {

        if (err) return callback(err);

        if (!existUser) return callback(new Error(user.email + ": is already exist!"));

        bcrypt.compare(user.password, existUser.password, function (err, isValid) {
            if (err) {
                callback(err);
            } else if (!isValid) {
                callback(new UsernameOrPasswordInvalidError());
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