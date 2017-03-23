const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');

const path = require('path');
const logger = require('morgan');
const winston = require('winston');

const apiRouter = require('./routes/api');
const router = require('./routes');

const mongoose = require('mongoose');
const models = require('./models');

const config = require('./config');

models.init(config.mongoURI)
  .then(winston.log)
  .catch((err) => {
    winston.error(err);
    process.exit(1);
  });

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('[:date[iso]] :method :url :status :res[content-length] (:response-time ms)'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(config.cookieSecret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sess = {
  name: 'sid',
  secret: config.cookieSecret,
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    touchAfter: config.session.touchAfterSeconds
  }),
  cookie: {
    httpOnly: true,
    maxAge: config.session.maxAge
  }
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));

// Routes
app.use('/api', apiRouter);
app.use(router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  if (req.app.get('env') === 'development') {
    winston.error(err);
  }

  res.status(err.status || 500).send({
    code: err.code,
    message: err.message || 'Internal Server Error',
    description: err.description,
    stack: req.app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
