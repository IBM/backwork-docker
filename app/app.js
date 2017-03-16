'use strict';

const express = require('express'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),

      path = require('path'),
      logger = require('morgan'),

      passport = require('passport'),
      Strategy = require('passport-http').BasicStrategy,

      api = require('./routes/api'),

      models = require('./models'),

      index = require('./routes/index'),
      courses = require('./routes/courses'),
      versions = require('./routes/versions'),

      config = require('./config');

models.init(config.mongoURI);

passport.use(new Strategy(function(username, password, cb) {
  if (username === config.auth.accessKey && password === config.auth.secretKey) {
    cb(null, { user: true });
  } else {
    let error = new Error('Unauthorized');
    error.status = 401;
    cb(error, false);
  }
}));

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(passport.initialize());
app.use(logger('[:date[iso]] :method :url :status :res[content-length] (:response-time ms)'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', passport.authenticate('basic', { session: false }), api);

app.use('/', index);
app.use('/courses', courses);
app.use('/versions', versions);

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

module.exports = app;
