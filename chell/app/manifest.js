#!/usr/bin/env node

const Mincer = require('mincer');
const path = require('path');

const environment = require('./mincer-environment');

// Create and compile Manifest
const manifest = new Mincer.Manifest(environment, path.join(__dirname, 'public', 'assets'));
const isProduction = process.env.NODE_ENV === 'production';
const files = [
  (logicalPath, filename) => {
    const ext = path.extname(logicalPath);
    return /app\/assets/.test(filename) && !['.js', '.css'].includes(ext);
  },
  /^app\.(css|js)$/,
  /\.(?:eot|svg|ttf|woff2?)$/, // fonts
];

try {
  const assetsData = manifest.compile(files, {
    compress: true,
    sourceMaps: !isProduction,
    embedMappingComments: !isProduction,
  });

  /* eslint-disable no-console */
  console.info(`\n\nAssets were successfully compiled.
               Manifest data (a proper JSON) was written to:
               ${manifest.path}\n\n`);
  console.dir(assetsData);
} catch (err) {
  console.error(`Failed compile assets: ${err.message || err.toString()}`);
  process.exit(1);
}
