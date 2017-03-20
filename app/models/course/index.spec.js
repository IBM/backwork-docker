const Course = require('./index');

const runValidationTests = (tests, cb) => {
  tests.map((test) => {
    const result = new Course(test.course).validateSync();

    if (test.pass) {
      return expect(result).toBeUndefined();
    }

    return expect(result.errors).toBeDefined();
  });

  cb();
};

describe('Course', () => {
  describe('organization', () => {
    it('should only allow letters', (done) => {
      const tests = [
        {
          course: { name: 'Code', organization: 'MyOrg', code: 'course' },
          pass: true,
        },
        {
          course: { name: 'Code', organization: 'My Org', code: 'course' },
          pass: false,
        },
        {
          course: { name: 'Code', organization: 'MyOrg1', code: 'course' },
          pass: false,
        },
        {
          course: { name: 'Code', organization: 'MyOrg#', code: 'course' },
          pass: false,
        },
      ];

      runValidationTests(tests, () => {
        done();
      });
    });
  });

  describe('code', () => {
    it('should only allow letters and numbers', (done) => {
      const tests = [
        {
          course: { name: 'Course', organization: 'Org', code: 'cours3' },
          pass: true,
        },
        {
          course: { name: 'Course', organization: 'Org', code: 'cours:3' },
          pass: false,
        },
        {
          course: { name: 'Course', organization: 'Org', code: 'course 1' },
          pass: false,
        },
        {
          course: { name: 'Course', organization: 'Org', code: 'cou#se1' },
          pass: false,
        },
      ];

      runValidationTests(tests, () => {
        done();
      });
    });
  });

  describe('organization and code', () => {
    it('should be non-changeable');
  });
});
