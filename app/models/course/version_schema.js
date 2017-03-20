'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// Schema
const versionSchema = new Schema({
  major: {
    type: Number,
    get: Math.round,
    set: Math.round
  },
  minor: {
    type: Number,
    get: Math.round,
    set: Math.round
  },
  changeLog: String,
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Virtuals
versionSchema.virtual('content_url').get(function() {
  return '/versions/' + this.id + '.tar.gz';
});

// Validations
versionSchema.path('major').required(true, 'Version major cannot be blank');
versionSchema.path('minor').required(true, 'Version minor cannot be blank');

// TODO: major - non-changeable
// TODO: minor - non-changeable

module.exports = versionSchema;
