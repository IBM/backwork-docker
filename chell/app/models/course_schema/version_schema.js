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
    virtuals: true, // Apparently this transforms the `id` object to a string.
    versionKey: false,
  },
});

versionSchema.virtual('archiveFilename').get(function () {
  const course = this.parent();
  return `${course.id}/${this.id}.tgz`;
});

versionSchema.virtual('openEdxId').get(function () {
  const course = this.parent();
  return `course-v1:${course.organization}:${course.code}:v${this.major}.${this.minor}`;
});

// Validations
versionSchema.path('major').required(true, 'Version major cannot be blank');
versionSchema.path('minor').required(true, 'Version minor cannot be blank');

const validateUniqueness = function () {
  if (this.isNew && typeof this.parent === 'function' &&
      this.parent().versions.some(version =>
        !version.isNew &&
        version.major === this.major &&
        version.minor === this.minor)) {
    const message = `Version ${this.major}.${this.minor} already exists`;
    this.invalidate('major', message, this.major);
    this.invalidate('minor', message, this.minor);
  }
};

versionSchema.post('validate', validateUniqueness);
versionSchema.post('validateSync', validateUniqueness);

// TODO: major - non-changeable
// TODO: minor - non-changeable

module.exports = versionSchema;
