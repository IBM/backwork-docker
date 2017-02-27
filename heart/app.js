'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var passport = require('passport'),
    Strategy = require('passport-http').BasicStrategy;

var index = require('./routes/index'),
    courses = require('./routes/courses');

const config = require('/.config');

let CompanionCube = require('./lib/companion_cube');

passport.use(new Strategy(function(username, password, cb) {
  if (username === config.auth.accessKey && password === config.auth.secretKey) {
    cb(null, { user: true });
  } else {
    let error = new Error('Unauthorized');
    error.status = 401;
    cb(error, false);
  }
}));

var app = express();

app.use(passport.initialize());
app.use(passport.authenticate('basic', { session: false }));
app.use(logger('[:date[iso]] :method :url :status :res[content-length] (:response-time ms)'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/', index);
app.use('/courses', courses);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if (req.app.get('env') === 'development') {
    console.log(err);
  }

  res.status(err.status || 500).send({
    code: err.code,
    message: err.message || 'Internal Server Error',
    description: err.description,
    stack: req.app.get('env') === 'development' ? err : {}
  });
});

app.local.companionCube = new CompanionCube(config.companionCube);

module.exports = app;
