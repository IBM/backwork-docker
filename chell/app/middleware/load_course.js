const _ = require('lodash');
const mongoose = require('mongoose');
const debug = require('debug')('chell:middleware');

function getCourseFilter(course) {
  return _.deeply(_.mapKeys)(course, (v, k) => _.snakeCase(k));
}

function loadCourse(req, res, next) {
  const Course = mongoose.model('Course');

  Course.findById(req.params.courseId).exec()
    .then((doc) => {
      if (!doc) {
        const notFound = new Error('Not Found');
        notFound.status = 404;
        return next(notFound);
      }

      const course = getCourseFilter(doc.toJSON());
      req.course = course; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((err) => {
      debug(err);

      const notFound = new Error('Not Found');
      notFound.status = 404;
      next(notFound);
    });
}

module.exports = loadCourse;
