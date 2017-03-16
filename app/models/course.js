'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

// Schema
const CourseSchema = new Schema({
  name: { type: String, trim: true },
  organization: { type: String, trim: true },
  code: { type: String, trim: true },
  shortDescription: String,
  longDescription: String,
  versions: [{
    type: Schema.Types.ObjectId,
    ref: 'Version'
  }],
  timestamps: true
});

// Validations
CourseSchema.path('name').required(true, 'Course name cannot be blank');
CourseSchema.path('organization').required(true, 'Course organization cannot be blank');
CourseSchema.path('code').required(true, 'Course code cannot be blank');

// Methods

// Statics
CourseSchema.statics = {
  list: function() {}
};

module.exports = mongoose.model('Course', CourseSchema);
