'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// Schema
const VersionSchema = new Schema({
  major: { type: String, trim: true },
  minor: { type: String, trim: true },
  change_log: String,
  content: { type: String, trim: true },
  timestamps: true
});

// Validations

// Methods
VersionSchema.methods = {
  content_url: function() {}
};

// Statics

module.exports = mongoose.model('Version', VersionSchema);
