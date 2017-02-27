'use strict';

function Courses(companionCube) {
  this.url = companionCube.url;
  this.client = companionCube.client;
  this.clientDefaultArgs = companionCube.clientDefaultArgs;
}

// GET /courses
let _list = function(that, options, cb) {
};

// GET /courses/{courseId}
let _retrieve = function(that, courseId, options, cb) {
};

Courses.prototype.get = function(courseId, options, cb) {
  if (typeof courseId === 'function') {
    // Retrieve all courses IDs.
    // Example:
    //   companionCube.courses.get(function(error, resp) {  })
    _list(this, courseId);

  } else if (typeof courseId === 'string') {
    // Retrieve specified course.
    // Example:
    //   companionCube.courses.get('john', function(error, resp) {  })
    _retrieve(this, courseId, options, cb);

  } else if (typeof courseId === 'object' && courseId) {
    // Retrieve all courses filtered by 'options' ('courseId' argument).
    // Example:
    //   companionCube.courses.get({ param: 'value' }, function(error, resp) {  })
    _list(this, courseId, options);

  } else {
    cb('Invalid arguments', null);
  }
};

// POST /courses
Courses.prototype.create = function() {};

// PATCH /courses/{courseId}
Courses.prototype.update = function() {};

module.exports = Courses;
