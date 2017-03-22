function Courses(companionCube) {
  this.url = companionCube.url;
  this.client = companionCube.client;
  this.clientDefaultArgs = companionCube.clientDefaultArgs;
}

// GET /courses
const list = (that, options, cb) => {
  cb(new Error('Not implemented'));
};

// GET /courses/{courseId}
const retrieve = (that, courseId, options, cb) => {
  cb(new Error('Not implemented'));
};

Courses.prototype.get = (courseId, options, cb) => {
  if (typeof courseId === 'function') {
    // Retrieve all courses IDs.
    // Example:
    //   companionCube.courses.get(function(error, resp) {  })
    list(this, courseId);
  } else if (typeof courseId === 'string') {
    // Retrieve specified course.
    // Example:
    //   companionCube.courses.get('john', function(error, resp) {  })
    retrieve(this, courseId, options, cb);
  } else if (typeof courseId === 'object' && courseId) {
    // Retrieve all courses filtered by 'options' ('courseId' argument).
    // Example:
    //   companionCube.courses.get({ param: 'value' }, function(error, resp) {  })
    list(this, courseId, options);
  } else {
    cb('Invalid arguments', null);
  }
};

// POST /courses
Courses.prototype.create = () => new Error('Not implemented');

// PATCH /courses/{courseId}
Courses.prototype.update = () => new Error('Not implemented');

module.exports = Courses;
