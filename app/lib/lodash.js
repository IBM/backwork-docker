const _ = require('lodash');

// Inspired by <http://stackoverflow.com/a/35056190/373748>
_.mixin({
  deeply: map =>
    (obj, fn) =>
      map(_.mapValues(obj, (v) => {
        if (_.isPlainObject(v)) {
          return _.deeply(map)(v, fn);
        } else if (_.isArray(v)) {
          return _.map(v, item => _.deeply(map)(item, fn));
        }
        return v;
      }), fn),
});

module.exports = _;