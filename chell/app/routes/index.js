const express = require('express');
const authRouter = require('./auth');
const coursesRouter = require('./courses');

const router = express.Router();

router.use(authRouter);
// All routes below require authentication

// GET /
router.get('/', (req, res) => {
  res.redirect('/courses');
});

router.use('/courses', coursesRouter);


module.exports = router;
