const winston = require('winston');
const request = require('supertest');
const express = require('express');

const models = require('../../../models');
const config = require('../../../config');
const router = require('./index');

const app = express();
app.use('/', router);

describe('/api/courses', () => {
  beforeAll(() => models.init(config.mongoURI));

  describe('get', () => {
    it('should list all courses', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            winston.error(err, res);
            done.fail(err);
          }
          done();
        });
    });
  });

  afterAll(() => models.terminate());
});
