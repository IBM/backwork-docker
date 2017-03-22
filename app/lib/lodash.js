const _ = require('lodash');

// Inspired by <http://stackoverflow.com/a/35056190/373748>
_.mixin({
  deepMapKeys: (obj, fn) => {
    const x = {};

    _.forOwn(obj, (v, k) => {
      let deepV;
      if (_.isPlainObject(v)) {
        deepV = _.deepMapKeys(v, fn);
      } else if (_.isArray(v)) {
        deepV = _.map(v, currentValue => _.deepMapKeys(currentValue, fn));
      }
      x[fn(v, k)] = deepV || v;
    });

    return x;
  },
});

module.exports = _;
