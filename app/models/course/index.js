const mongoose = require('mongoose');
const versionSchema = require('./version_schema');

const Schema = mongoose.Schema;

// Schema
const courseSchema = new Schema({
  name: { type: String, trim: true },
  organization: { type: String, trim: true },
  code: { type: String, trim: true },
  shortDescription: String,
  longDescription: String,
  versions: [versionSchema],
}, {
  timestamps: true,
});

// Validations
courseSchema.path('name')
  .required(true, 'Course name cannot be blank');

courseSchema.path('organization')
  .required(true, 'Course organization cannot be blank')
  .match(/^[a-zA-Z]+$/, 'Course organizaiton accepts letters only');

courseSchema.path('code')
  .required(true, 'Course code cannot be blank')
  .match(/^[a-zA-Z0-9]+$/, 'Course code accepts letters and numbers only');

// TODO: organization - non-changeable
// TODO: code - non-changeable

module.exports = mongoose.model('Course', courseSchema);
