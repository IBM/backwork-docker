const winston = require('winston');
const request = require('supertest');
const express = require('express');

const router = require('./index');

const existingVersionId = '585f32346fc9f505a5343d9a';
const existingVersion = {
  id: existingVersionId,
  major: 1,
  minor: 1,
  updated_at: '2017-03-17T21:47:41.291Z',
  created_at: '2017-03-17T21:47:41.291Z',
  change_log: 'Change log.',
};

const existingCourseId = '77292e976bf29c3317226060';
const existingCourse = {
  id: existingCourseId,
  updated_at: '2017-03-17T21:47:41.292Z',
  created_at: '2017-03-17T21:47:41.292Z',
  name: 'Test 101',
  organization: 'TestOrg',
  code: 'TEST101',
  short_description: 'Short description.',
  long_description: 'Looooooooooooooooooooooong description.',
  versions: [existingVersion],
};

const existingCourseVersionContent = 'fake course data';

const app = express();
app.use((req, res, next) => {
  /* eslint-disable no-param-reassign */
  req.course = existingCourse;

  // Mock `fileStorage`
  req.app.locals.fileStorage = {
    get: () =>
      Promise.resolve(new Buffer(existingCourseVersionContent)),
  };

  /* eslint-enable no-param-reassign */
  next();
});
app.use('/', router);

describe('/api/courses/:courseId/versions', () => {
  it('should fail if the course does not exist');

  describe('/', () => {
    describe('get', () => {
      it('should list all course versions');
    });
  });

  describe('/:versionId', () => {
    describe('get', () => {
      it('should retrieve the specified course version', (done) => {
        request(app)
          .get(`/${existingVersionId}`)
          .set('Accept', 'application/json')
          .expect(200, existingVersion)
          .end((err, res) => {
            if (err) {
              winston.error(err, res.body);
              done.fail(err);
            }
            done();
          });
      });

      it('should retrieve its course content', (done) => {
        request(app)
          .get(`/${existingVersionId}`)
          .set('Accept', 'application/x-gzip')
          .expect(200)
          .expect((res) => {
            expect(res.text).toBeDefined();
            expect(res.text).toEqual(existingCourseVersionContent);
          })
          .end((err, res) => {
            if (err) {
              winston.error(err, res.body);
              done.fail(err);
            }
            done();
          });
      });
    });
  });
});
