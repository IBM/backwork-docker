const express = require('express');
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
  const index = course.versions.push(Object.assign({}, req.body.version)) - 1;
  const version = course.versions[index];

  if (!req.file) {
    version.invalidate('archiveFile', 'Version archive file is required', null);
  }

  course.validate()
  .then(() => req.app.locals.fileStorage.put(
    version.archiveFilename,
    req.file.buffer))
  .then(() => course.save({ validateBeforeSave: false })) // it's validated
  .then(() => {
    req.flash('success', `Version ${version.major}.${version.minor} successfully added!`);
    res.redirect(`/courses/${course.id}`);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      // populate version errors
      version.errors = version.errors || {};
      Object.keys(err.errors).forEach((key) => {
        const prefix = `versions.${index}.`;
        if (key.startsWith(prefix)) {
          const newKey = key.replace(prefix, '');
          version.errors[newKey] = err.errors[key];
        }
      });

      res.render('courses/versions/new', { course, version });
    } else {
      next(err);
    }
  });
});

// GET /courses/:courseId/versions/:versionId
router.get('/:versionId', (req, res, next) => {
  const course = req.course;
  const version = course.versions.id(req.params.versionId);

  req.app.locals.fileStorage.get(version.archiveFilename).then((file) => {
    const safeCourseId = version.openEdxId.replace(/[^\w.-]/g, '-');

    res.set({
      'Content-Type': 'application/gzip',
      'Content-Disposition': `attachment; filename="${safeCourseId}.tar.gz"`,
      'Content-Length': file.length,
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
