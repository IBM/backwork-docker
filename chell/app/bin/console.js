const repl = require('repl');
const mongoose = require('mongoose');
const winston = require('winston');
const _ = require('lodash');

const config = require('../config');
const models = require('../models');

const replServer = repl.start({
  prompt: 'chell> ',
});

models.init(config.mongoURI)
  .then(() => {
    replServer.context.Course = mongoose.model('Course');
  })
  .catch((err) => {
    winston.error(err);
    process.exit(1);
  });

replServer.context.config = config;
replServer.context.config = winston;
replServer.context._ = _;
