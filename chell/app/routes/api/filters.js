const _ = require('lodash');

function Filters() {}

Filters.prototype.getCollectionFilter = function (collection) {
  const ignoredAttributes = ['change_log', 'long_description'];

  return _.map(collection, (item) => {
    let filteredCollection = item;

    // Snake case keys
    // NOTE: This will convert `_id` to `id`.
    filteredCollection = _.deeply(_.mapKeys)(filteredCollection, (v, k) =>
      _.snakeCase(k));

    // Drop ignored attributes
    filteredCollection = _.deeply(_.omitBy)(filteredCollection, (v, k) =>
      ignoredAttributes.includes(k));

    return filteredCollection;
  });
};

Filters.prototype.getObjectFilter = function (object) {
  return _.deeply(_.mapKeys)(object, (v, k) => _.snakeCase(k));
};

module.exports = new Filters();
