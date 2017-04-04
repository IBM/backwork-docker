const express = require('express');
const mongoose = require('mongoose');
const versionsRouter = require('./versions');

const loadCourse = require('../../middleware/load_course');

const router = express.Router();

// GET /courses
router.get('/', (req, res, next) => {
  const Course = mongoose.model('Course');

  Course.find().sort({ name: 1 }).exec().then((courses) => {
    res.render('courses/index', { courses });
  })
  .catch(next);
});

// GET /courses/new
router.get('/new', (req, res) => {
  const Course = mongoose.model('Course');
  const course = new Course();

  res.render('courses/new', { course });
});

// POST /courses
router.post('/', (req, res, next) => {
  const Course = mongoose.model('Course');
  const course = new Course(req.body.course);

  course.save().then(() => {
    req.flash('success', 'Course successfully added!');
    res.redirect('/courses');
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.render('courses/new', { course });
    } else {
      next(err);
    }
  });
});

// GET /courses/:courseId
router.get('/:courseId', loadCourse, (req, res) => {
  res.render('courses/show', { course: req.course });
});

// GET /courses/:courseId/edit
router.get('/:courseId/edit', loadCourse, (req, res) => {
  res.render('courses/edit', { course: req.course, action: 'edit' });
});

// PATCH /courses/:courseId
router.patch('/:courseId', loadCourse, (req, res) => {
  req.course.name = req.body.course.name;
  req.course.shortDescription = req.body.course.shortDescription;
  req.course.longDescription = req.body.course.longDescription;

  req.course.save()
    .then((doc) => {
      req.flash('success', 'Course successfully updated!');
      res.redirect(`/courses/${doc.toJSON().id}`);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.render('courses/edit', { course: req.course, action: 'edit' });
      }
    });
});

router.use('/:courseId/versions', loadCourse, versionsRouter);

module.exports = router;
