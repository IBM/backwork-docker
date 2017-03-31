const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('express-flash');
const passport = require('passport');
const mongoose = require('mongoose');

const path = require('path');
const logger = require('morgan');
const debug = require('debug')('chell:app');

const FileStorage = require('./lib/file_storage');

const models = require('./models');

const apiRouter = require('./routes/api');
const router = require('./routes');

const config = require('./config');
const assets = require('./assets');

models.init(config.mongoURI)
  .then(debug)
  .catch((err) => {
    debug(err);
    process.exit(1);
  });

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.basedir = app.get('views');

app.use(logger('[:date[iso]] :method :url :status :res[content-length] (:response-time ms)'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(config.cookieSecret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sess = {
  name: 'sid',
  secret: config.cookieSecret,
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    touchAfter: config.session.touchAfterSeconds,
  }),
  cookie: {
    httpOnly: true,
    maxAge: config.session.maxAge,
  },
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
app.use(session(sess));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
assets.setup(app);

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
// `next` is mandatory for this middleware to be considered an error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (req.app.get('env') === 'development') {
    debug(err);
  }

  res.status(err.status || 500).send({
    code: err.code,
    message: err.message || 'Internal Server Error',
    description: err.description,
    stack: req.app.get('env') === 'development' ? err : {},
  });
});

app.locals.fileStorage = new FileStorage(config.fileStorage);

module.exports = app;
