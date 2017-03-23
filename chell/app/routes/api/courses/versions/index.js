const express = require('express');
const _ = require('lodash');

const router = express.Router();

function loadVersion(req, res, next) {
  const version = _.find(req.course.versions, v =>
    v.id === req.params.versionId);

  if (!version) {
    const notFound = new Error('Not Found');
    notFound.status = 404;
    return next(notFound);
  }

  req.version = version; // eslint-disable-line no-param-reassign
  return next();
}

// GET /api/courses/:courseId/versions
router.get('/', (req, res) => {
  res.status(200).json(req.course.versions);
});

// GET /api/courses/:courseId/versions/:versionId
router.get('/:versionId', loadVersion, (req, res, next) => {
  res.status(200);

  res.format({
    json: () => res.json(req.version),

    'application/x-gzip': () => res.send('data'),

    default: () => {
      const badRequest = new Error('Invalid format');
      badRequest.status = 400;
      next(badRequest);
    },
  });
});

module.exports = router;
