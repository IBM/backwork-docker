'use strict';

const mongoose = require('mongoose');

function Models() {}

Models.prototype.init = function(mongoURI) {
  return new Promise(function(fulfill, reject) {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoURI);

    let db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.on('error', function(err) {
      reject(err);
    });

    db.once('open', function() {
      require('./course');
      fulfill();
    });
  });
};

module.exports = new Models();
