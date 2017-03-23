const express = require('express');
const coursesRouter = require('./courses');
const versionsRouter = require('./versions');

const router = express.Router();

// GET /
router.get('/', (req, res) => {
  res.render('index');
});

router.use('/courses', coursesRouter);
router.use('/versions', versionsRouter);

module.exports = router;
