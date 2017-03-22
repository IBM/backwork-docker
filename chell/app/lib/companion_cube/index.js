const util = require('util');
const BasicClient = require('../basic_client');
const Courses = require('./courses');

function CompanionCube(...options) {
  BasicClient.apply(this, options);

  this.courses = new Courses(this);
}

util.inherits(CompanionCube, BasicClient);

module.exports = CompanionCube;
