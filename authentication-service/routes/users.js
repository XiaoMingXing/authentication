var express = require('express');
var router = express.Router();

var userService = require('../services/userService');

/* GET users listing. */
router.post('/register', function (req, res) {
    userService.register(req.body, function (err, user) {
        if (err) {
            res.error(err);
        } else {
            res.json(user);
        }
    })

});

module.exports = router;
