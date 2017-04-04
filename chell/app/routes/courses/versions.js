const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


// GET /courses/new
router.get('/new', (req, res) => {
  const course = req.course;
  const version = {};

  res.render('courses/versions/new', { course, version });
});

// POST /courses
router.post('/', upload.single('version[courseFile]'), (req, res, next) => {
  const course = req.course;
  const length = course.versions.push(Object.assign({},req.body.version));
  const version = course.versions[length-1];

  course.save().then(() => {
    req.flash('success', 'Version successfully added!');
    res.redirect(`/courses/${course.id}`);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {

      // populate version errors
      const prefix = `versions.${length-1}.`;

      version.errors = Object.keys(err.errors)
      .filter(key => key.startsWith(prefix))
      .reduce((acc, key) => {
        const newKey = key.replace(prefix, '');
        acc[newKey] = err.errors[key];
        return acc;
      }, {});

      res.render('courses/versions/new', { course, version });
    } else {
      next(err);
    }
  });
});

// // POST /versions
// router.post('/', upload.single('courseFile'), (req, res) => {
//   console.log('----');
//   console.log(req.file);
//   console.log('----');
//   res.status(201).send({ message: 'Course uploaded.' });
// });

module.exports = router;
