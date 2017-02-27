'use strict';

const repl = require('repl'),
      url = require('url');

let replServer = repl.start({
  prompt: 'heart> '
});

const config = require('./config');

replServer.context.config = config;
