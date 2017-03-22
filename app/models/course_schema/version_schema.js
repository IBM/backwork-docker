const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema
const versionSchema = new Schema({
  major: {
    type: Number,
    get: Math.round,
    set: Math.round,
  },
  minor: {
    type: Number,
    get: Math.round,
    set: Math.round,
  },
  changeLog: String,
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
  },
});

// Virtuals
// Can't use arrow function here.
// http://stackoverflow.com/a/35796123/373748
versionSchema.virtual('contentURL').get(function () {
  // ¯\_(ツ)_/¯
  // eslint-disable-next-line no-underscore-dangle
  return `/versions/${this._id}.tar.gz`;
});

// Validations
versionSchema.path('major').required(true, 'Version major cannot be blank');
versionSchema.path('minor').required(true, 'Version minor cannot be blank');

// TODO: major - non-changeable
// TODO: minor - non-changeable

module.exports = versionSchema;
