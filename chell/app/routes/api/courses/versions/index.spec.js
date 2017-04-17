// const debug = require('debug')('chell:apiSpec');
// const request = require('supertest');
// const express = require('express');
// const mongoose = require('mongoose');
//
// const models = require('../../../../models');
// const config = require('../../../../config');
// const router = require('./index');
//
// const courseParams = {
//   name: 'Test 101',
//   organization: 'TestOrg',
//   code: 'TEST101',
//   versions: [{
//     major: 1,
//     minor: 1,
//     change_log: 'Change log.',
//   }],
// };
// const versionContent = 'fake course data';
//
// const app = express();
//
// let Course;
// let course;
//
// describe('/api/courses/:courseId/versions', () => {
//   beforeAll(() =>
//     models.init(config.mongoURI)
//       .then(() => {
//         Course = mongoose.model('Course');
//         return new Course(courseParams).save();
//       })
//       .then(doc => (course = doc))
//       .then(() => {
//         app.use((req, res, next) => {
//           /* eslint-disable no-param-reassign */
//
//           // Mock `loadCourse` middleware
//           req.course = course;
//
//           // Mock `fileStorage`
//           req.app.locals.fileStorage = {
//             get: () =>
//               Promise.resolve(new Buffer(versionContent)),
//           };
//
//           /* eslint-enable no-param-reassign */
//           next();
//         });
//         app.use('/', router);
//       }));
//
//   it('should fail if the course does not exist');
//
//   describe('/', () => {
//     describe('get', () => {
//       it('should list all course versions', (done) => {
//         request(app)
//           .get('/')
//           .expect(200, course.versions.toJSON())
//           .end((err, res) => {
//             if (err) {
//               debug(err);
//               debug(res.body);
//               done.fail(err);
//             }
//             done();
//           });
//       });
//     });
//   });
//
//   describe('/:versionId', () => {
//     describe('get', () => {
//       it('should retrieve the specified course version', (done) => {
//         const version = course.versions[0];
//
//         request(app)
//           .get(`/${version.id}`)
//           .set('Accept', 'application/json')
//           .expect(200)
//           .expect((res) => {
//             expect(res.body.id).toEqual(version.id);
//           })
//           .end((err, res) => {
//             if (err) {
//               debug(err);
//               debug(res.body);
//               done.fail(err);
//             }
//             done();
//           });
//       });
//
//       it('should retrieve its course content', (done) => {
//         const version = course.versions[0];
//
//         request(app)
//           .get(`/${version.id}`)
//           .set('Accept', 'application/x-gzip')
//           .expect(200)
//           .expect((res) => {
//             expect(res.text).toBeDefined();
//             expect(res.text).toEqual(versionContent);
//           })
//           .end((err, res) => {
//             if (err) {
//               debug(err);
//               debug(res.body);
//               done.fail(err);
//             }
//             done();
//           });
//       });
//     });
//   });
//
//   afterAll(() => {
//     Course.deleteOne({ _id: course.id }).exec()
//       .then(() => models.terminate());
//   });
// });

describe('FIXME', () => it('https://github.ibm.com/bdu/chell/issues/22'));
