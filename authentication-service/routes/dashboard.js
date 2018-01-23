let express = require('express');
let router = express.Router();

let dashboardService = require('../services/dashboardService');


/* GET users listing. */
router.get('/totalPv', function (req, res, next) {
    dashboardService.totalPv(function (err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    })
});

module.exports = router;
