const winston = require('winston');
const mongoose = require('mongoose');
const courseSchema = require('./course_schema');

function Models() {}

Models.prototype.init = (mongoURI) => {
  mongoose.Promise = global.Promise;

  const promise = new Promise((fulfill, reject) => {
    mongoose.connect(mongoURI);

    const db = mongoose.connection;

    db.on('error', winston.error.bind(winston, 'connection error:'));
    db.on('error', (err) => {
      reject(err);
    });

    db.once('open', () => {
      // Load models
      mongoose.model('Course', courseSchema);

      fulfill(db);
    });
  });

  return promise;
};

module.exports = new Models();
