const mongoose = require('mongoose');

function loadCourse(req, res, next) {
  const Course = mongoose.model('Course');

  Course.findById(req.params.courseId).exec()
    .then((course) => {
      if (!course) {
        throw new Error(`Course with id: ${req.params.courseId} not found`);
      }
      req.course = course; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(next);
}

module.exports = loadCourse;
