const mongoose = require('mongoose');
const versionSchema = require('./version_schema');

mongoose.Promise = global.Promise;
const Version = mongoose.model('Version', versionSchema);

describe('Version schema', () => {
  describe('major and minor', () => {
    it('should be integers', () => {
      const version = new Version({
        major: '3.45',
        minor: 3.45,
      });

      expect(version.major).toEqual(3);
      expect(version.minor).toEqual(3);
    });

    it('should be required', (done) => {
      const version = new Version();

      version.save()
        .then((doc) => {
          done.fail(doc);
        })
        .catch((error) => {
          expect(error.errors.major.message).toMatch('cannot be blank');
          expect(error.errors.minor.message).toMatch('cannot be blank');
          done();
        });
    });

    it('should be non-changeable');
  });
});
