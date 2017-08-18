
var express       =   require('express');
var session       =   require('express-session');
var path          =   require('path');
var favicon       =   require('serve-favicon');
var logger        =   require('morgan');
var cookieParser  =   require('cookie-parser');
var bodyParser    =   require('body-parser');
var mongoose      =   require('mongoose');
var cors          =   require('cors');
var log           =   require('loglevel');
var livereload    =   require("connect-livereload");

/**
* enable rootpath
*/

require('rootpath')();
require('dotenv').config(); // for using .env file by process.env.var...

var routes =  require('config/router'); // This is routes instance for all routing

/**
* getting config var
*/

var config = require('config/initialize/config');

/**
* getting env vars for several server envrionment...
*/

var env_config = "";
switch (process.env.NODE_ENV) {
    case "development":
        env_config = require('config/env/development');
        break;
    case "staging":
        env_config = require('config/env/staging');
        break;
    case "production":
        env_config = require('config/env/production');
        break;
} 

var app = express();
log.warn("----->Sever envrionment is ...", process.env.NODE_ENV);

// /**
// * initialize session
// */

app.use(session({ secret: 'SessionSecret' }));
app.use(livereload())



/**
* set log level here...
*/

log.setLevel(env_config.logLevel);
log.warn("----->Log level is ...", env_config.logLevel);

/**
* Database connect
*/
mongoose.connect(env_config.db);
log.warn("----->Database connected successfully..." + env_config.db);


/**
* enable CORS for every request...
*/

app.use(cors());
app.options('/api/', cors());


/**
* view engine setup
*/

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');


/**
* uncomment after placing your favicon in /public
* app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
*/

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
* call for routes setting...
*/

routes.setup(app);

/** 
* catch 404 and forward to error handler
*/

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/**
* error handlers
* development error handler
* will print stacktrace
*/

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


/** 
* production error handler
* nostacktraces leaked to user
*/

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
