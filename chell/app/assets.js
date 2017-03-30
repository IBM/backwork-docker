const Mincer = require('mincer');
const path = require('path');
const fs = require('fs');
const debug = require('debug')('chell:assets');
const environment = require('./mincer-environment');

const servePath = '/assets';

module.exports.setup = (app) => {
  const helperContext = app.locals;

  function assetHelper(logicalPath, getTag) {
    const asset = environment.findAsset(logicalPath);

    if (!asset) {
      throw new Error(`Asset '${logicalPath}' not found`);
    }

    return getTag(`${servePath}/${asset.digestPath}`);
  }

  helperContext.javascript = logicalPath =>
    assetHelper(logicalPath, url => `<script src="${url}"></script>`);

  helperContext.stylesheet = logicalPath =>
    assetHelper(logicalPath, url => `<link rel="stylesheet" href="${url}" />`);

  helperContext.assetPath = logicalPath =>
    assetHelper(logicalPath, url => url);

  const manifestPath = path.join(__dirname, 'public', 'assets', 'manifest.json');
  let manifest;
  if (fs.existsSync(manifestPath)) {
    debug('manifest.json found, using precompiled assets');
    manifest = new Mincer.Manifest(environment, manifestPath);
  }

  app.use(servePath, Mincer.createServer(environment, manifest));
};
