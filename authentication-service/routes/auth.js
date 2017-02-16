var express = require('express');
var router = express.Router();
var authService = require('../services/authService');

/* simple username password authentication. */
router.post('/simple', function (req, res, next) {
    authService.usernameAndPasswordAuth(req.body, function (err, user) {
        if (err) {
            return next(err);
        }
        res.json({data: user});
    });
});
module.exports = router;
