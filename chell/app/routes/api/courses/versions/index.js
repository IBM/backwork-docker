const express = require('express');
const _ = require('lodash');

const getCollectionFilter = require('../../filters').getCollectionFilter;
const getObjectFilter = require('../../filters').getObjectFilter;
const loadVersion = require('../../../../middleware/load_version');

const router = express.Router();

// GET /api/courses/:courseId/versions
router.get('/', (req, res) => {
  const versions = _.map(req.course.versions, doc => doc.toJSON());
  res.status(200).json(getCollectionFilter(versions));
});

// GET /api/courses/:courseId/versions/:versionId
router.get('/:versionId', loadVersion, (req, res, next) => {
  res.status(200);

  res.format({
    json: () => res.json(getObjectFilter(req.version.toJSON())),

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
