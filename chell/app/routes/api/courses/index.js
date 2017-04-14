const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');

const versionsRouter = require('./versions');
const getCollectionFilter = require('../filters').getCollectionFilter;
const getObjectFilter = require('../filters').getObjectFilter;
const loadCourse = require('../../../middleware/load_course');

const router = express.Router();

// GET /api/courses
router.get('/', (req, res) => {
  const Course = mongoose.model('Course');

  Course.find().exec()
    .then((docs) => {
      const courses = getCollectionFilter(_.map(docs, doc => doc.toJSON()));
      res.status(200).json(courses);
    })
    .catch(err =>
      res.status(500).json({ code: 500, message: err.message }));
});

// GET /api/courses/:courseId
router.get('/:courseId', loadCourse, (req, res) => {
  const course = getObjectFilter(req.course.toJSON());
  res.status(200).json(course);
});

// /api/coursers/:courseId/version/*
router.use('/:courseId/versions', loadCourse, versionsRouter);

module.exports = router;
