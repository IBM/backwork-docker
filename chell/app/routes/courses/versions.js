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
router.post('/', upload.single('version[archiveFile]'), (req, res, next) => {
  const course = req.course;
  const length = course.versions.push(Object.assign({},req.body.version));
  const version = course.versions[length-1];

  if (!req.file) {
    version.invalidate('archiveFile', 'Version archive file is required', null);
  }

  course.validate()
  .then(() => req.app.locals.fileStorage.put(
    version.archiveFilename,
    req.file.buffer)
  )
  .then(() => course.save({ validateBeforeSave: false })) // it's validated
  .then(() => {
    req.flash('success', `Version ${version.major}.${version.minor} successfully added!`);
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
// GET /courses/:courseId/versions/:versionId
router.get('/:versionId', (req, res, next) => {
  const course = req.course;
  const version = course.versions.id(req.params.versionId);

  req.app.locals.fileStorage.get(version.archiveFilename).then((file) => {
    const safeCourseId = version.openEdxId.replace(/[^\w.-]/g, '-');

    res.set({
      'Content-Type': 'application/gzip',
      'Content-Disposition': `attachment; filename="${safeCourseId}.tar.gz"`,
      'Content-Length': file.length
    });

    res.send(file);
  })
  .catch((err) => {
    if (err.code === 'NoSuchKey') {
      const notFound = new Error('Version not found');
      notFound.status = 404;
      next(notFound);
    } else {
      next(err);
    }
  });
});

module.exports = router;
