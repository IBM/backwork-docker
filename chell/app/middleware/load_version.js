const _ = require('lodash');
const debug = require('debug')('chell:middleware');

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

module.exports = loadVersion;
