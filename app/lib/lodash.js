const _ = require('lodash');

// Inspired in: http://stackoverflow.com/a/35056190/373748
_.mixin({
  deepMapKeys: (obj, fn) => {
    const x = {};

    _.forOwn(obj, (v, k) => {
      if (_.isPlainObject(v)) {
        // eslint-disable-next-line no-param-reassign
        v = _.deepMapKeys(v, fn);
      } else if (_.isArray(v)) {
        // eslint-disable-next-line no-param-reassign
        v = _.map(v, currentValue => _.deepMapKeys(currentValue, fn));
      }
      x[fn(v, k)] = v;
    });

    return x;
  },
});

module.exports = _;
