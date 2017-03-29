const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const debug = require('debug')('chell:api');

const versionsRouter = require('./versions');

const router = express.Router();

//
// Filters
// TODO: Factor filters out of here.
//

function getCoursesFilter(courses) {
  const ignoredAttributes = ['change_log', 'long_description'];

  return _.map(courses, (course) => {
    let filteredCourses = course;

    // Snake case keys
    // NOTE: This will convert `_id` to `id`.
    filteredCourses = _.deeply(_.mapKeys)(filteredCourses, (v, k) =>
      _.snakeCase(k));

    // Drop ignored attributes
    filteredCourses = _.deeply(_.omitBy)(filteredCourses, (v, k) =>
      ignoredAttributes.includes(k));

    return filteredCourses;
  });
}

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

//
// Routes
//

// GET /api/courses
router.get('/', (req, res) => {
  const Course = mongoose.model('Course');

  Course.find().exec()
    .then((docs) => {
      const courses = getCoursesFilter(_.map(docs, doc => doc.toJSON()));
      res.status(200).json(courses);
    })
    .catch(err =>
      res.status(500).json({ code: 500, message: err.message }));
});

// GET /api/courses/:courseId
router.get('/:courseId', loadCourse, (req, res) => {
  res.status(200).json(req.course);
});

// /api/coursers/:courseId/version/*
router.use('/:courseId/versions', loadCourse, versionsRouter);

module.exports = router;
