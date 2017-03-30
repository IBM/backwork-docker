const Mincer = require('mincer');
const path = require('path');

let environment = new Mincer.Environment(__dirname);

environment.appendPath('assets/javascripts');
environment.appendPath('assets/stylesheets');
environment.appendPath('assets/images');
environment.appendPath('assets/vendor');

//
// Cache compiled assets.
//

environment.cache = new Mincer.FileStore(path.join(__dirname, 'cache'));

//
// Define environment essential *_path helper that will be available in the
// processed assets.
//

environment.ContextClass.defineAssetPath(function (pathname, options) {
  const asset = this.environment.findAsset(pathname, options);

  if (!asset) {
    throw new Error(`File ${pathname} not found`);
  }

  return `/assets/${asset.digestPath}`;
});

environment.enable('autoprefixer');

//
// Prepare production-ready environment
//

if (process.env.NODE_ENV === 'production') {
  //
  // Enable JS and CSS compression
  //

  environment.jsCompressor = 'uglify';
  // (!) use csswring, because csso does not supports sourcemaps
  environment.cssCompressor = 'csswring';

  //
  // In production we assume that assets are not changed between requests,
  // so we use cached version of environment. See API docs for details.
  //

  environment = environment.index;
} else {
  environment.enable('source_maps');
}

//
// Enable inline macros to embed compile-time variables into code,
// instead of using EJS and chaining extentions. Then you can write things like
//
//     const url = "$$ JSON.stringify(asset_path('my_file.js')) $$";
//
// You can set guard regexps as second param. Also you can pass multiple values
// via arrays.
//

Mincer.MacroProcessor.configure(['.js', '.css']/* , true */);

//
// Mincer rebuilt assets on any dependency file change. But sometime result
// depends on external variables: environment type, helper values and so one.
// In this case, you should change environment "version" - place there any
// unique string.
//

const pjson = require('../package.json');
environment.version = pjson.version;

module.exports = environment;
