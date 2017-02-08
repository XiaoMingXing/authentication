var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/simple', function (req, res, next) {
    res.json({username: 'username', password: 'password'});
});

module.exports = router;
