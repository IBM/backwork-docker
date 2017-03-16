'use strict';

const repl = require('repl'),
      url = require('url');

let replServer = repl.start({
  prompt: 'chell> '
});

const config = require('./config'),
      models = require('./models');

replServer.context.config = config;
replServer.context.models = models;
