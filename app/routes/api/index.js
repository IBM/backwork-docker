const express = require('express');
const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;
const config = require('../../config');
const coursesRouter = require('./courses');

passport.use(new Strategy((username, password, cb) => {
  if (username === config.auth.accessKey && password === config.auth.secretKey) {
    cb(null, { user: true });
  } else {
    const error = new Error('Unauthorized');
    error.status = 401;
    cb(error, false);
  }
}));

const router = express.Router();
router.use(passport.initialize());
router.use(passport.authenticate('basic', { session: false }));

// GET /api
router.get('/', (req, res) => {
  res.sendStatus(204);
});

// /api/courses
router.use('/courses', coursesRouter);

module.exports = router;
