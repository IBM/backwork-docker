const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const _ = require('../../../lib/lodash');

const router = express.Router();

function getCoursesFilter(courses) {
  const ignoredAttributes = [
    'long_description',
    'change_log',
    'content_url',
  ];

  return _.map(courses, (course) => {
    let filteredCourses = course.toJSON();

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

// GET /api/courses
router.get('/', (req, res) => {
  const Course = mongoose.model('Course');

  Course.find({}).exec()
    .then((docs) => {
      winston.log(docs);
      res.status(200).send(getCoursesFilter(docs));
    })
    .catch((error) => {
      res.status(500).send({ code: 500, message: error.message });
    });
});

module.exports = router;
