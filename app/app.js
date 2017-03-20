const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const path = require('path');
const logger = require('morgan');

const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;

const api = require('./routes/api');

const models = require('./models');

const index = require('./routes/index');
const courses = require('./routes/courses');
const versions = require('./routes/versions');

const config = require('./config');

models.init(config.mongoURI).catch((err) => {
  console.error(err);
  process.exit(1);
});

passport.use(new Strategy((username, password, cb) => {
  if (username === config.auth.accessKey && password === config.auth.secretKey) {
    cb(null, { user: true });
  } else {
    const error = new Error('Unauthorized');
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
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  if (req.app.get('env') === 'development') {
    console.log(err);
  }

  res.status(err.status || 500).send({
    code: err.code,
    message: err.message || 'Internal Server Error',
    description: err.description,
    stack: req.app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
