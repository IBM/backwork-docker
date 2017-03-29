const debug = require('debug')('chell:apiSpec');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

const models = require('../../../models');
const config = require('../../../config');
const router = require('./index');

const app = express();
app.use('/', router);

describe('/api/courses', () => {
  let Course;
  beforeAll(done =>
    models.init(config.mongoURI)
      .then(() => {
        Course = mongoose.model('Course');
        done();
      })
      .catch(done.fail));

  describe('/', () => {
    describe('get', () => {
      it('should list all courses', (done) => {
        let courseCount;
        Course.count().exec()
          .then(count => (courseCount = count))
          .catch(done.fail);

        request(app)
          .get('/')
          .expect(200)
          .expect(res => expect(res.body.length).toEqual(courseCount))
          .end((err, res) => {
            if (err) {
              debug(err);
              debug(res.body);
              done.fail(err);
            }
            done();
          });
      });
    });
  });

  describe('/:courseId', () => {
    let courseId;

    beforeAll(done =>
      new Course({
        name: 'Test 101',
        organization: 'TestOrg',
        code: 'TEST101',
      }).save()
        .then((doc) => {
          courseId = doc.toJSON().id;
          done();
        })
        .catch(done.fail));

    describe('get', () => {
      it('should retrieve details for the specified course', (done) => {
        let course;
        Course.findOne().sort('-createdAt').limit(1).exec()
          .then(doc => (course = doc))
          .catch(done.fail);

        request(app)
          .get(`/${courseId}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.id).toEqual(course.id);
          })
          .end((err, res) => {
            if (err) {
              debug(err);
              debug(res.body);
              done.fail(err);
            }
            done();
          });
      });
    });

    afterAll(done =>
      Course.deleteOne({ _id: courseId }).exec()
        .then(() => done())
        .catch(done.fail));
  });

  afterAll(done =>
    models.terminate().then(() => done()));
});
