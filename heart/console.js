'use strict';

const repl = require('repl'),
      url = require('url');

let replServer = repl.start({
  prompt: 'heart> '
});

const config = require('./config'),
      CompanionCube = require('./lib/companion_cube');

replServer.context.config = config;

replServer.context.companionCube = new CompanionCube(config.companionCube);
