'use strict';

const util = require('util'),
      BasicClient = require('../basic_client'),
      Courses = require('./courses');

function CompanionCube(options) {
  BasicClient.apply(this, arguments);

  this.courses = new Courses(this);
}

util.inherits(CompanionCube, BasicClient);

module.exports = CompanionCube;
