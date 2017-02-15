var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/simple', function (req, res, next) {
    res.json({data: req.body, status: true});
});

module.exports = router;
