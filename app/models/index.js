'use strict';

const mongoose = require('mongoose');

function models() {}

models.prototype.init = function(mongoURI) {
  mongoose.connect(mongoURI);

  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    require('./course');
    require('./version');
  });
};

module.exports = models;
