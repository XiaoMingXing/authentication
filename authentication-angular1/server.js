var express = require('express');
var server = express();
//var path = require('path');
var port = process.env.EXPRESS_PORT || 9001;
server.use(express.static(__dirname + '/app'));
server.listen(port);
console.log('Listening on port', port);
