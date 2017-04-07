const express = require('express');
const _ = require('lodash');
const debug = require('debug')('chell:api');

const router = express.Router();

function loadVersion(req, res, next) {
  const version = _.find(req.course.versions, v =>
    v.id === req.params.versionId);

  if (!version) {
    debug(`Version '${req.params.versionId}' not found in course '${req.course.id}'`);

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

    'application/x-gzip': () => {
      req.app.locals.fileStorage.get(req.version.archiveFilename)
        .then(file => res.send(file))
        .catch(err => next(err));
    },

    default: () => {
      const badRequest = new Error('Invalid format');
      badRequest.status = 400;
      next(badRequest);
    },
  });
});

module.exports = router;
