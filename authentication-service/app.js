let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let http = require('http');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let db = require('./models/db');

let index = require('./routes/index');
let auth = require('./routes/auth');
let users = require('./routes/users');
let dashboard = require('./routes/dashboard');

let app = express();
app.set('port', process.env.PORT || 8080);

//cros
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let API_PREFIX = '/api/v1';
app.use(API_PREFIX + '/dashboard', index);
app.use(API_PREFIX + '/auth', auth);
app.use(API_PREFIX + '/users', users);
app.use(API_PREFIX + '/app', dashboard);

http.createServer(app).listen(8080, function () {
    console.log('Express server listening on port ' + 8080);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
    // render the error page
    res.status(err.status).send(err.message);
});

module.exports = app;
