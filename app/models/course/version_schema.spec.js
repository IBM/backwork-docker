'use strict';

const mongoose = require('mongoose'),
      versionSchema = require('./version_schema'),
      Version = mongoose.model('Version', versionSchema);

describe('Version schema', function() {
  describe('major and minor', function() {
    it('should be integers', function() {
      let version = new Version({
        major: "3.45",
        minor: 3.45
      });

      expect(version.major).toEqual(3);
      expect(version.minor).toEqual(3);
    });

    it('should be required', function(done) {
      let version = new Version();

      version.save()
        .then(function(doc) {
          done.fail(doc);
        })
        .catch(function(error) {
          expect(error.errors.major.message).toMatch('cannot be blank');
          expect(error.errors.minor.message).toMatch('cannot be blank');
          done();
        });
    });

    it('should be non-changeable');
  });
});
