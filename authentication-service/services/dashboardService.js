let Record = require('../models/record');

function totalPv(callback) {
    Record.collectionName = "user_activities";
    Record.find({}).count(callback);
}

function realTimePv(callback) {
    Record.collection.find({},
        {tailable: true, awaitdata: true, numberOfRetries: -1})
        .each(callback)
}

function listeningMongo(callback) {
    let stream = Record.collection
        .find({}, {tailable: true, awaitdata: true, numberOfRetries: -1})
        .stream();
    stream.on('data', callback);
}

module.exports = {
    totalPv: realTimePv,
    listeningMongo: listeningMongo
};