let Record = require('../models/record');

function totalPv(callback) {
    Record.collectionName = "user_activities";
    Record.find({}).count(callback);
}

module.exports = {
    totalPv: totalPv
};