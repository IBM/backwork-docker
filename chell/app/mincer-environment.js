module.exports = function(app) {
  const Mincer = require('mincer');
  const path = require('path');

  let environment = new Mincer.Environment(__dirname);
  environment.enable('source_maps');
  environment.appendPath('assets/javascripts');
  environment.appendPath('assets/stylesheets');
  environment.appendPath('assets/images');
  environment.appendPath('../node_modules');
  environment.appendPath('vendor');

  //
  // Cache compiled assets.
  //
  // You want this to be enabled on your dev/staging/production environment.
  // In order to enable it, uncomment following line. We keep it disabled in
  // order to quick-test new featurees without bumping up Mincer's version.
  //

  // environment.cache = new Mincer.FileStore(path.join(__dirname, 'cache'));

  //
  // Define environment essential *_path helper that will be available in the
  // processed assets. See `assets/stylesheets/app.css.ejs` for example.
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

  if (app.get('env') === 'production') {
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
  // depends on external variables: enviroment type, helper values and so one.
  // In this case, you should change enviroment "version" - place there any
  // unique string.
  //

  // enviroment.version = md5(JSON.stringify(your_version_object));

  // dummy helper that injects extension
  function rewriteExtension(source, ext) {
    const sourceExt = path.extname(source);
    return (sourceExt === ext) ? source : (source + ext);
  }

  app.locals.javascript = function (logicalPath) {
    const asset = environment.findAsset(logicalPath);

    if (!asset) {
      // this will help us notify that given logicalPath is not found
      // without "breaking" view renderer
      return `<script>alert("Javascript file ${
             JSON.stringify(logicalPath).replace(/"/g, '\\"')
             } not found.")</script>`;
    }

    return `<script src="/assets/${
      rewriteExtension(asset.digestPath, '.js')
      }"></script>`;
  };

  app.locals.stylesheet = function (logicalPath) {
    const asset = environment.findAsset(logicalPath);

    if (!asset) {
      // this will help us notify that given logicalPath is not found
      // without "breaking" view renderer
      return `<script>alert("Stylesheet file ${
             JSON.stringify(logicalPath).replace(/"/g, '\\"')
             } not found.")</script>`;
    }

    return `<link rel="stylesheet" href="/assets/${
      rewriteExtension(asset.digestPath, '.css')
      }" />`;
  };

  return environment;
}