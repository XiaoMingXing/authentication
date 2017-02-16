var bcrypt = require('bcrypt');

var User = require('../models/user');
var UserAlreadyExistError = require('../errors/UserAlreadyExistError');

function register(user, callback) {
    var userSchema = new User(user);
    userSchema.findByEmail()
        .then(function (result) {
            if (result) {
                callback(new UserAlreadyExistError())
            }
        })
        .then(function () {
            return bcrypt.hash(user.password, 5);
        })
        .then(function (hash) {
            userSchema
                .setPassword(hash)
                .save(callback)
        });
}

module.exports = {
    register: register
};