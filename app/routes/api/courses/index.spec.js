const winston = require('winston');
const request = require('supertest');
const express = require('express');
const models = require('../../../models');
const config = require('../../../config');

beforeEach(() => {
  winston.log('whyyyyyyy');
});

beforeAll(() => {
  winston.log('helloooo');
  // return models.init(config.mongoURI)
  //   .then(winston.log).catch(winston.error);
  models.init(config.mongoURI).catch((err) => {
    winston.error(err);
    process.exit(1);
  });
});

const router = require('./index');

const app = express();
app.use('/', router);

describe('/api/courses', () => {
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
});
