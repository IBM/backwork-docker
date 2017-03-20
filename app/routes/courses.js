const express = require('express');

const router = express.Router();

// GET /courses
router.get('/', (req, res) => {
  res.status(501).send({ message: 'Not Implemented' });
});

// GET /courses/:courseId[.:format]
router.get('/', (req, res) => {
  res.status(501).send({ message: 'Not Implemented' });
});

// POST /courses ?

module.exports = router;
