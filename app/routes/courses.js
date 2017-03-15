'use strict';

var express = require('express');
var router = express.Router();

// GET /courses
router.get('/', function(req, res, next) {
  res.status(501).send({ message: 'Not Implemented' });
});

// GET /courses/:courseId[.:format]
router.get('/', function(req, res, next) {
  res.status(501).send({ message: 'Not Implemented' });
});

module.exports = router;
