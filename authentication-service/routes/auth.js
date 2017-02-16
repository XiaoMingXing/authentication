var express = require('express');
var router = express.Router();
var authService = require('../services/authService');

/* simple username password authentication. */
router.post('/simple', function (req, res) {
    authService.usernameAndPasswordAuth(req.body, function (err, user) {
        if (err) {
            res.send({status: false, errors: err});
        } else {
            res.json({status: true, data: user});
        }
    });
});
module.exports = router;
