const _ = require('lodash');
const mongoose = require('mongoose');

function getCourseFilter(course) {
  return _.deeply(_.mapKeys)(course, (v, k) => _.snakeCase(k));
}

function loadCourse(req, res, next) {
  const Course = mongoose.model('Course');

  Course.findById(req.params.courseId).exec()
    .then((doc) => {
      if (!doc) {
        throw new Error(`Course with id: ${req.params.courseId} not found`);
      }
      const course = getCourseFilter(doc.toJSON());
      req.course = course; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(next);
}

module.exports = loadCourse;
