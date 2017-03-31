const express = require('express');
const mongoose = require('mongoose');

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

// GET /courses/:courseId[.:format]
router.get('/', (req, res) => {
  res.status(501).send({ message: 'Not Implemented' });
});

// POST /courses ?

module.exports = router;
