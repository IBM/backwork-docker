const express = require('express');
const authRouter = require('./auth');
const coursesRouter = require('./courses');
const versionsRouter = require('./versions');

const router = express.Router();

router.use(authRouter);
// All routes below require authentication

// GET /
router.get('/', (req, res) => {
  res.redirect('/courses');
});

router.use('/courses', coursesRouter);
router.use('/versions', versionsRouter);

module.exports = router;
