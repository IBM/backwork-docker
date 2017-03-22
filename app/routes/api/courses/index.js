const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const _ = require('../../../lib/lodash');

const router = express.Router();

function getCoursesFilter(courses) {
  return _.map(courses, course =>
    // Snake case keys
    // NOTE: This will convert `_id` to `id`.
    _.deeply(_.mapKeys)(course.toJSON(), (v, k) => _.snakeCase(k)));
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
