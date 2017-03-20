const repl = require('repl');
const mongoose = require('mongoose');
const config = require('./config');
const models = require('./models');

const replServer = repl.start({
  prompt: 'chell> ',
});

models.init(config.mongoURI)
  .then(() => {
    replServer.context.Course = mongoose.model('Course');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

replServer.context.config = config;
