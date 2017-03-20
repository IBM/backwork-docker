const mongoose = require('mongoose');

const Models = () => {};

Models.prototype.init = (mongoURI) => {
  Promise((fulfill, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoURI);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.on('error', (err) => {
      reject(err);
    });

    db.once('open', () => {
      require('./course');
      fulfill();
    });
  });
};

module.exports = new Models();
