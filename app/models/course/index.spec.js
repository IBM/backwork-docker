'use strict';

const mongoose = require('mongoose'),
      Course = require('./index'),

      runValidationTests = function(tests) {
        for (let test of tests) {
          let result = new Course(test.course).validateSync();

          if (test.pass) {
            expect(result).toBeUndefined();
          } else {
            expect(result.errors).toBeDefined();
          }
        }
      };

describe('Course', function() {
  describe('organization', function() {
    it('should only allow letters', function(done) {
      let course,
          tests = [
            {
              course: { name: 'Code', organization: 'MyOrg', code: 'course' },
              pass: true
            },
            {
              course: { name: 'Code', organization: 'My Org', code: 'course' },
              pass: false
            },
            {
              course: { name: 'Code', organization: 'MyOrg1', code: 'course' },
              pass: false
            },
            {
              course: { name: 'Code', organization: 'MyOrg#', code: 'course' },
              pass: false
            }
          ];

      runValidationTests(tests);
      done();
    });
  });

  describe('code', function() {
    it('should only allow letters and numbers', function(done) {
      let course,
          tests = [
            {
              course: { name: 'Course', organization: 'Org', code: 'cours3' },
              pass: true
            },
            {
              course: { name: 'Course', organization: 'Org', code: 'cours:3' },
              pass: false
            },
            {
              course: { name: 'Course', organization: 'Org', code: 'course 1' },
              pass: false
            },
            {
              course: { name: 'Course', organization: 'Org', code: 'cou#se1' },
              pass: false
            },
          ];

      runValidationTests(tests);
      done();
    });
  });

  describe('organization and code', function() {
    it('should be non-changeable');
  });
});
