const mongoose = require('mongoose');
const courseSchema = require('./course_schema');

function Models() {}

Models.prototype.init = function (mongoURI) {
  mongoose.Promise = global.Promise;

  return new Promise((resolve, reject) => {
    mongoose.connect(mongoURI);
    mongoose.connection.on('error', err => reject(err));
    mongoose.connection.once('open', () => {
      // Load models
      mongoose.model('Course', courseSchema);

      resolve(mongoose.connection);
    });
  });
};

Models.prototype.terminate = function () {
  return mongoose.disconnect();
};

module.exports = new Models();
