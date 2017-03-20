'use strict';

const repl = require('repl'),
      mongoose = require('mongoose'),
      config = require('./config'),
      models = require('./models');

let replServer = repl.start({
  prompt: 'chell> '
});

models.init(config.mongoURI)
  .then(function() {
    replServer.context.Course = mongoose.model('Course');
  })
  .catch(function(err) {
  console.error(err);
  process.exit(1);
  });

replServer.context.config = config;
