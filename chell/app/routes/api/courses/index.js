const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');

const router = express.Router();

//
// Filters
// TODO: Factor filters out of here.
//

function getCoursesFilter(courses) {
  const ignoredAttributes = [
    'long_description',
    'change_log',
    'content_url',
  ];

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

//
// Routes
//

// GET /api/courses
router.get('/', (req, res) => {
  const Course = mongoose.model('Course');

  Course.find({}).exec()
    .then((docs) => {
      const courses = _.map(docs, doc => doc.toJSON());
      res.status(200).send(getCoursesFilter(courses));
    })
    .catch(err =>
      res.status(500).send({ code: 500, message: err.message }));
});

// GET /api/courses/:courseId
router.get('/:courseId', (req, res) => {
  const Course = mongoose.model('Course');

  Course.findOne({ _id: req.params.courseId }).exec()
    .then((doc) => {
      const course = doc.toJSON();
      res.status(200).send(getCourseFilter(course));
    })
    .catch(err =>
      res.status(500).send({ code: 500, message: err.message }));
});

module.exports = router;
