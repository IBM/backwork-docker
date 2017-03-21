const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const path = require('path');
const logger = require('morgan');
const winston = require('winston');

const apiRouter = require('./routes/api');

const models = require('./models');

const indexRouter = require('./routes/index');
const coursesRouter = require('./routes/courses');
const versionsRouter = require('./routes/versions');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', apiRouter);

app.use('/', indexRouter);
app.use('/courses', coursesRouter);
app.use('/versions', versionsRouter);

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
